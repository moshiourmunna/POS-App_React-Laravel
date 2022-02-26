<?php

namespace App\Repositories\Products;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Str;

class ProductsRepository implements ProductsInterface
{

    private $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'title' => 'required|string|unique:products,title|max:50',
            'discount' => 'required|numeric|max:40',
            'stock' => 'required|numeric',
            'price' => 'required|numeric|regex:/^\d*(\.\d{2})?$/',
            'file' => 'image|mimes:jpeg,jpg,png|required|max:10000',
            'status' => 'required|string|max:50',
        ],
            [
                'title.required' => ':attribute can not be blank',
                'discount.required' => ':attribute can not be blank',
                'stock.required' => ':attribute can not be blank Or non integer',
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
//        $product->sold = $request->price->increment();
        $product->save();

        $product->categories()->sync([$request->category]);

        $response = [
            'product' => $product,
            'validator' => $validator
        ];

        return $response;
    }

    private function slugify($name): string
    {
        return \Str::slug($name);
    }

    public function update(Request $request, int $id): array
    {
        $product = Product::findOrFail($id);
        $isPublishedBefore = $product->published;

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

        // Category
//        $product->categories()->detach();
        $product->categories()->sync([$request->category]);

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

    public function publishedProducts($category)
    {
        return $this->baseQuery($category)
            ->select('id', 'title', 'slug', 'published', 'image', 'description', 'price', 'stock', 'discount_id')
            ->with('categories')
            ->latest()
            ->get();
    }

    public function saveOrder(Request $request)
    {
        $payload = json_decode($request->getContent(), true);
        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->save();

        foreach ($payload as $element){
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $element["productId"];
            $orderItem->quantity = $element["quantity"];
            $orderItem->instruction = 'note';
            $orderItem->discount = 0;
            $orderItem->delivery_method = 'method';
            $orderItem->save();

        }

        Product::where('id', $orderItem->product_id)
            ->update([
                'sold'=> DB::raw('sold+1')
            ]);

        $response = [
            'order' => $order,
            'orderItem' => $orderItem
        ];



        return $response;
    }




}
