<?php


namespace App\Repositories\Category;


interface CategoryInterface
{
    public function create($request);

    public function getById(int $id);

    public function update(int $id);

    public function delete(int $id);

    public function allPublished();

    public function paginate($perPage);

}
