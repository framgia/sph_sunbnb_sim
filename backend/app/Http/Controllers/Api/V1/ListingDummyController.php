<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\Amenity;
use App\Http\Controllers\Controller;
use App\Models\Listing;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ListingDummyController extends Controller {
    public function update(Request $request, $id) {
        return DB::transaction(function () use ($request, $id) {

            $listing = Listing::findOrFail($id);
            $accommodation = $listing->listable;

            if ($request->has('amenities')) {
                $inputAmenities = $request->amenities;
                $validAmenities = Amenity::getConstants();

                foreach ($inputAmenities as $amenity) {
                    if (! in_array($amenity, $validAmenities)) {
                        return response()->json(['error' => 'Invalid amenity: '.$amenity], Response::HTTP_OK);
                    }
                }
            }

            $accommodation->update([
                'type' => $request->type,
                'bed_count' => $request->bed_count,
                'bedroom_count' => $request->bedroom_count,
                'bathroom_count' => $request->bathroom_count,
                'minimum_days' => $request->minimum_days,
                'maximum_days' => $request->maximum_days,
                'amenities' => json_encode($request->amenities),
            ]);

            $listing->update([
                'name' => $request->name,
                'description' => $request->description,
                'province' => $request->province,
                'city' => $request->city,
                'barangay' => $request->barangay,
                'street' => $request->street,
                'zip_code' => $request->zip_code,
                'price' => $request->price,
                'maximum_guests' => $request->maximum_guests,
            ]);

            foreach ($request->media as $mediaUrl) {
                Media::updateOrCreate(
                    ['media' => json_encode($mediaUrl), 'listing_id' => $listing->id],
                    ['media' => json_encode($mediaUrl)]
                );
            }

            return response()->json(['message' => 'Listing updated successfully'], Response::HTTP_OK);
        });
    }
}
