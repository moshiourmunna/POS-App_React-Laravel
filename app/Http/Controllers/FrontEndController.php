<?php

namespace App\Http\Controllers;

use App\Repositories\Products\ProductsRepository;
use Illuminate\Http\Request;

class FrontEndController extends Controller
{
    public $productsRepository;

    public function __construct(ProductsRepository $productsRepository)
    {
        $this->productsRepository = $productsRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $storeProduct = $this->productsRepository->save($request);

        $response = [
            'storeProduct' => $storeProduct,
        ];

        return response($response,201);
    }

    public function storeOrder(Request $request)
    {
        $storeOrder = $this->productsRepository->saveOrder($request);

        $response = [
            'storeOrder' => $storeOrder
        ];

        return response($response,201);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getOrderInfo(): \Illuminate\Http\Response
    {
        $result = $this->productsRepository->OrderInfo();

        return response($result, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Discount $discount
     * @return \Illuminate\Http\Response
     */
    public function show($category)
    {
        $result = $this->productsRepository->publishedProducts($category);

        return response($result, 201);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function edit()
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return array
     */
    public function update(Request $request, $id)
    {
        return $this->productsRepository->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response = $this->productsRepository->delete($id);
        return response($response, 201);
    }
}
