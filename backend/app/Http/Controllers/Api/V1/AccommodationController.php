<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\AccommodationRequest;
use App\Http\Requests\V1\AccommodationUpdateRequest;
use App\Models\Accommodation;
use App\Models\Listing;
use App\Traits\ResponseHandlingTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AccommodationController extends Controller {
    use ResponseHandlingTrait;

    public function index(Request $request) {
        $response = Accommodation::paginateAccommodationListings($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function store(AccommodationRequest $request) {
        $request->validated();

        return DB::transaction(function () use ($request) {
            $accommodation = Accommodation::createAccommodation($request);

            return self::createdResponse('Accommodation listing created successfully', $accommodation);
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
}
