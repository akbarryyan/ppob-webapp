<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'section',
        'key',
        'value',
        'type',
        'description'
    ];

    protected $casts = [
        'value' => 'string',
    ];

    /**
     * Get setting value with proper type casting
     */
    public function getTypedValue()
    {
        switch ($this->type) {
            case 'boolean':
                return filter_var($this->value, FILTER_VALIDATE_BOOLEAN);
            case 'integer':
                return (int) $this->value;
            case 'float':
                return (float) $this->value;
            case 'json':
                return json_decode($this->value, true);
            default:
                return $this->value;
        }
    }

    /**
     * Set setting value with proper type handling
     */
    public function setTypedValue($value)
    {
        switch ($this->type) {
            case 'boolean':
                $this->value = $value ? '1' : '0';
                break;
            case 'json':
                $this->value = json_encode($value);
                break;
            default:
                $this->value = (string) $value;
        }
        
        return $this;
    }

    /**
     * Get settings by section
     */
    public static function getBySection($section)
    {
        return static::where('section', $section)
                    ->get()
                    ->mapWithKeys(function ($setting) {
                        return [$setting->key => $setting->getTypedValue()];
                    });
    }

    /**
     * Set settings for a section
     */
    public static function setForSection($section, $settings)
    {
        foreach ($settings as $key => $value) {
            $setting = static::firstOrNew([
                'section' => $section,
                'key' => $key
            ]);

            // Determine type based on value
            if (is_bool($value)) {
                $setting->type = 'boolean';
            } elseif (is_int($value)) {
                $setting->type = 'integer';
            } elseif (is_float($value)) {
                $setting->type = 'float';
            } elseif (is_array($value) || is_object($value)) {
                $setting->type = 'json';
            } else {
                $setting->type = 'string';
            }

            $setting->setTypedValue($value);
            $setting->save();
        }
    }

    /**
     * Get a single setting value
     */
    public static function getValue($section, $key, $default = null)
    {
        $setting = static::where('section', $section)
                        ->where('key', $key)
                        ->first();

        return $setting ? $setting->getTypedValue() : $default;
    }

    /**
     * Set a single setting value
     */
    public static function setValue($section, $key, $value, $description = null)
    {
        $setting = static::firstOrNew([
            'section' => $section,
            'key' => $key
        ]);

        // Determine type based on value
        if (is_bool($value)) {
            $setting->type = 'boolean';
        } elseif (is_int($value)) {
            $setting->type = 'integer';
        } elseif (is_float($value)) {
            $setting->type = 'float';
        } elseif (is_array($value) || is_object($value)) {
            $setting->type = 'json';
        } else {
            $setting->type = 'string';
        }

        if ($description) {
            $setting->description = $description;
        }

        $setting->setTypedValue($value);
        $setting->save();

        return $setting;
    }
}
