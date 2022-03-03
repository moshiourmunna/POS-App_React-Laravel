<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use App\Repositories\Orders\OrderRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class DiscountController extends Controller
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
    public function index()
    {
        //
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
     * @return Response
     */
    public function store(Request $request)
    {
       $response= $this->orderRepository->createDiscount($request);
       return response($response,201);
    }

    /**
     * Display the specified resource.
     *
     * @return Discount[]|Collection
     */
    public function show()
    {
        return Discount::all();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Discount $discount
     * @return Response
     */
    public function edit(Discount $discount)
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
        $updated = $this->orderRepository->updateDiscount($request, $id);
        return response($updated, 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Discount $discount
     * @return Response
     */
    public function destroy($id)
    {
        $response = $this->orderRepository->deleteDiscount($id);
        return response($response, 201);
    }
}
