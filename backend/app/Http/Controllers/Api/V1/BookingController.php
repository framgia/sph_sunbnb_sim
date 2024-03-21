<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BookingRequest;
use App\Models\Booking;
use Illuminate\Http\Response;

class BookingController extends Controller {
    public function show($id) {
        $booking = Booking::with(['listing', 'user'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'booking' => $booking,
        ], Response::HTTP_OK);
    }

    public function store(BookingRequest $request) {
        $request->validated();
        $booking = Booking::createBooking($request);

        return response()->json([
            'success' => true,
            'booking' => $booking,
        ], Response::HTTP_CREATED);
    }
}
