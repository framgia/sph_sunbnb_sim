<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ExperienceRequest;
use App\Models\Experience;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller {
    public function store(ExperienceRequest $request) {
        $request->validated();

        return DB::transaction(function () use ($request) {
            $experience = Experience::createExperience($request);

            return response()->json([
                'success' => true,
                'message' => 'Experience listing created successfully',
                'data' => $experience,
            ], Response::HTTP_CREATED);
        });
    }
}
