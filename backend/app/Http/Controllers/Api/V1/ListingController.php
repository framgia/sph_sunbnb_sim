<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\Response;

class ListingController extends Controller {
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
