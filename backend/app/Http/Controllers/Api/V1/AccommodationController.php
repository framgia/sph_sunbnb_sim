<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\AccommodationRequest;
use App\Http\Requests\V1\AccommodationUpdateRequest;
use App\Models\Accommodation;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AccommodationController extends Controller {
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

    public function showAccommodationsByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return response()->json([
                'success' => false,
                'error' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $listings = Listing::paginateListingsByUser($userId, $request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function showPublicAccommodations(Request $request) {
        $listings = Listing::paginatePublicListings($request);

        return response()->json(
            Listing::listingsResponse($listings),
            Response::HTTP_OK
        );
    }

    public function store(AccommodationRequest $request) {
        $request->validated();

        return DB::transaction(function () use ($request) {
            $accommodation = Accommodation::createAccommodation($request);

            return response()->json([
                'success' => true,
                'message' => 'Listing created successfully',
                'data' => $accommodation,
            ], Response::HTTP_CREATED);
        });
    }

    public function update(AccommodationUpdateRequest $request, $listingId) {
        $request->validated();

        return DB::transaction(function () use ($request, $listingId) {

            $listing = Listing::findOrFail($listingId);
            $accommodation = $listing->listable;

            $accommodation->update($request->only([
                'type', 'bed_count', 'bedroom_count', 'bathroom_count', 'minimum_days',
                'maximum_days', 'amenities',
            ]));

            $listing->update($request->only([
                'name', 'description', 'province', 'city', 'barangay', 'street', 'zip_code',
                'price', 'maximum_guests',
            ]));

            $listing->updateMedia($listing, $request->media);

            return response()->json(['message' => 'Listing updated successfully'], Response::HTTP_OK);
        });
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
