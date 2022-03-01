<?php


namespace App\Repositories\Orders;


use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
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
        $payload = json_decode($request->getContent(), true);
        $order = new Order();
        $order->user_id = auth()->user()->id;
        $order->save();

        foreach ($payload as $element) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $element["productId"];
            $orderItem->quantity = $element["quantity"];
            $orderItem->instruction = $element["orderNote"];
            $orderItem->discount = 0;
            $orderItem->delivery_method = $element["deliveryMethod"];
            $orderItem->save();

            Product::where('id', $element["productId"])
                ->increment('sold', $element["quantity"]);
            Product::where('id', $element["productId"])
                ->decrement('stock', $element["quantity"]);
        }

        return [
            'order' => $order,
            'orderItem' => $orderItem
        ];
    }

    public function update(int $id)
    {

    }

    public function delete($id)
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
        $getOrderInfo = $this->model::wherehas('orderItems')->with(['orderItems' => function ($q) {
            $q->with(['products' => function ($sq) {
                $sq->select('id', 'title', 'price');
            }]);
        }])->with(['users' => function ($q) {
            $q->select('id', 'first_name', 'last_name');
        }])
            ->get();

//        $customers=Order::distinct('user_id')->count('name');

        $totalPayment = [];
        $orderedDishes = [];
        $customer = [];

        foreach ($getOrderInfo as $orders) {
            if (!in_array($orders->user_id, $customer)) {
                $customer[] = $orders->user_id;
            }
            foreach ($orders->orderItems as $item) {
                $totalPayment[] = $item->products->price * $item->quantity;
                $orderedDishes[] = $item->quantity;
            }
        }

        $revenue = array_sum($totalPayment);
        $orderedDishCount = array_sum($orderedDishes);
        $customers = count($customer);


        return [
            'getOrderInfo' => $getOrderInfo,
            'revenue' => $revenue,
            'orderedDishCount' => $orderedDishCount,
            'customers' => $customers,
            'totalPayment' => $totalPayment
        ];
    }

    public function mostOrdered()
    {
        return Product::select('id', 'title', 'sold', 'image')
            ->orderBy('sold', 'DESC')
            ->limit(3)
            ->get();
    }

    public function mostOrderedToday()
    {
        return Product::where('updated_at', '>', Carbon::now()->subDays(1))
            ->select('id', 'title', 'sold', 'image')
            ->orderBy('sold', 'DESC')
            ->limit(3)
            ->get();
    }


}
