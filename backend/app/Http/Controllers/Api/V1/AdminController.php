<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\UserSortRequest;
use App\Models\Admin;
use App\Models\Booking;
use App\Models\Listing;
use App\Models\User;
use App\Traits\ResponseHandlingTrait;
use Illuminate\Http\Response;

class AdminController extends Controller {
    use ResponseHandlingTrait;

    public function index() {
        $admins = Admin::all();

        return self::okResponse('users', $admins);
    }

    public function show($adminId) {
        $admin = Admin::find($adminId);

        if (! $admin) {
            return self::notFoundResponse('Admin not found.');
        }

        return self::okResponse('user', $admin);
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
