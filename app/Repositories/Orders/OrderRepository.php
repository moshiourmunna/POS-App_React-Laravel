<?php


namespace App\Repositories\Orders;


use App\Models\Order;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Http\Request;

class OrderRepository implements OrderInterface
{
    private $model;

    public function __construct(Order $order)
    {
        $this->model = $order;
    }

    public function create($request)
    {

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

    public function paginate($perPage = 10)
    {
        return $this->model->orderBy('position', 'asc')->withCount('articles')->paginate($perPage);
    }


}
