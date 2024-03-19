<?php

namespace App\Models;

use App\Http\Requests\V1\ReviewRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Http\Request;

class Review extends Model {
    use HasFactory;

    protected $fillable = ['overall_rating', 'cleanliness_rating', 'location_rating', 'value_rating', 'comment'];

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public static function instantiateReview(ReviewRequest $request) {

        $reviewData = $request->all();
        $totalRating = ($reviewData['cleanliness_rating'] + $reviewData['location_rating'] + $reviewData['value_rating']) / 3;
        $reviewData['overall_rating'] = round($totalRating, 2);

        return $reviewData;
    }

    public static function createReview(ReviewRequest $request, $listingId) {
        $reviewData = self::instantiateReview($request);

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
