<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\PasswordUpdateRequest;
use App\Http\Requests\V1\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    public function index() {
        $users = User::all();

        return User::okResponse('users', $users);
    }

    public function show($userId) {
        $user = User::find($userId);

        if (! $user) {
            return User::notFoundResponse('User not found.');
        }

        return User::okResponse('user', $user);
    }

    public function showAdminSide($userId) {
        $userDetails = User::getUserDetails($userId);

        return response()->json($userDetails);
    }

    public function update(UserUpdateRequest $request) {
        $user = Auth::user();

        $user->updateUser($request);

        return response()->json([
            'success' => true,
            'message' => 'User information updated successfully',
            'user' => $user,
        ], Response::HTTP_OK);
    }

    public function updatePassword(PasswordUpdateRequest $request) {
        $user = Auth::user();

        $user->updatePassword($request);

        return User::successfulTransactionResponse('Password updated successfully.');
    }
}
