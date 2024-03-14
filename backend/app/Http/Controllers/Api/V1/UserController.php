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

        return response()->json([
            'success' => true,
            'users' => $users,
        ], Response::HTTP_OK);
    }

    public function show($userId) {
        $user = User::find($userId);

        if (! $user) {
            return response()->json([
                'success' => false,
                'error' => 'User not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'user' => $user,
        ], Response::HTTP_OK);
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

        return response()->json([
            'success' => true,
            'message' => 'Password updated successfully',
        ], Response::HTTP_OK);
    }
}
