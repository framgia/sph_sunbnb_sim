<?php

namespace App\Traits;

use Illuminate\Http\Response;

trait ResponseHandlingTrait {
    protected static function successLoginResponse($token) {
        return response()->json([
            'success' => true,
            'token' => $token->accessToken,
            'expires_in' => $token->token->expires_at,
        ], Response::HTTP_OK);
    }

    protected static function createdResponse($message, $data) {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data' => $data,
        ], Response::HTTP_CREATED);
    }

    protected static function okResponse($key, $data) {
        return response()->json([
            'success' => true,
            $key => $data,
        ], Response::HTTP_OK);
    }

    protected static function notFoundResponse($error) {
        return response([
            'success' => false,
            'error' => $error,
        ], Response::HTTP_NOT_FOUND);
    }

    protected static function successfulTransactionResponse($message) {
        return response([
            'success' => true,
            'message' => $message,
        ], Response::HTTP_OK);
    }

    protected static function listingsResponse($listings) {
        return [
            'success' => true,
            'listings' => $listings->items(),
            'pagination' => [
                'current_page' => $listings->currentPage(),
                'per_page' => $listings->perPage(),
                'total' => $listings->total(),
                'next_page_url' => $listings->nextPageUrl(),
                'path' => $listings->path(),
                'prev_page_url' => $listings->previousPageUrl(),
                'to' => $listings->lastItem(),
            ],
        ];
    }

    protected static function handleActionResponse($action) {
        switch ($action) {
            case 'approve':
            case 'reject':
            case 'update':
            case 'delete':
                return self::successfulTransactionResponse('Successful transaction.');
            default:
                return [
                    'error' => 'Invalid action provided.',
                ];
        }
    }
}
