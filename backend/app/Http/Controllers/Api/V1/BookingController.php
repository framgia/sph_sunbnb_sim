<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BookingController extends Controller {
    public function store(Request $request) {

        try {

            $validatedData = $request->validate([
                'listing_id' => 'required|exists:listings,id',
                'start_date' => 'required|date',
                'end_date' => 'required|date|after:start_date',
                'number_of_guests' => 'required|integer|min:1',
                'total_price' => 'required|numeric|min:0',
                'status' => 'required|string',
            ]);
            $guestId = Auth::id();

            $validatedData['guest_id'] = $guestId;

            Booking::create($validatedData);

            return response()->json(['message' => 'Booking successful'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong. Please contact administrator.'], 500);
        }
    }
}
