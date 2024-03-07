<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Listing extends Model {
    use HasFactory;

    protected $fillable = ['name', 'description', 'province', 'city', 'barangay', 'street', 'zip_code', 'price', 'maximum_guests'];

    public function media(): HasMany {
        return $this->hasMany(Media::class);
    }

    public function calendars(): HasMany {
        return $this->hasMany(Calendar::class);
    }

    public function experiences(): HasMany {
        return $this->hasMany(Experience::class);
    }

    public function reviews(): HasMany {
        return $this->hasMany(Review::class);
    }

    public function listable() {
        return $this->morphTo();
    }
}
