<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Repositories\Orders\OrderRepository;
use Illuminate\Contracts\Foundation\Application;
use Illuminate\Contracts\Routing\ResponseFactory;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class OrderController extends Controller
{
    public $orderRepository;

    public function __construct(OrderRepository $orderRepository)
    {
        $this->orderRepository = $orderRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index($status,$customer): Response
    {
        $result = $this->orderRepository->OrderInfoWithFilter($status,$customer);

        return response($result, 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Application|ResponseFactory|Response
     */
    public function store(Request $request)
    {
        $storeOrder = $this->orderRepository->create($request);

        $response = [
            'storeOrder' => $storeOrder
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @return Response
     */

    public function show($status,$userId)
    {
        $result = $this->orderRepository->OrderInfoWithFilter($status,$userId);
        return response($result, 201);

    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param $id
     * @return Response
     */
    public function update(Request $request, $id): Response
    {
        $updated = $this->orderRepository->update($request, $id);
        return response($updated, 201);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param $id
     * @return Response
     */
    public function destroy($id): Response
    {
        $this->orderRepository->delete($id);

        return response('Successfully Deleted', 201);
    }

    public function mostOrdered($filter)
    {

        if ($filter === 'all') {
            $mostOrdered = $this->orderRepository->mostOrdered();
        } else {
            $mostOrdered = $this->orderRepository->mostOrderedToday();
        }

        return response($mostOrdered, 201);
    }

    public function businessSummery(){
       $result= $this->orderRepository->businessSummery();
       return response($result,201);
    }

    public function latestOrder(){
       $result= $this->orderRepository->latestOrder();
       return response($result,201);
    }

    public function tables(){
       $result= $this->orderRepository->tables();
       return response($result,201);
    }
}
