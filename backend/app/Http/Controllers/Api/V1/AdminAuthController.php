<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\LoginRequest;
use App\Http\Resources\V1\AdminResource;
use App\Models\Admin;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller {
    public function login(LoginRequest $request) {
        $request->validated();

        $admin = Admin::where('email', $request->email)->first();

        if (! $admin || ! Hash::check($request->password, $admin->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized',
            ], Response::HTTP_UNAUTHORIZED);
        }

        $adminToken = $admin->createToken('appToken');

        return response()->json([
            'success' => true,
            'token' => $adminToken->accessToken,
            'expires_in' => $adminToken->token->expires_at,
            'admin' => new AdminResource($admin),
        ]);
    }
}
