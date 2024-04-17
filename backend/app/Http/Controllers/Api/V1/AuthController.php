<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\GoogleLoginRequest;
use App\Http\Requests\V1\GoogleRegistrationRequest;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Requests\V1\RegistrationRequest;
use App\Models\Admin;
use App\Models\User;
use App\Traits\ResponseHandlingTrait;
use Google_Client;
use Illuminate\Http\Response;

class AuthController extends Controller {
    use ResponseHandlingTrait;

    private $googleClient;

    public function __construct(Google_Client $googleClient) {
        $this->googleClient = $googleClient;
    }

    public function login(LoginRequest $request) {
        $request->validated();
        $userToken = User::authenticateUser($request->all());

        return self::successLoginResponse($userToken);
    }

    public function adminLogin(LoginRequest $request) {
        $request->validated();
        $adminToken = Admin::authenticateAdmin($request->all());

        return self::successLoginResponse($adminToken);
    }

    public function googleLogin(GoogleLoginRequest $request) {
        $request->validated();
        $payload = $this->googleClient->verifyIdToken($request->input('id_token'));
        $userToken = User::authenticateGoogleUser($payload);

        return self::successLoginResponse($userToken);
    }

    public function register(RegistrationRequest $request) {
        $request->validated();
        $userToken = User::createUser($request->all());

        return self::successLoginResponse($userToken);
    }

    public function googleRegister(GoogleRegistrationRequest $request) {
        $request->validated();
        $payload = $this->googleClient->verifyIdToken($request->input('id_token'));
        $userToken = User::createGoogleUser($payload, $request->input('role'));

        return self::successLoginResponse($userToken);
    }

    public function logout() {
        request()->user()->token()->revoke();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ], Response::HTTP_OK);
    }
}
