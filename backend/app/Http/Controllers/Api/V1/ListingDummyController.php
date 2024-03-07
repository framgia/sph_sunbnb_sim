<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Amenity;
use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Listing;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ListingDummyController extends Controller {
    public function store(Request $request) {
        return DB::transaction(function () use ($request) {

            if ($request->has('amenities')) {
                $inputAmenities = $request->amenities;
                $validAmenities = Amenity::getConstants();

                foreach ($inputAmenities as $amenity) {
                    if (! in_array($amenity, $validAmenities)) {
                        return response()->json(['error' => 'Invalid amenity: '.$amenity], 400);
                    }
                }
            }

            $accommodation = new Accommodation;
            $accommodation->type = $request->type;
            $accommodation->bed_count = $request->bed_count;
            $accommodation->bedroom_count = $request->bedroom_count;
            $accommodation->bathroom_count = $request->bathroom_count;
            $accommodation->minimum_days = $request->minimum_days;
            $accommodation->maximum_days = $request->maximum_days;
            $accommodation->amenities = json_encode($request->amenities);
            $accommodation->save();

            $listing = new Listing;
            $listing->name = $request->name;
            $listing->description = $request->description;
            $listing->province = $request->province;
            $listing->city = $request->city;
            $listing->barangay = $request->barangay;
            $listing->street = $request->street;
            $listing->zip_code = $request->zip_code;
            $listing->price = $request->price;
            $listing->maximum_guests = $request->maximum_guests;
            $listing->listable()->associate($accommodation);
            $listing->user()->associate(auth()->user());
            $listing->save();

            foreach ($request->media as $mediaUrl) {
                $media = new Media;
                $media->media = json_encode($mediaUrl);
                $media->listing()->associate($listing);
                $media->save();
            }

            return response()->json(['message' => 'Listing created successfully'], 201);
        });
    }
}
