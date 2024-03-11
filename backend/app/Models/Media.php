<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Media extends Model {
    use HasFactory;

    protected $fillable = ['media'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public static function instantiateMedia(string $mediaUrl, Listing $listing) {
        $media = new self;
        $media->media = json_encode($mediaUrl);
        $media->listing()->associate($listing);

        return $media;
    }
}
