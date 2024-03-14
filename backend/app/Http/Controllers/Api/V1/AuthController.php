<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Requests\V1\RegistrationRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\Response;

class AuthController extends Controller {
    public function login(LoginRequest $request) {
        $request->validated();
        $user = User::authenticateUser($request->all());
        $userToken = $user->createToken('Personal Access Token');

        return response()->json([
            'success' => true,
            'token' => $userToken->accessToken,
            'expires_in' => $userToken->token->expires_at,
            'user' => new UserResource($user),
        ], Response::HTTP_OK);
    }

    public function register(RegistrationRequest $request) {
        $request->validated();
        $user = User::instantiateUser($request->all());
        $userToken = $user->createToken('Personal Access Token');

        return response()->json([
            'success' => true,
            'token' => $userToken->accessToken,
            'expires_in' => $userToken->token->expires_at,
            'user' => new UserResource($user),
        ], Response::HTTP_CREATED);
    }

    public function logout() {
        request()->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ], Response::HTTP_OK);
    }
}
