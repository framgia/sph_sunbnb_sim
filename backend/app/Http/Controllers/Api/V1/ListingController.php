<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ListingController extends Controller {
    public function index(Request $request) {
        $response = Listing::paginateListings($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function show($listingId) {
        $listing = Listing::with(['listable', 'media', 'user:id,first_name,last_name,email,created_at'])->find($listingId);

        if ($listing) {
            return Listing::okResponse('listing', $listing);
        } else {
            return Listing::notFoundResponse('Listing not found.');
        }
    }

    public function showListingsByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return User::notFoundResponse('User not found.');
        }

        $response = Listing::paginateListingsByUser($userId, $request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showPublicListings(Request $request) {
        $response = Listing::paginatePublicListings($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showPublicAccommodations(Request $request) {
        $response = Listing::paginateFilteredAccommodations($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showPublicExperiences(Request $request) {
        $response = Listing::paginateFilteredExperiences($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showFilteredAccommodationsByUser(Request $request) {
        $response = Listing::paginateFilteredAccommodationsHost($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showFilteredExperiencesByUser(Request $request) {
        $response = Listing::paginateFilteredExperiencesHost($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function destroy($listingId) {
        $listing = Listing::with(['listable', 'media'])->find($listingId);

        if ($listing) {
            $listing->deleteListing();

            return Listing::successfulTransactionResponse('Listing deleted successfully.');
        } else {
            return Listing::notFoundResponse('Listing not found.');
        }
    }

    public function updateListingAction(Request $request, $listingId) {
        $response = Listing::processListingAction($request, $listingId);

        return response()->json($response, Response::HTTP_OK);
    }
}
