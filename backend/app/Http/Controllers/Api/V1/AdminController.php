<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\UserSortRequest;
use App\Models\Admin;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Http\Response;

class AdminController extends Controller {
    public function index() {
        $admins = Admin::all();

        return response()->json([
            'success' => true,
            'users' => $admins,
        ], Response::HTTP_OK);
    }

    public function show($adminId) {
        $admin = Admin::find($adminId);

        if (! $admin) {
            return response()->json([
                'success' => false,
                'error' => 'Admin not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'user' => $admin,
        ], Response::HTTP_OK);
    }

    public function showUserAndAdmin(UserSortRequest $request) {
        $allUsers = Admin::paginateAll($request);
        
        return response()->json($allUsers, Response::HTTP_OK);
    }

    public function analytics() {
        return response()->json([
            'success' => true,
            'data' => [
                'users' => User::getUserAnalytics(),
                'bookings' => Booking::getBookingAnalytics(),
                'listings' => Listing::getListingAnalytics(),
            ],
        ]);
    }
}
