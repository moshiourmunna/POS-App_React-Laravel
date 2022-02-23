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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $response = $this->productsRepository->save($request);
        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param \App\Models\Discount $discount
     * @return \Illuminate\Http\Response
     */
    public function show($category)
    {
        if ($category === 'all') {
            $result = $this->productsRepository->publishedProducts();
        }
        else {
            $result = $this->productsRepository->publishedProductsByCategory($category);
        }

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
     * @return \Illuminate\Http\Response
     */
    public function update()
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $response=$this->productsRepository->delete($id);
        return response($response,201);
    }
}
