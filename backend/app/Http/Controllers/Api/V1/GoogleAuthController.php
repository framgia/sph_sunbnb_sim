<?php

namespace App\Http\Controllers\Api\V1;

use App\Enums\UserStatus;
use App\Http\Controllers\Controller;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Google_Client;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class GoogleAuthController extends Controller {
    private $googleClient;

    public function __construct(Google_Client $googleClient) {
        $this->googleClient = $googleClient;
    }

    public function login(Request $request) {
        $payload = $payload = $this->googleClient->verifyIdToken($request->input('id_token'));

        if ($payload && isset($payload['sub']) && isset($payload['email'])) {
            $user = User::firstOrCreate(
                ['email' => $payload['email']],
                [
                    'provider_id' => $payload['sub'],
                    'provider' => 'google',
                    'first_name' => $payload['given_name'] ?? null,
                    'last_name' => $payload['family_name'] ?? null,
                    'status' => UserStatus::ACTIVE,
                ]
            );

            $userToken = $user->createToken('appToken');

            return response()->json([
                'success' => true,
                'token' => $userToken->accessToken,
                'expires_in' => $userToken->token->expires_at,
                'user' => new UserResource($user),
            ], Response::HTTP_OK);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Invalid Google token',
            ], Response::HTTP_BAD_REQUEST);
        }
    }
}
