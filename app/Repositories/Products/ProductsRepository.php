<?php

namespace App\Repositories\Products;

use App\Models\Product;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class ProductsRepository implements ProductsInterface
{

    private $model;

    public function __construct(Product $product)
    {
        $this->model = $product;
    }

    public function save(Request $request)
    {


    }

    private function slugify($name)
    {

    }

    public function update(Request $request, int $id)
    {

    }

    public function delete(int $id)
    {

    }

    public function paginate($limit = 10)
    {

    }

}
