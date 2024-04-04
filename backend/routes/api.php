<?php

use App\Http\Controllers\Api\V1\AccommodationController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\ExperienceController;
use App\Http\Controllers\Api\V1\ListingController;
use App\Http\Controllers\Api\V1\PasswordController;
use App\Http\Controllers\Api\V1\ReviewController;
use App\Http\Controllers\Api\V1\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'login'], function () {
    Route::post('/', [AuthController::class, 'login']);
    Route::post('/google', [AuthController::class, 'googleLogin']);
    Route::post('/admin', [AuthController::class, 'adminLogin']);
});

Route::group(['prefix' => 'register'], function () {
    Route::post('/', [AuthController::class, 'register']);
    Route::post('/google', [AuthController::class, 'googleRegister']);
});

Route::post('/forget-password', [PasswordController::class, 'forgotpassword']);
Route::post('/reset-password', [PasswordController::class, 'resetpassword']);

Route::get('/public-listings', [ListingController::class, 'showPublicListings']);
Route::get('/public-accommodations', [ListingController::class, 'showPublicAccommodations']);
Route::get('/public-experiences', [ListingController::class, 'showPublicExperiences']);
Route::get('/listing/{listingId}', [ListingController::class, 'show']);
Route::get('/review/{listingId}', [ReviewController::class, 'getByListing']);

Route::middleware('auth:api')->group(function () {
    Route::apiResource('user', UserController::class)->except(['update']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource('/listing', ListingController::class)->except(['destroy']);
    Route::get('/listing/user/{userId}', [ListingController::class, 'showListingsByUser']);
    Route::apiResource('/accommodation', AccommodationController::class)->except(['update', 'store']);
    Route::get('/accommodation/user/{userId}', [ListingController::class, 'showFilteredAccommodationsByUser']);
    Route::apiResource('/experience', ExperienceController::class)->except(['update', 'store']);
    Route::get('/experience/user/{userId}', [ListingController::class, 'showFilteredExperiencesByUser']);
    Route::get('/calendar/{listingId}', [CalendarController::class, 'show']);

    Route::apiResource('booking', BookingController::class)->except(['store', 'update', 'destroy']);
    Route::get('/booking/user/{userId}', [BookingController::class, 'showBookingsByUser']);
    Route::get('/booking/listing/{listingId}', [BookingController::class, 'showBookingsByListing']);

    Route::middleware('role:host')->group(function () {
        Route::post('/accommodation', [AccommodationController::class, 'store']);
        Route::post('/experience', [ExperienceController::class, 'store']);

        Route::put('/calendar/{listingId}', [CalendarController::class, 'set']);

        Route::put('/booking/approve-refuse/{bookingId}', [BookingController::class, 'updateBookingStatus']);
        Route::put('/booking/delete/{bookingId}', [BookingController::class, 'updateGuestBooking']);
    });

    Route::middleware('role:guest')->group(function () {
        Route::post('/booking', [BookingController::class, 'store']);
        Route::post('/review/accommodation/{listingId}', [ReviewController::class, 'storeAccommodation']);
        Route::post('/review/experience/{listingId}', [ReviewController::class, 'storeExperience']);
    });

    Route::middleware('check.owner:booking')->group(function () {
        Route::put('/booking/{bookingId}', [BookingController::class, 'update']);
        Route::delete('/booking/{bookingId}', [BookingController::class, 'destroy']);
        Route::put('/booking/mark-reviewed/{bookingId}', [BookingController::class, 'updateReviewed']);
    });

    Route::middleware('check.owner:listing')->group(function () {
        Route::delete('/listing/{listingId}', [ListingController::class, 'destroy']);
        Route::put('/experience/{listingId}', [ExperienceController::class, 'update']);
        Route::put('/accommodation/{listingId}', [AccommodationController::class, 'update']);
    });

    Route::middleware('check.owner:user')->group(function () {
        Route::put('/user/{userId}', [UserController::class, 'update']);
        Route::put('/user/change-password/{userId}', [UserController::class, 'updatePassword']);
    });
});

Route::middleware(['auth:api-admin', 'role:admin'])->group(function () {
    // TODO: Add admin routes here
});
