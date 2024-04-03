<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\AccommodationReviewRequest;
use App\Http\Requests\V1\ExperienceReviewRequest;
use App\Models\Accommodation;
use App\Models\Experience;
use App\Models\Listing;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ReviewController extends Controller {
    public function getByListing(Request $request, $listingId) {
        $listing = Listing::find($listingId);

        if (! $listing) {
            return response()->json(['error' => 'Listing not found'], Response::HTTP_NOT_FOUND);
        }

        $reviews = Review::paginateReviewsbyListing($request, $listingId);
        $data = Review::getMetadata($listingId);

        return response()->json(Review::reviewResponse($reviews, $data), Response::HTTP_OK);
    }

    public function storeAccommodation(AccommodationReviewRequest $request, $listingId) {
        $request->validated();
        $listing = Listing::findOrFail($listingId);
        $listableType = $listing->listable_type;
        if ($listableType !== Accommodation::class) {
            return response()->json(['message' => 'This is not a type of accommodation.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $review = Review::createAccommodationReview($request, $listingId);
        if ($review) {
            return response()->json(['message' => 'Review created successfully'], Response::HTTP_CREATED);
        } else {
            return response()->json(['message' => 'No review created'], Response::HTTP_NOT_FOUND);
        }
    }

    public function storeExperience(ExperienceReviewRequest $request, $listingId) {
        $request->validated();
        $review = Review::createExperienceReview($request, $listingId);
        $listing = Listing::findOrFail($listingId);
        $listableType = $listing->listable_type;
        if ($listableType !== Experience::class) {
            return response()->json(['message' => 'This is not a type of experience.'], Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        if ($review) {
            return response()->json(['message' => 'Review created successfully'], Response::HTTP_CREATED);
        } else {
            return response()->json(['message' => 'No review created'], Response::HTTP_NOT_FOUND);
        }
    }
}
