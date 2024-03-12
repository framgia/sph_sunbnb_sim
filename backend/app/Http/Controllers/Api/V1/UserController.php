<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\UserUpdateRequest;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    public function update(UserUpdateRequest $request) {
        $user = Auth::user();

        $user->updateUser($request);

        return response()->json([
            'success' => true,
            'message' => 'User information updated successfully',
            'user' => $user,
        ]);
    }
}
