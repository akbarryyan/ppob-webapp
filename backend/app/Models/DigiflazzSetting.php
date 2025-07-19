<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DigiflazzSetting extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'api_key',
        'whitelist_ips',
        'is_active',
        'current_balance',
        'balance_updated_at',
    ];

    protected $casts = [
        'whitelist_ips' => 'array',
        'is_active' => 'boolean',
        'current_balance' => 'decimal:2',
        'balance_updated_at' => 'datetime',
    ];

    /**
     * Get the active Digiflazz setting
     */
    public static function getActiveSetting()
    {
        return static::where('is_active', true)->first();
    }

    /**
     * Get whitelisted IPs as array
     */
    public function getWhitelistIpsArray()
    {
        return $this->whitelist_ips ?? [];
    }

    /**
     * Set whitelisted IPs from array or string
     */
    public function setWhitelistIpsAttribute($value)
    {
        if (is_string($value)) {
            // Parse comma-separated IPs
            $ips = array_map('trim', explode(',', $value));
            $ips = array_filter($ips); // Remove empty values
            $this->attributes['whitelist_ips'] = json_encode($ips);
        } else {
            $this->attributes['whitelist_ips'] = json_encode($value ?? []);
        }
    }
}
