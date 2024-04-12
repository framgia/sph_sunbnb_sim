<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BookingRequest;
use App\Models\Booking;
use App\Models\User;
use App\Traits\ResponseHandlingTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BookingController extends Controller {
    use ResponseHandlingTrait;

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
            return self::notFoundResponse('User not found.');
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

        return self::createdResponse('Booking created successfully', $booking);
    }

    public function update($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->cancelBooking();

            return self::successfulTransactionResponse('Booking cancelled successfully.');
        } else {
            return self::notFoundResponse('Booking not found.');
        }
    }

    public function destroy($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->deleteBooking();

            return self::successfulTransactionResponse('Booking deleted successfully.');
        } else {
            return self::notFoundResponse('Booking not found.');
        }
    }

    public function updateBookingStatus(Request $request, $id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->approveRefuseBooking($request);

            return self::successfulTransactionResponse('Successful transaction.');
        } else {
            return self::notFoundResponse('Booking not found.');
        }
    }

    public function updateGuestBooking($id) {
        $booking = Booking::find($id);

        if ($booking) {
            $booking->updateGuestBooking();

            return self::successfulTransactionResponse('Booking removed successfully.');
        } else {
            return self::notFoundResponse('Booking not found.');
        }
    }

    public function updateReviewed($id) {
        $booking = Booking::find($id);
        $booking->markAsReviewed();

        return response()->json(['message' => 'Review status updated successfully'], Response::HTTP_OK);
    }
}
