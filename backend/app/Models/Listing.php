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
        return $this->hasMany(Booking::class);
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

    public function handleCalendarEntries($dates) {
        foreach ($dates as $date) {
            $calendarEntry = $this->calendars()->where('date', $date['date'])->first();

            if ($calendarEntry) {
                $calendarEntry->update(['available' => $date['available']]);
            } else {
                $this->createCalendarEntry($date);
            }
        }
    }

    private function createCalendarEntry($date) {
        $createdEntry = $this->calendars()->create([
            'date' => $date['date'],
            'available' => $date['available'],
        ]);

        if (! $createdEntry) {
            throw new \Exception('No new entries were created.');
        }
    }
}
