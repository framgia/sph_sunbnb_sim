<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model {
    use HasFactory;

    protected $fillable = [
        'title', 'content', 'status',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function listing() {
        return $this->belongsTo(Listing::class);
    }

    public function admin() {
        return $this->belongsTo(Admin::class);
    }
}
