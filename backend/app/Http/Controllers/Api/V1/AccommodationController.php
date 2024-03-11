<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\AccommodationType;
use App\Enums\Amenity;
use App\Http\Controllers\Controller;
use App\Models\Accommodation;
use App\Models\Listing;
use App\Models\Media;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class AccommodationController extends Controller {
    public function index() {
        $listings = Listing::with(['listable', 'media', 'user:id,first_name,last_name,email,created_at'])
            ->paginate(3);

        return response()->json([
            'success' => true,
            'listings' => $listings->items(),
            'pagination' => [
                'current_page' => $listings->currentPage(),
                'per_page' => $listings->perPage(),
                'total' => $listings->total(),
                'next_page_url' => $listings->nextPageUrl(),
                'path' => $listings->path(),
                'prev_page_url' => $listings->previousPageUrl(),
                'to' => $listings->lastItem(),
            ],
        ], Response::HTTP_OK);
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

    public function showAccommodationsByUser($userId) {
        $user = User::select('id', 'first_name', 'last_name', 'email', 'created_at')
            ->find($userId);

        if (! $user) {
            return response()->json([
                'success' => false,
                'error' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        $listings = $user->listings()->with(['listable', 'media'])
            ->paginate(3);

        return response()->json([
            'success' => true,
            'user' => $user,
            'listings' => $listings->items(),
            'pagination' => [
                'current_page' => $listings->currentPage(),
                'per_page' => $listings->perPage(),
                'total' => $listings->total(),
                'next_page_url' => $listings->nextPageUrl(),
                'path' => $listings->path(),
                'prev_page_url' => $listings->previousPageUrl(),
                'to' => $listings->lastItem(),
            ],
        ], Response::HTTP_OK);
    }

    public function store(Request $request) {
        $this->validate($request, $this->getValidationRules());

        return DB::transaction(function () use ($request) {

            $accommodation = Accommodation::instantiateAccommodation($request);
            $accommodation->save();

            $listing = Listing::instantiateListing($request, $accommodation);
            $listing->save();

            foreach ($request->media as $mediaUrl) {
                $media = Media::instantiateMedia($mediaUrl, $listing);
                $media->save();
            }

            return response()->json([
                'success' => true,
                'message' => 'Listing created successfully',
            ], Response::HTTP_CREATED);
        });
    }

    private function getValidationRules() {
        return [
            'type' => ['required', 'string', 'in:'.implode(',', AccommodationType::getConstants())],
            'bed_count' => 'required|integer|min:1',
            'bedroom_count' => 'required|integer|min:1',
            'bathroom_count' => 'required|integer|min:1',
            'minimum_days' => 'required|integer|min:1',
            'maximum_days' => 'required|integer|min:1',
            'amenities' => ['array', 'in:'.implode(',', Amenity::getConstants())],
            'name' => 'required|string',
            'description' => 'required',
            'province' => 'required|string',
            'city' => 'required|string',
            'barangay' => 'required|string',
            'street' => 'required|string',
            'zip_code' => 'required|numeric',
            'price' => 'required|string',
            'maximum_guests' => 'required|integer|min:1',
            'media' => 'required|min:1',
            'media.*' => 'url',
        ];
    }

    public function destroy($listingId) {
        $listing = Listing::with(['listable', 'media'])->find($listingId);

        if ($listing) {
            if ($listing->listable) {
                $listing->listable->delete();
            }

            foreach ($listing->media as $media) {
                $media->delete();
            }
            $listing->delete();

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
