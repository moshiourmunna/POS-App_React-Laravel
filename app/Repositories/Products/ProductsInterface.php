<?php
namespace App\Repositories\Products;
use Illuminate\Http\Request;

interface ProductsInterface
{
    public function save(Request $request);

    public function saveOrder(Request $request);

    public function update(Request $request, int $id);

    public function delete(int $id);

    public function paginate(int $limit);

}
