<?php

namespace App\Models;

use App\Enums\AccommodationType;
use App\Enums\ExperienceType;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

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

    public function reviews(): HasMany {
        return $this->hasMany(Review::class);
    }

    public function listable() {
        return $this->morphTo();
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public static function createListing(Request $request, $listable) {
        $listingData = $request->all();

        $listing = new Listing($listingData);
        $listing->user()->associate(auth()->user());
        $listing->listable()->associate($listable);
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

    public static function paginatePublicListings(Request $request) {
        $perPage = $request->query('per_page', 3);

        return static::whereHas('listable', function ($query) {
            $query->where('status', 'active');
        })
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

    public function handleCalendarEntries($dates) {
        foreach ($dates as $date) {
            $calendarEntry = $this->calendars()->where('date', $date['date'])->first();

            if ($calendarEntry) {
                $calendarEntry->update([
                    'available' => $date['available'],
                    'booking_id' => $date['booking_id'] ?? null,
                ]);
            } else {
                $this->createCalendarEntry($date);
            }
        }
    }

    private function createCalendarEntry($date) {
        $createdEntry = $this->calendars()->create([
            'date' => $date['date'],
            'available' => $date['available'],
            'booking_id' => $date['booking_id'] ?? null,
        ]);

        if (! $createdEntry) {
            throw new \Exception('No new entries were created.');
        }
    }

    public static function paginateFilteredItems(Request $request, $filterMethod, $userId = null) {
        $filters = $request->only(['search', 'price_range', 'ratings', 'date_range', 'type']);
        if ($userId) {
            $filters['status'] = $request->query('status');
        }
        $perPage = $request->query('per_page', 3);

        $query = self::$filterMethod($filters, $userId);
        $query->orderBy('updated_at', 'desc')->orderBy('created_at', 'desc');

        return $query->paginate($perPage);
    }

    public static function paginateFilteredAccommodations(Request $request) {
        return self::paginateFilteredItems($request, 'filterAccommodation');
    }

    public static function paginateFilteredExperiences(Request $request) {
        return self::paginateFilteredItems($request, 'filterExperience');
    }

    public static function filterAccommodation($filters, $userId = null) {
        return self::filterListings($filters, Accommodation::class, AccommodationType::getConstants(), $userId);
    }

    public static function filterExperience($filters, $userId = null) {
        return self::filterListings($filters, Experience::class, ExperienceType::getConstants(), $userId);
    }

    protected static $filterMethods = [
        'search' => 'applySearchFilter',
        'price_range' => 'applyPriceRangeFilter',
        'ratings' => 'applyRatingsFilter',
        'type' => 'applyTypeFilter',
    ];

    private static function applyFilterMethods($query, $filters, $listableType, $constants) {
        foreach (self::$filterMethods as $filterKey => $methodName) {
            if (isset($filters[$filterKey])) {
                self::$methodName($query, $filters[$filterKey], $listableType, $constants);
            }
        }
    }

    public static function filterListings($filters, $listableType, $constants, $userId = null) {
        $query = self::query();

        if ($userId !== null) {
            $query->where('user_id', $userId);
            $query->whereHasMorph('listable', [$listableType], function ($query) use ($listableType) {
                $query->where('listable_type', $listableType);
            });
            self::$filterMethods['status'] = 'applyStatusFilter';
        } else {
            $query->whereHasMorph('listable', [$listableType], function ($query) use ($listableType) {
                $query->where('listable_type', $listableType)->where('status', 'active');
            });
            self::$filterMethods['date_range'] = 'applyDateRangeFilter';
        }

        $query->with('listable:id,type', 'media');
        self::applyFilterMethods($query, $filters, $listableType, $constants);

        return $query;
    }

    public static function paginateFilteredAccommodationsHost(Request $request) {
        $user = auth()->user();
        if ($user) {
            $userId = $user->id;

            return self::paginateFilteredItems($request, 'filterAccommodation', $userId);
        } else {
            abort(Response::HTTP_BAD_REQUEST, 'User not found.');
        }
    }

    public static function paginateFilteredExperiencesHost(Request $request) {
        $user = auth()->user();
        if ($user) {
            $userId = $user->id;

            return self::paginateFilteredItems($request, 'filterExperience', $userId);
        } else {
            abort(Response::HTTP_BAD_REQUEST, 'User not found.');
        }
    }

    private static function applyStatusFilter($query, $status) {
        $query->where('status', $status);
    }

    private static function applySearchFilter($query, $search) {
        $query->where('name', 'like', '%'.$search.'%');
    }

    private static function applyPriceRangeFilter($query, $priceRange) {
        $priceRange = explode('-', $priceRange);
        $minPrice = floatval($priceRange[0]);
        $maxPrice = floatval($priceRange[1]);
        $query->whereBetween('price', [$minPrice, $maxPrice]);
    }

    private static function applyRatingsFilter($query, $ratings) {
        $ratings = explode('-', $ratings);
        $query->whereHas('reviews', function ($query) use ($ratings) {
            $query->whereBetween('overall_rating', [$ratings[0], $ratings[1]]);
        });
    }

    private static function applyDateRangeFilter($query, $dateRange) {
        $dateRange = explode(':', $dateRange);

        foreach ($dateRange as $date) {
            Validator::validate(['date' => $date], ['date' => 'date']);
        }

        $query->where('status', 'active')
            ->where(function ($query) use ($dateRange) {
                $query->whereHas('calendars', function ($query) use ($dateRange) {
                    $query->whereBetween('date', [$dateRange[0], $dateRange[1]])
                        ->where('available', true);
                })->orWhereDoesntHave('calendars', function ($query) use ($dateRange) {
                    $query->whereBetween('date', [$dateRange[0], $dateRange[1]]);
                });
            });
    }

    private static function applyTypeFilter($query, $type, $listableType, $constants) {
        if (! in_array($type, $constants)) {
            throw new \InvalidArgumentException('Invalid type provided.');
        }

        $query->whereHas('listable', function ($query) use ($type) {
            $query->where('type', $type);
        });
    }
}
