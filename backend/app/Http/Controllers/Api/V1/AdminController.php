<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdminController extends Controller {
    public function index() {
        $admins = Admin::all();

        return response()->json([
            'success' => true,
            'users' => $admins,
        ], Response::HTTP_OK);
    }

    public function show($adminId) {
        $admin = Admin::find($adminId);

        if (! $admin) {
            return response()->json([
                'success' => false,
                'error' => 'Admin not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json([
            'success' => true,
            'user' => $admin,
        ], Response::HTTP_OK);
    }

    public function showUserAndAdmin(Request $request) {
        $allUsers = Admin::paginateAll($request);

        if (empty($allUsers['data'])) {
            return response()->json([
                'success' => false,
                'error' => 'User or Admin not found',
            ], Response::HTTP_NOT_FOUND);
        }

        return response()->json($allUsers, Response::HTTP_OK);
    }
}
