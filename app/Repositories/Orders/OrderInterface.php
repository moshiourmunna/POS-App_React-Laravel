<?php


namespace App\Repositories\Orders;


interface OrderInterface
{
    public function create($request);

    public function getById(int $id);

    public function update(int $id);

    public function delete(int $id);

    public function paginate($perPage);

}
