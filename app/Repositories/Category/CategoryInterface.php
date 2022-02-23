<?php


namespace App\Repositories\Category;


interface CategoryInterface
{
    public function create(array $data);

    public function getById(int $id);

    public function update(array $data, int $id);

    public function delete(int $id);

    public function all();

    public function paginate($perPage);

}
