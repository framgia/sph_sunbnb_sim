<?php

namespace App\Models;

use App\Http\Requests\V1\AccommodationReviewRequest;
use App\Http\Requests\V1\ExperienceReviewRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class Review extends Model {
    use HasFactory;

    protected $fillable = ['overall_rating', 'cleanliness_rating', 'location_rating', 'value_rating', 'comment'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public static function instantiateAccommodationReview(AccommodationReviewRequest $request) {

        $reviewData = $request->all();
        $reviewData = Arr::only($reviewData, array_keys((new AccommodationReviewRequest())->rules()));
        $totalRating = ($reviewData['cleanliness_rating'] + $reviewData['location_rating'] + $reviewData['value_rating']) / 3;
        $reviewData['overall_rating'] = round($totalRating, 2);

        return $reviewData;
    }

    public static function createAccommodationReview(AccommodationReviewRequest $request, $listingId) {
        $reviewData = self::instantiateAccommodationReview($request);
        $review = new Review($reviewData);

        $review->listing()->associate(Listing::find($listingId));
        $review->user()->associate(auth()->user());
        $review->save();

        return $review;
    }

    public static function createExperienceReview(ExperienceReviewRequest $request, $listingId) {
        $reviewData = $request->all();
        $reviewData = Arr::only($reviewData, array_keys((new ExperienceReviewRequest())->rules()));
        $review = new Review($reviewData);

        $review->listing()->associate(Listing::find($listingId));
        $review->user()->associate(auth()->user());
        $review->save();

        return $review;
    }

    public static function paginateReviewsbyListing(Request $request, $listingId) {
        $perPage = $request->query('per_page', 4);

        return static::where('listing_id', $listingId)
            ->with(['user:id,first_name,last_name,email,created_at'])
            ->orderBy('created_at', 'desc')
            ->paginate($perPage);
    }

    public static function reviewResponse($review) {
        return [
            'listings' => $review->items(),
            'pagination' => [
                'current_page' => $review->currentPage(),
                'per_page' => $review->perPage(),
                'total' => $review->total(),
                'next_page_url' => $review->nextPageUrl(),
                'path' => $review->path(),
                'prev_page_url' => $review->previousPageUrl(),
                'to' => $review->lastItem(),
            ],
        ];
    }
}
