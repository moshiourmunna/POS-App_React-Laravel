<?php


namespace App\Repositories\Orders;


use App\Models\Order;
use App\Models\Product;
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

    public function OrderInfo(): array
    {
        $getOrderInfo = $this->model::wherehas('orderItems')->with(['orderItems' => function($q){
            $q->with(['products' => function($sq){
                $sq->select('id','title','price');
            }]);
        }])->with(['users' => function($q){
            $q->select('id','first_name','last_name');
        }])
            ->get();

//        $customers=Order::distinct('user_id')->count('name');

        $mostOrdered=Product::select('id','title','sold','image')
            ->orderBy('sold','DESC')
            ->limit(3)
            ->get();

        $totalPayment = [];
        $orderedDishes=[];
        $customer=[];

        foreach ($getOrderInfo as $orders){
            if(!in_array($orders->user_id, $customer)) {
                $customer[] = $orders->user_id;
            }
            foreach ($orders->orderItems as $item){
                $totalPayment[]  = $item->products->price * $item->quantity;
                $orderedDishes[] = $item->quantity;
            }
        }

        $revenue=array_sum($totalPayment);
        $orderedDishCount=array_sum($orderedDishes);
        $customers=count($customer);


        return [
            'getOrderInfo' => $getOrderInfo,
            'revenue'=>$revenue,
            'orderedDishCount'=>$orderedDishCount,
            'customers'=>$customers,
            'mostOrdered'=>$mostOrdered,
            'totalPayment' => $totalPayment
        ];
    }


}
