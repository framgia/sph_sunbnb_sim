<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Calendar;
use Illuminate\Http\Response;

class CalendarController extends Controller {
    public function set() {
        try {
            $data = request()->validate([
                'listing_id' => 'required|exists:listings,id',
                'dates' => 'required|array',
                'dates.*.date' => 'required|date',
                'dates.*.availability' => 'required|boolean',
            ]);

            $listingId = $data['listing_id'];
            $dates = $data['dates'];

            foreach ($dates as $date) {
                $calendarEntry = Calendar::where('listing_id', $listingId)
                    ->where('date', $date['date'])
                    ->first();

                if ($calendarEntry) {
                    $calendarEntry->update(['availability' => $date['availability']]);
                } else {
                    $createdEntry = Calendar::create([
                        'listing_id' => $listingId,
                        'date' => $date['date'],
                        'availability' => $date['availability'],
                    ]);
                }

                if (! $createdEntry) {
                    return response()->json(['message' => 'Error creating calendar entry. Please contact the administrator'], Response::HTTP_INTERNAL_SERVER_ERROR);
                }
            }

            return response()->json(['message' => 'Calendar availability has been set successfully'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error setting calendar availability. Please contact the administrator'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
