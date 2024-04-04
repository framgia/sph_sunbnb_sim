<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\BanReason;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class BanReasonController extends Controller {
    public function banUser(Request $request) {
        BanReason::validateBanRequest($request);

        $user = User::findOrFail($request->user_id);
        if ($user->status === 'banned') {
            return response()->json(['message' => 'User is already banned'], Response::HTTP_BAD_REQUEST);
        }

        BanReason::ban($request->user_id, $request->reason);

        return response()->json(['message' => 'User banned successfully'], Response::HTTP_OK);
    }

    public function unbanUser(Request $request) {
        $banReason = BanReason::where('user_id', $request->user_id)->first();

        if (! $banReason) {
            return response()->json(['message' => 'User is not banned'], Response::HTTP_NOT_FOUND);
        }

        $banReason->unban();

        return response()->json(['message' => 'User unbanned successfully'], Response::HTTP_OK);
    }
}
