<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ListingController extends Controller {
    public function storeAccommodation(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'province' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'zip_code' => 'required|integer',
            'price' => 'required|string',
            'maximum_guests' => 'required|integer',
            'accommodation' => 'required|array',
        ]);

        $newListing = Listing::create($validatedData);

        $validatedAccommodationData = $request->validate([
            'type' => 'required|string|max:255',
            'bed_count' => 'required|integer',
            'bedroom_count' => 'required|integer',
            'bathroom_count' => 'required|integer',
            'minimum_days' => 'required|integer',
            'maximum_days' => 'required|integer',
        ]);

        $newListingAcco = Accommodation::create($validatedAccommodationData);

        return response()->json([
            'message' => 'Listing and Accommodation created successfully',
            'listing' => $newListing,
        ], Response::HTTP_CREATED);
    }
}
