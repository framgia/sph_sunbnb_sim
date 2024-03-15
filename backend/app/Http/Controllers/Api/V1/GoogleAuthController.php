<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\GoogleLoginRequest;
use App\Http\Requests\V1\GoogleRegistrationRequest;
use App\Models\User;
use Google_Client;
use Illuminate\Http\Response;

class GoogleAuthController extends Controller {
    private $googleClient;

    public function __construct(Google_Client $googleClient) {
        $this->googleClient = $googleClient;
    }

    public function login(GoogleLoginRequest $request) {
        $request->validated();
        $payload = $this->googleClient->verifyIdToken($request->input('id_token'));
        $user = User::authenticateGoogleUser($payload);
        $userToken = $user->createToken('Personal Access Token');

        return response()->json([
            'success' => true,
            'token' => $userToken->accessToken,
            'expires_in' => $userToken->token->expires_at,
        ], Response::HTTP_OK);
    }

    public function register(GoogleRegistrationRequest $request) {
        $request->validated();
        $payload = $this->googleClient->verifyIdToken($request->input('id_token'));
        $user = User::instantiateGoogleUser($payload, $request->input('role'));
        $userToken = $user->createToken('Personal Access Token');

        return response()->json([
            'success' => true,
            'token' => $userToken->accessToken,
            'expires_in' => $userToken->token->expires_at,
        ], Response::HTTP_CREATED);
    }
}
