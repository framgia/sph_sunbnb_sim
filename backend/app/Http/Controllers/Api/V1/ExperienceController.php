<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\ExperienceRequest;
use App\Http\Requests\V1\ExperienceUpdateRequest;
use App\Models\Experience;
use App\Models\Listing;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;

class ExperienceController extends Controller {
    public function index(Request $request) {
        $response = Experience::paginateExperienceListings($request);

        return response()->json($response, Response::HTTP_OK);
    }

    public function showPublicExperiences(Request $request) {
        $response = Experience::paginatePublicExperiences($request);

        return response()->json($response, Response::HTTP_OK);
    }

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

    public function update(ExperienceUpdateRequest $request, $listingId) {
        $request->validated();

        return DB::transaction(function () use ($request, $listingId) {
            $listing = Listing::findOrFail($listingId);
            $experience = $listing->listable;

            $experience->updateExperience($request);

            return response()->json(['message' => 'Experience listing updated successfully'], Response::HTTP_OK);
        });
    }
}
