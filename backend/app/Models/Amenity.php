<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Amenity extends Model {
    use HasFactory;

    public function accommodations(): BelongsToMany {
        return $this->belongsToMany(Accommodation::class);
    }
}
