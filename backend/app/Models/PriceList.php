<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class PriceList extends Model
{
    use HasFactory;

    protected $fillable = [
        'brand',
        'product_name',
        'price',
        'original_price',
        'buyer_product_status',
        'seller_product_status',
        'buyer_sku_code',
        'desc',
        'category',
        'type',
        'unlimited_stock',
        'stock',
        'multi',
        'start_cut_off',
        'end_cut_off',
        'admin',
        'commission',
        'product_type',
        'profit_type',
        'profit_margin',
        'fixed_profit',
        'last_updated',
    ];

    protected $casts = [
        'buyer_product_status' => 'boolean',
        'seller_product_status' => 'boolean',
        'unlimited_stock' => 'boolean',
        'price' => 'decimal:2',
        'admin' => 'decimal:2',
        'commission' => 'decimal:2',
        'last_updated' => 'datetime',
    ];

    // Scope untuk filter berdasarkan type
    public function scopePrepaid($query)
    {
        return $query->where('product_type', 'prepaid');
    }

    public function scopePostpaid($query)
    {
        return $query->where('product_type', 'postpaid');
    }

    // Scope untuk filter berdasarkan status
    public function scopeAvailable($query)
    {
        return $query->where('buyer_product_status', true)
                    ->where('seller_product_status', true);
    }

    // Method untuk update last_updated timestamp
    public function updateLastFetch()
    {
        $this->last_updated = Carbon::now();
        $this->save();
    }
}
