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

    public function create(array $data)
    {
        $data['slug'] = $this->slugify($data['name']);
        Artisan::call('cache:clear');

        return $this->model->create($data);
    }

    private function slugify($name): string
    {
        return \Str::slug($name);
    }

    public function getById(int $id)
    {
        return $this->model->find($id);
    }

    public function update(array $data, int $id)
    {
        $data['slug'] = $this->slugify($data['name']);
        Artisan::call('cache:clear');

        return $this->model->where('id', $id)->update($data);
    }

    public function delete(int $id)
    {
        Artisan::call('cache:clear');

        return $this->model->where('id', $id)->delete();
    }

    public function all()
    {
        return $this->model
            ->where('published', 0)
            ->orderBy('id')->get();
    }

    public function paginate($perPage = 10)
    {
        return $this->model->orderBy('position', 'asc')->withCount('articles')->paginate($perPage);
    }

}
