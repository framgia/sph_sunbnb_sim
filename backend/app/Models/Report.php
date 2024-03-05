<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model {
    use HasFactory;

    protected $fillable = [
        'guest_id', 'listing_id', 'admin_id', 'title', 'content', 'status',
    ];

    // public function guest() {
    //     return $this->belongsTo(Guest::class);
    // }

    // public function listing() {
    //     return $this->belongsTo(Listing::class);
    // }

    public function admin() {
        return $this->belongsTo(Admin::class);
    }

    public function reasons() {
        return $this->belongsToMany(Reason::class);
    }
}
