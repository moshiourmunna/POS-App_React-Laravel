<?php


namespace App\Repositories\Orders;


interface OrderInterface
{
    public function update($request,int $id);

    public function delete(int $id);

}
