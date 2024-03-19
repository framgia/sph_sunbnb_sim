<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Media extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['media'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public static function instantiateMedia(string $mediaUrl) {
        return [
            'media' => $mediaUrl,
        ];
    }

    public static function createMedia(string $mediaUrl, Listing $listing) {
        $mediaData = self::instantiateMedia($mediaUrl);
        $media = $listing->media()->create($mediaData);

        return $media;
    }
}
