<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Inventory extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'stock',
        'threshold',
    ];

    public function products(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'products_ingredients', 'inventories_id', 'product_id')->withPivot('id');
    }

}
