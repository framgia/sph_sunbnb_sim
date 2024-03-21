<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Calendar extends Model {
    use HasFactory;

    protected $fillable = ['booking_id', 'listing_id', 'date', 'available'];

    protected $hidden = ['booking_id'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public function booking(): BelongsTo {
        return $this->belongsTo(Booking::class);
    }
}
