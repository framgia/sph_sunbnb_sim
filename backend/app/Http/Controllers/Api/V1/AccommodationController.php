<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\AccommodationRequest;
use App\Http\Requests\V1\AccommodationUpdateRequest;
use App\Models\Accommodation;
use App\Models\Listing;
use App\Models\Media;
use App\Models\User;
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

    public function store(AccommodationRequest $request) {
        $request->validated();

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

            foreach ($request->media['delete'] as $deleteItem) {
                $media = Media::find($deleteItem['id']);
                if ($media) {
                    $media->delete();
                }
            }

            foreach ($request->media['new'] as $newItem) {
                $newMedia = Media::instantiateMedia($newItem, $listing);
                $newMedia->save();
            }

            return response()->json(['message' => 'Listing updated successfully'], Response::HTTP_OK);
        });
    }

    public function destroy($listingId) {
        $listing = Listing::with(['listable', 'media'])->find($listingId);

        if ($listing) {
            $listing->deleteAssociatedItems();
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
