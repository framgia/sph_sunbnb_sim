<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\CalendarRequest;
use App\Models\Calendar;
use App\Models\Listing;
use Illuminate\Http\Response;

class CalendarController extends Controller {
    public function show($listingId) {
        try {
            $calendarDates = Calendar::where('listing_id', $listingId)->get();

            return response()->json(['calendar_dates' => $calendarDates], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function set(CalendarRequest $request, $listingId) {
        try {
            $request->validated();

            $listing = Listing::find($listingId);

            if (! $listing) {
                return response()->json(['message' => 'Listing not found.'], Response::HTTP_NOT_FOUND);
            }
            $listing->handleCalendarEntries($request->input('dates'));

            return response()->json(['message' => 'Calendar availability has been set successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
