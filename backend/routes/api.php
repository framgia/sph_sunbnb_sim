<?php

use App\Http\Controllers\Api\V1\AccommodationController;
use App\Http\Controllers\Api\V1\AdminAuthController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\CalendarController;
use App\Http\Controllers\Api\V1\GoogleAuthController;
use App\Http\Controllers\Api\V1\PasswordController;
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

Route::post('/register', [AuthController::class, 'register']);

Route::post('/forget-password', [PasswordController::class, 'forgotpassword']);
Route::post('/reset-password', [PasswordController::class, 'resetpassword']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('accommodation', AccommodationController::class);
    Route::get('/accommodation/user/{userId}', [AccommodationController::class, 'showAccommodationsByUser']);
    Route::put('/calendar/{listingId}', [CalendarController::class, 'set']);
    Route::get('/calendar/{listingId}', [CalendarController::class, 'show']);
});
