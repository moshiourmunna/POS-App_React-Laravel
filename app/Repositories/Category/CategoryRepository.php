<?php


namespace App\Repositories\Category;


use App\Models\Category;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;

class CategoryRepository implements CategoryInterface
{
    private $model;

    public function __construct(Category $category)
    {
        $this->model = $category;
    }

    public function create($request)
    {
        $category = new Category();
        $category->published = filter_var($request->published, FILTER_VALIDATE_BOOLEAN);
        $category->name = $request->name;
        $category->slug =  $this->slugify($request->name);
        $category->save();

        $response = [
            'category' => $category,
        ];
        return $category->published;
    }

    private function slugify($name): string
    {
        return \Str::slug($name);
    }

    public function getById(int $id)
    {
        return $this->model->find($id);
    }

    public function update( int $id)
    {
        $model = $this->model::find($id);
        if ($model->published === 1) {
            $model->published = 0;
        }
        else{
            $model->published = 1;
        }

        $model->save();

        return $model;
    }

    public function delete( $id)
    {
        Artisan::call('cache:clear');

        return $this->model->where('id', $id)->delete();
    }

    public function allPublished()
    {
        return $this->model
            ->where('published', 0)
            ->orderBy('id')->get();
    }

    public function paginate($perPage = 10)
    {
        return $this->model->orderBy('position', 'asc')->withCount('articles')->paginate($perPage);
    }

    public function allCategories(){
        return $this->model
            ->orderBy('name')->get();
    }

}
