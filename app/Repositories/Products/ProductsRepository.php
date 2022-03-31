<?php

namespace App\Repositories\Products;

use App\Models\Inventory;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\File;
use Str;

class ProductsRepository implements ProductsInterface
{

    private $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    /**
     * @throws Exception
     */
    public function save(Request $request)
    {
        $validator = $request->validate([
            'title' => 'required|string|unique:products,title|max:50',
            'discount' => 'required|numeric|max:40',
            'ingredients' => 'required',
            'stock' => 'required|numeric',
            'price' => 'required|numeric|regex:/^\d*(\.\d{2})?$/',
            'file' => 'image|mimes:jpeg,jpg,png|required|max:10000',
            'status' => 'required|string|max:50',
        ],
            [
                'title.required' => ':attribute can not be blank',
                'discount.required' => ':attribute can not be blank',
                'stock.required' => ':attribute can not be blank Or non integer',
                'ingredients.required' => ':attribute can not be blank',
                'price.required' => ':attribute has to be a float of point 2',
                'file.required' => '',
                'status.required' => 'please select a :attribute',
            ]);

        $product = new Product();
        $image = $request->file;
        if ($image) {
            $image_ext = $image->getClientOriginalExtension();
            $image_full_name = time() . '.' . $image_ext;
            $upload_path = 'assets/images/';
            $image_url = $upload_path . $image_full_name;

            $success = $image->move($upload_path, $image_full_name);
        } else {
            $image_url = '';
        }

        $product->image = $image_url;
        $product->title = $request->title;
        $product->published = filter_var($request->status, FILTER_VALIDATE_BOOLEAN);
        $product->discount_id = $request->discount;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->slug = $this->slugify($request->title);
        $product->save();

        $product->categories()->sync([$request->category]);
        $newIngredients = explode(',', $request->input('ingredients'));
        $ingredientIDs = [];
        foreach ($newIngredients as $ingredients) {
            $ingredient = Inventory::firstorcreate(['name' => $ingredients, 'product_id' => $product->id]);
            $ingredientIDs[] = $ingredient->id;
        }

        $product->inventories()->sync($ingredientIDs);

        return [
            'product' => $product,
            'validator' => $validator
        ];
    }


    private function slugify($name): string
    {
        return \Str::slug($name);
    }

    /**
     * @throws Exception
     */
    public function update(Request $request, int $id): array
    {
        $product = Product::findOrFail($id);
        $isPublishedBefore = $product->published;

        $request->validate([
            'title' => 'required|string|max:50',
            'discount' => 'required|numeric|max:40',
            'stock' => 'required|numeric',
            'ingredients' => 'required',
            'price' => 'required|numeric|regex:/^\d*(\.\d{2})?$/',
            'status' => 'required|string|max:50',
        ],
            [
                'title.required' => ':attribute can not be blank',
                'discount.required' => ':attribute can not be blank',
                'stock.required' => ':attribute can not be blank Or non integer',
                'price.required' => ':attribute has to be a float of point 2',
                'status.required' => 'please select a :attribute',
                'ingredients.required' => ':attribute can not be blank',
            ]);


        $image = $request->file;
        if ($image) {
            $image_ext = $image->getClientOriginalExtension();
            $image_full_name = time() . '.' . $image_ext;
            $upload_path = 'assets/images/';
            $image_url = $upload_path . $image_full_name;

            $success = $image->move($upload_path, $image_full_name);
        } else {
            $image_url = $product->image;
        }

        $data = [
            'title' => $request->input('title'),
            'slug' => $this->slugify($request->input('title')),
            'description' => $request->input('description'),
            'published' => filter_var($request->input('published'), FILTER_VALIDATE_BOOLEAN),
            'price' => $request->input('price'),
            'stock' => $request->input('stock'),
            'discount_id' => $request->input('discount'),
            'image' => $image_url,
        ];

//        $product->categories()->detach();
        $product->categories()->sync([$request->category]);

        $newIngredients = explode(',', $request->input('ingredients'));
        $ingredientIDs = [];

        foreach ($newIngredients as $ingredients) {
            $ingredient = Inventory::firstorcreate(['name' => $ingredients]);
            $ingredientIDs[] = $ingredient->id;
        }
        $product->inventories()->detach();
        $product->inventories()->sync($ingredientIDs);

        $product->update($data);

        return ['product' => $product, 'previouslyPublished' => $isPublishedBefore];
    }


    public function delete(int $id)
    {
        $product = $this->model::findOrFail($id);
        if (File::exists($product->image)) {
            File::delete($product->image);
        }
        $product->categories()->detach();

        return $product->delete();
    }

    public function paginate($limit = 10)
    {

    }

    private function baseQuery(int $categoryId = 0)
    {
        return $this->model->whereHas('categories', function ($q) use ($categoryId) {
            $q->where('published', '=', 0);
            $q->when($categoryId !== 0, function ($sq) use ($categoryId) {
                $sq->where('category_id', $categoryId);
            });
        });
    }

    /**
     * @throws Exception
     */
    public function publishedProducts($category, $query)
    {

        return cache()->remember('products', 60 * 60 * 24, function () use ($category, $query) {
            return $this->baseQuery($category)
                ->select('id', 'title', 'published', 'image', 'price', 'stock', 'discount_id')
                ->with('categories')
                ->with('inventories')
                ->with(['discounts' => function ($q) {
                    $q->where('published', 0);
                }])
                ->when($query, function ($q) use ($query) {
                    if ($query !== 'all' && $query !== null) {
                        $q->where('title', 'like', "%$query%");
                    }
                })
                ->latest()
                ->get();
        });
    }
}
