<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model {
    use HasFactory;

    protected $fillable = [
        'guest_id', 'listing_id', 'start_date', 'end_date', 'number_of_guests', 'total_price', 'status',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    // public function listing() {
    //     return $this->belongsTo(Listing::class);
    // }
}
