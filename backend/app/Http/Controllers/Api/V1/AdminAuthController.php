<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Resources\V1\AdminResource;
use App\Models\Admin;

class AdminAuthController extends Controller {
    public function login(LoginRequest $request) {
        $request->validated();
        $admin = Admin::authenticateAdmin($request->all());
        $adminToken = $admin->createToken('appToken');

        return response()->json([
            'success' => true,
            'token' => $adminToken->accessToken,
            'expires_in' => $adminToken->token->expires_at,
            'admin' => new AdminResource($admin),
        ]);
    }
}
