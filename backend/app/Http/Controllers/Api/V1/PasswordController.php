<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller {
    //
    public function forgotpassword(Request $request) {
        try {
            $input = $request->only('email');
            $validator = Validator::make($input, [
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            $status = Password::sendResetLink($input);

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => 'Password reset link sent to your email'], 200);
            } elseif ($status === Password::INVALID_USER) {
                return response()->json(['error' => 'No user found with this email address'], 404);
            } else {
                return response()->json(['error' => 'Unable to send reset link. Please try again later.'], 500);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong while processing your request. Please try again later.'], 500);
        }
    }

    public function resetpassword(Request $request) {
        try {
            $input = $request->only('email', 'token', 'password', 'password_confirmation');
            $validator = Validator::make($input, [
                'token' => 'required',
                'email' => 'required|email',
                'password' => 'required|confirmed|min:8',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], 422);
            }

            $status = Password::reset($input, function ($user, $password) {
                $user->password = Hash::make($password);
                $user->save();
            });

            return $status == Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successfully'], 200)
                : response()->json(['error' => 'Unable to reset password. Please check your email address.'], 400);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to reset password. Please try again later.'], 500);
        }
    }
}
