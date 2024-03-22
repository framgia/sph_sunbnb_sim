<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ListingController extends Controller {
    public function index(Request $request) {
        $listings = Listing::paginateListings($request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function show($listingId) {
        $listing = Listing::with(['listable', 'media', 'user:id,first_name,last_name,email,created_at'])->find($listingId);

        if ($listing) {
            return response()->json([
                'success' => true,
                'listing' => $listing,
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Listing not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function showListingsByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return User::userNotFoundResponse();
        }

        $listings = Listing::paginateListingsByUser($userId, $request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function showAccommodationsByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return User::userNotFoundResponse();
        }

        $listings = Listing::paginateAccommodationsByUser($userId, $request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function showExperiencesByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return User::userNotFoundResponse();
        }

        $listings = Listing::paginateExperiencesByUser($userId, $request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function showPublicListings(Request $request) {
        $listings = Listing::paginatePublicListings($request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function showPublicAccommodations(Request $request) {
        $accommodations = Listing::paginateFilteredAccommodations($request);

        return response()->json(
            Listing::listingsResponse($accommodations),
            Response::HTTP_OK
        );
    }

    public function showPublicExperiences(Request $request) {
        $listings = Listing::paginateFilteredExperiences($request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function destroy($listingId) {
        $listing = Listing::with(['listable', 'media'])->find($listingId);

        if ($listing) {
            $listing->deleteListing();

            return response()->json([
                'success' => true,
                'message' => 'Listing is deleted successfully',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Listing not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }
}
