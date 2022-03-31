<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'stock',
        'product_id',
        'threshold',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_ingredients', 'product_id', 'inventories_id')->withPivot('id');

    }

}
