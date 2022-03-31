<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'description',
        'image',
        'price',
        'stock',
        'published',
        'discount_id',
        'inventories_id',
        'sold'
    ];
    /**
     * @var mixed|string
     */
    /**
     * Product Author Relation
     * @return BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Product Categories Pivot Relation
     * @return BelongsToMany
     */

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'product_categories', 'product_id', 'category_id')->withPivot('id');
    }


    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public function discounts(): BelongsTo
    {
        return $this->belongsTo(Discount::class,'discount_id','id');
    }

    public function inventories(): BelongsToMany
    {
        return $this->belongsToMany(Inventory::class, 'products_ingredients', 'product_id', 'inventories_id')->withPivot('id');
    }

}
