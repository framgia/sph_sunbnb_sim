<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\BanRequest;
use App\Http\Requests\V1\UnbanRequest;
use App\Models\BanReason;
use Illuminate\Http\Response;

class BanReasonController extends Controller {
    public function createBanReason(BanRequest $request) {
        try {
            BanReason::banUser($request);

            return response()->json(['message' => 'User banned successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function updateBan(UnbanRequest $request) {
        try {
            BanReason::unbanUser($request);

            return response()->json(['message' => 'User unbanned successfully'], Response::HTTP_OK);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
