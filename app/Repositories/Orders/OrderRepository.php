<?php


namespace App\Repositories\Orders;


use App\Models\Discount;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\Artisan;

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

    public function update($request, int $id)
    {
        return $this->model::where('id', $id)->update(['status' => $request->status]);
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

    public function OrderInfoWithFilter($status, $userId): array
    {
        $getOrderInfo = $this->model::wherehas('orderItems')
            ->when($status !== 'all', function ($q) use ($status) {
                if ($status !== 'all') {
                    return $q->where('status', $status);
                }
            })
            ->with(['orderItems' => function ($q) {
                $q->with(['products' => function ($sq) {
                    $sq->select('id', 'title', 'price');
                }]);
            }])->with(['users' => function ($q) use ($userId) {
                if ($userId != 'all') {
                    $q->select('id', 'first_name', 'last_name')->where('id', $userId);
                }
            }])
            ->orderBy('updated_at', 'DESC')
            ->get();

        return [
            'getOrderInfo' => $getOrderInfo,
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

    public function businessSummery(): array
    {

        $products = Product::where('published', 0)->select('sold', 'price', 'updated_at')->get();

        $totalPayment = [];
        $orderedDishes = [];

        $totalPaymentLastWeek = [];
        $totalPaymentPastWeek = [];

        $orderedDishesLastWeek = [];
        $orderedDishesPastWeek = [];

        foreach ($products as $product) {
            if ($product->updated_at > Carbon::now()->subDays(2)) {
                $totalPaymentLastWeek[] = $product->price * $product->sold;
                $orderedDishesLastWeek[] = $product->sold;
            }
            if ($product->updated_at >now()->subDays(3) && $product->updated_at < now()->subDays(2)) {
                $totalPaymentPastWeek[] = $product->price * $product->sold;
                $orderedDishesPastWeek[] = $product->sold;
            }
            $totalPayment[] = $product->price * $product->sold;
            $orderedDishes[] = $product->sold;
        }

        $revenueLastWeek = array_sum($totalPaymentLastWeek);
        $revenuePastWeek = array_sum($totalPaymentPastWeek);
        $revenueStat = ($revenuePastWeek - $revenueLastWeek) / $revenueLastWeek * 100;

        $dishCountLastWeek = array_sum($orderedDishesLastWeek);
        $dishCountPastWeek = array_sum($orderedDishesPastWeek);
        $dishStat = ($dishCountPastWeek - $dishCountLastWeek) / $dishCountLastWeek * 100;

        $orderedDishCount = array_sum($orderedDishes);
        $revenue = array_sum($totalPayment);

        $customersLastWeek=[];
        $customersPastWeek=[];

        $customers = Order::with(['users' => function ($q) {
            $q->select('first_name', 'last_name', 'id')->distinct();
        }])
            ->get();

        foreach ($customers as $customer){
            if ($customer->updated_at > Carbon::now()->subDays(2)) {
                if(!in_array($customer->user_id, $customersLastWeek, true)){
                    $customersLastWeek[] = $customer->user_id;
                }
            }
            if ($customer->updated_at >now()->subDays(3) && $customer->updated_at < now()->subDays(2)) {
                if(!in_array($customer->user_id, $customersPastWeek, true)){
                    $customersPastWeek[] = $customer->user_id;
                }
            }
        }
        $customersLastWeek = count($customersLastWeek);
        $customersPastWeek= count($customersPastWeek);
        $customersStat = ($customersPastWeek - $customersLastWeek) / $customersLastWeek * 100;

        return [
            'revenue' => $revenue,
            'revenueStat' => $revenueStat,
            'dishStat' => $dishStat,
            'orderedDishCount' => $orderedDishCount,
            'customers' => $customers,
            'customersStat'=>$customersStat
        ];

    }

    public function createDiscount($request)
    {
        return Discount::create(
            [
                'name' => $request->name,
                'percentage' => $request->percentage,
                'validity' => 5,
                'published' => $request->validity,
            ]
        );
    }

    public function updateDiscount($request, $id)
    {
        return Discount::where('id', $id)->update(['published' => $request->status]);
    }

    public function deleteDiscount($id)
    {
        $discount = Discount::findOrFail($id);
//        $discount->products()->detach();
        return $discount->delete();
    }

}
