<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'transaction_id',
        'product_code',
        'product_name',
        'type',
        'price',
        'profit',
        'status',
        'target',
        'message',
        'processed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'price' => 'decimal:2',
        'profit' => 'decimal:2',
        'processed_at' => 'datetime',
    ];

    /**
     * Relationship: Transaction belongs to a user
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
