<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller {
    public function login(LoginRequest $request) {
        $request->validated();

        if (! Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $user = User::find(Auth::user()->id);
        $userToken = $user->createToken('appToken');

        return response()->json([
            'success' => true,
            'token' => $userToken->accessToken,
            'expires_in' => $userToken->token->expires_at,
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }

    public function logout(Request $request) {
        $request->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ], Response::HTTP_OK);
    }
}
