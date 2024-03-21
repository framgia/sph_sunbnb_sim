<?php

use App\Http\Controllers\Api\V1\AccommodationController;
use App\Http\Controllers\Api\V1\AdminAuthController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\BookingController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\ExperienceController;
use App\Http\Controllers\Api\V1\GoogleAuthController;
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
    Route::post('/google', [GoogleAuthController::class, 'login']);
    Route::post('/admin', [AdminAuthController::class, 'login']);
});

Route::group(['prefix' => 'register'], function () {
    Route::post('/', [AuthController::class, 'register']);
    Route::post('/google', [GoogleAuthController::class, 'register']);
});

Route::post('/forget-password', [PasswordController::class, 'forgotpassword']);
Route::post('/reset-password', [PasswordController::class, 'resetpassword']);
Route::get('/public-listingss', [ListingController::class, 'showPublicListings']);
Route::get('/public-accommodations', [AccommodationController::class, 'showPublicAccommodations']);
Route::get('/public-experiences', [ExperienceController::class, 'showPublicExperiences']);

Route::middleware('auth:api')->group(function () {
    Route::apiResource('accommodation', AccommodationController::class)->except(['update', 'store']);
    Route::post('accommodation', [AccommodationController::class, 'store'])->middleware('role:host');
    Route::put('accommodation/{listingId}', [AccommodationController::class, 'update'])
        ->middleware('check.owner:listing');
    Route::get('/accommodation/user/{userId}', [ListingController::class, 'showAccommodationsByUser']);

    Route::apiResource('experience', ExperienceController::class)->except(['update', 'store']);
    Route::post('experience', [ExperienceController::class, 'store'])->middleware('role:host');
    Route::put('experience/{listingId}', [ExperienceController::class, 'update'])
        ->middleware('check.owner:listing');
    Route::get('/experience/user/{userId}', [ListingController::class, 'showExperiencesByUser']);

    Route::apiResource('/listing', ListingController::class)->except(['destroy']);
    Route::delete('listing/{listingId}', [ListingController::class, 'destroy'])
        ->middleware('check.owner:listing');
    Route::get('/listing/user/{userId}', [ListingController::class, 'showListingsByUser']);

    Route::put('/calendar/{listingId}', [CalendarController::class, 'set'])->middleware('role:host');
    Route::get('/calendar/{listingId}', [CalendarController::class, 'show']);

    Route::apiResource('user', UserController::class)->except(['update']);
    Route::put('user/{userId}', [UserController::class, 'update'])
        ->middleware('check.owner:user');
    Route::put('/user/change-password/{userId}', [UserController::class, 'updatePassword'])
        ->middleware('check.owner:user');
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::post('/review/{listingId}', [ReviewController::class, 'store'])->middleware('role:guest');
    Route::get('/review/{listingId}', [ReviewController::class, 'getByListing']);

    Route::apiResource('booking', BookingController::class);
});
