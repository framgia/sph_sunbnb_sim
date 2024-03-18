<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['media', 'listing_id'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public static function instantiateMedia(string $mediaUrl, Listing $listing) {
        return [
            'media' => $mediaUrl,
            'listing_id' => $listing->id,
        ];
    }

    public static function createMedia(string $mediaUrl, Listing $listing) {
        $mediaData = self::instantiateMedia($mediaUrl, $listing);

        return self::create($mediaData);
    }
}
