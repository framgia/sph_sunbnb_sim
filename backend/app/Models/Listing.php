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
        $listing = new self;
        $listing->name = $request->name;
        $listing->description = $request->description;
        $listing->province = $request->province;
        $listing->city = $request->city;
        $listing->barangay = $request->barangay;
        $listing->street = $request->street;
        $listing->zip_code = $request->zip_code;
        $listing->price = $request->price;
        $listing->maximum_guests = $request->maximum_guests;
        $listing->listable()->associate($accommodation);
        $listing->user()->associate(auth()->user());

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
            $newMedia = Media::instantiateMedia($newItem, $listing);
            $newMedia->save();
        }
    }
}
