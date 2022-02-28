<?php


namespace App\Repositories\Orders;


interface OrderInterface
{
    public function update(int $id);

    public function delete(int $id);

}
