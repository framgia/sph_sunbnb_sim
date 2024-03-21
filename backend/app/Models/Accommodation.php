<?php

namespace App\Models;

use App\Http\Requests\V1\AccommodationRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;

class Accommodation extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['type', 'bed_count', 'bedroom_count', 'bathroom_count', 'minimum_days', 'maximum_days', 'amenities'];

    public function listing() {
        return $this->morphOne(Listing::class, 'listable');
    }

    public static function instantiateAccommodation(AccommodationRequest $request) {
        $accommodationData = $request->all();
        $accommodationData['amenities'] = json_encode($request->amenities);

        return $accommodationData;
    }

    public static function createAccommodation(AccommodationRequest $request) {
        $accommodationData = self::instantiateAccommodation($request);
        $accommodation = self::create($accommodationData);

        $listing = Listing::createListing($request, $accommodation);

        foreach ($request->media as $mediaUrl) {
            Media::createMedia($mediaUrl, $listing);
        }

        return $listing;
    }

    private static function accommodationResponse($accommodations) {
        return [
            'success' => true,
            'listings' => $accommodations->items(),
            'pagination' => [
                'current_page' => $accommodations->currentPage(),
                'per_page' => $accommodations->perPage(),
                'total' => $accommodations->total(),
                'next_page_url' => $accommodations->nextPageUrl(),
                'path' => $accommodations->path(),
                'prev_page_url' => $accommodations->previousPageUrl(),
                'to' => $accommodations->lastItem(),
            ],
        ];
    }

    public static function paginateAccommodationListings(Request $request) {
        $perPage = $request->query('per_page', 3);

        $accommodations = static::with(['listing.user', 'listing.media'])
            ->paginate($perPage);

        return self::accommodationResponse($accommodations);
    }

    public function getAmenitiesAttribute($value) {
        return json_decode($value, true);
    }
}
