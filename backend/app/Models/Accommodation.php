<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Accommodation extends Model {
    use HasFactory;

    protected $fillable = ['type', 'bed_count', 'bedroom_count', 'bathroom_count', 'minimum_days', 'maximum_days'];

    public function amenities(): BelongsToMany {
        return $this->belongsToMany(Amenity::class);
    }

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }
}
