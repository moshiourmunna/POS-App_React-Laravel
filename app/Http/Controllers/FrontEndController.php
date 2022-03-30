<?php

namespace App\Http\Controllers;

use App\Models\Discount;
use App\Models\Inventory;
use App\Repositories\Products\ProductsRepository;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

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
     * @return array|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|Response
     * @throws Exception
     */
    public function store(Request $request)
    {
        $storeProduct = $this->productsRepository->save($request);

        $response = [
            'storeProduct' => $storeProduct,
        ];

        return response($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param $category
     * @param $query
     * @return Response
     * @throws Exception
     */
    public function show($category, $query)
    {
        $result = $this->productsRepository->publishedProducts($category,$query);
        $discounts = [];
        foreach ($result as $data) {
            if($data->discounts){
                $discounts[] = $data->discounts->percentage;
            }
        }
        $discount = array_sum($discounts);

        $response = [
            'products' => $result,
            'discount' => $discount
        ];
        return response($response, 201);
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
     * @return array
     */
    public function update(Request $request, $id)
    {
        return $this->productsRepository->update($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @return Response
     */
    public function destroy($id): Response
    {
        $response = $this->productsRepository->delete($id);
        return response($response, 201);
    }

    public function sendNotification(): array
    {
        $inventories= Inventory::with('products')->get();
        $messages=[];
        foreach ($inventories as $key=> $inventory){
            if($inventory->stock<$inventory->threshold){
                $messages[]=((object)['message' => 'Only '. $inventory->stock. ' '. $inventory->name . ' in stock']);
            }
        }
        return $messages;
    }

}
