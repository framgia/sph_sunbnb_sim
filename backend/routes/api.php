<?php

use App\Http\Controllers\Api\V1\AdminAuthController;
use App\Http\Controllers\Api\V1\AuthController;
use App\Http\Controllers\Api\V1\GoogleAuthController;
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

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
});
