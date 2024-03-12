<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
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

    public function set($listingId) {
        try {
            $data = request()->validate([
                'dates' => 'required|array',
                'dates.*.date' => 'required|date',
                'dates.*.available' => 'required|boolean',
            ]);

            $dates = $data['dates'];
            $createdEntry = null;

            foreach ($dates as $date) {
                $listing = Listing::find($listingId);

                if (! $listing) {
                    return response()->json(['message' => 'Listing not found.'], Response::HTTP_NOT_FOUND);
                }

                $calendarEntry = Calendar::where('listing_id', $listingId)
                    ->where('date', $date['date'])
                    ->first();

                if ($calendarEntry) {
                    $calendarEntry->update(['available' => $date['available']]);
                } else {
                    $createdEntry = $listing->calendars()->create([
                        'date' => $date['date'],
                        'available' => $date['available'],
                    ]);

                    if (! $createdEntry) {
                        return response()->json(['message' => 'No new entries were created.'], Response::HTTP_BAD_REQUEST);
                    }
                }
            }

            return response()->json(['message' => 'Calendar availability has been set successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
