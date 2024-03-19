<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Listing extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['name', 'description', 'province', 'city', 'barangay', 'street', 'zip_code', 'price', 'maximum_guests'];

    public function media(): HasMany {
        return $this->hasMany(Media::class);
    }

    public function calendars(): HasMany {
        return $this->hasMany(Calendar::class);
    }

    public function bookings(): HasMany {
        return $this->hasMany(Accommodation::class);
    }

    public function reports(): HasMany {
        return $this->hasMany(Report::class);
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

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public static function instantiateListing(Request $request, Accommodation $accommodation) {
        $listingData = $request->all();

        return $listingData;
    }

    public static function createListing(Request $request, Accommodation $accommodation) {
        $listingData = self::instantiateListing($request, $accommodation);

        $listing = new Listing($listingData);
        $listing->user()->associate(auth()->user());
        $listing->listable()->associate($accommodation);
        $listing->save();

        return $listing;
    }

    public static function updateMedia($listing, $mediaData) {
        foreach ($mediaData['delete'] as $deleteItem) {
            $media = Media::find($deleteItem);
            if ($media) {
                $media->delete();
            }
        }

        foreach ($mediaData['new'] as $newItem) {
            Media::createMedia($newItem, $listing);
        }
    }

    public function deleteListing() {
        if ($this->listable) {
            $this->listable->delete();
        }

        foreach ($this->media as $media) {
            $media->delete();
        }

        $this->delete();
    }

    public static function paginateListings(Request $request) {
        $perPage = $request->query('per_page', 3);

        return static::with(['listable', 'media', 'user:id,first_name,last_name,email,created_at'])
            ->paginate($perPage);
    }

    public static function paginateListingsByUser($userId, Request $request) {
        $perPage = $request->query('per_page', 3);

        return static::where('user_id', $userId)
            ->with(['listable', 'media', 'user:id,first_name,last_name,email,created_at'])
            ->paginate($perPage);
    }

    public static function listingsResponse($listings) {
        return [
            'success' => true,
            'listings' => $listings->items(),
            'pagination' => [
                'current_page' => $listings->currentPage(),
                'per_page' => $listings->perPage(),
                'total' => $listings->total(),
                'next_page_url' => $listings->nextPageUrl(),
                'path' => $listings->path(),
                'prev_page_url' => $listings->previousPageUrl(),
                'to' => $listings->lastItem(),
            ],
        ];
    }
}
