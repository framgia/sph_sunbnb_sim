<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class PasswordController extends Controller {
    public function forgotpassword(Request $request) {
        try {
            $input = $request->only('email');
            $validator = Validator::make($input, [
                'email' => 'required|email',
            ]);

            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $status = Password::sendResetLink($request->only('email'));

            if ($status === Password::RESET_LINK_SENT) {
                return response()->json(['message' => 'Password reset link sent to your email'], Response::HTTP_OK);
            } elseif ($status === Password::INVALID_USER) {
                return response()->json(['error' => 'No user found with this email address'], Response::HTTP_NOT_FOUND);
            } else {
                return response()->json(['error' => 'Unable to send reset link. Please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
            }

        } catch (\Exception $e) {
            return response()->json(['error' => 'Something went wrong while processing your request. Please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
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
                return response()->json(['error' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
            }

            $status = Password::reset($input, function ($user) use ($request) {
                $user->forceFill(['password' => $request->password])->save();
            });

            return $status == Password::PASSWORD_RESET
                ? response()->json(['message' => 'Password reset successfully'], Response::HTTP_OK)
                : response()->json(['error' => 'Unable to reset password. Please check your email address.'], Response::HTTP_BAD_REQUEST);

        } catch (\Exception $e) {
            return response()->json(['error' => 'Unable to reset password. Please try again later.'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
