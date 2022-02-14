<?php

namespace App\Repositories\Users;

use App\Models\Product;
use App\Models\User;
use App\Repositories\Products\UsersInterface;
use Illuminate\Http\Request;


class UsersRepository implements UsersInterface
{

    private $model;

    public function __construct(User $user)
    {
        $this->model = $user;
    }

    public function save(Request $request)
    {


    }

    public function update(Request $request, int $id)
    {

    }

    public function delete(int $id)
    {

    }

}
