<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BookingRequest;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookingController extends Controller {
    public function show($id) {
        $booking = Booking::with(['listing', 'user'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'booking' => $booking,
        ], Response::HTTP_OK);
    }

    public function showBookingsByUser($userId, Request $request) {
        $user = User::find($userId);

        if (! $user) {
            return User::userNotFoundResponse();
        }

        $response = Booking::paginateBookingsByUser($userId, $request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showBookingsByListing($listingId, Request $request) {
        $response = Booking::paginateBookingsByListing($listingId, $request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function store(BookingRequest $request) {
        $request->validated();
        $booking = Booking::createBooking($request);

        return response()->json([
            'success' => true,
            'booking' => $booking,
        ], Response::HTTP_CREATED);
    }

    public function update($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->cancelBooking();

            return response()->json([
                'success' => true,
                'message' => 'Booking cancelled successfully',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Booking not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function destroy($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->deleteBooking();

            return response()->json([
                'success' => true,
                'message' => 'Booking deleted successfully',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Booking not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function updateBookingStatus(Request $request, $id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->approveRefuseBooking($request);

            return response()->json([
                'success' => true,
                'message' => 'Successful transaction',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Booking not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function updateGuestBooking($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->updateGuestBooking();

            return response()->json([
                'success' => true,
                'message' => 'Booking removed successfully',
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'error' => 'Booking not found',
            ], Response::HTTP_NOT_FOUND);
        }
    }

    public function updateReviewed($id) {
        $booking = Booking::find($id);
        $booking->markAsReviewed();

        return response()->json(['message' => 'Review status updated successfully'], Response::HTTP_OK);
    }
}
