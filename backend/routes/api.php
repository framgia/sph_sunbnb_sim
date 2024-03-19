<?php

use App\Http\Controllers\Api\V1\AccommodationController;
use App\Http\Controllers\Api\V1\AdminAuthController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\ExperienceController;
use App\Http\Controllers\Api\V1\GoogleAuthController;
use App\Http\Controllers\Api\V1\ListingController;
use App\Http\Controllers\Api\V1\PasswordController;
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
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('accommodation', AccommodationController::class);
    Route::apiResource('experience', ExperienceController::class);
    Route::apiResource('/listing', ListingController::class);
    Route::get('/listing/user/{userId}', [ListingController::class, 'showListingsByUser']);

    Route::put('/calendar/{listingId}', [CalendarController::class, 'set']);
    Route::get('/calendar/{listingId}', [CalendarController::class, 'show']);

    Route::apiResource('user', UserController::class);
    Route::put('/user/change-password/{userId}', [UserController::class, 'updatePassword']);
});
