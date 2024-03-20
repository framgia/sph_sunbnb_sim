<?php

namespace App\Models;

use App\Http\Requests\V1\ExperienceRequest;
use App\Http\Requests\V1\ExperienceUpdateRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class Experience extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['type', 'start_time', 'end_time', 'language', 'inclusions'];

    protected $casts = [
        'start_time' => 'datetime:H:i',
        'end_time' => 'datetime:H:i',
    ];

    public function listing() {
        return $this->morphOne(Listing::class, 'listable');
    }

    public static function instantiateExperience(ExperienceRequest $request) {
        $experienceData = $request->all();
        $experienceData['language'] = json_encode($request->language);
        $experienceData['inclusions'] = json_encode($request->inclusions);

        return $experienceData;
    }

    public static function createExperience(ExperienceRequest $request) {
        $experienceData = self::instantiateExperience($request);
        $experience = self::create($experienceData);

        $listing = Listing::createListing($request, $experience);

        foreach ($request->media as $mediaUrl) {
            Media::createMedia($mediaUrl, $listing);
        }

        return $listing;
    }

    public function updateExperience(ExperienceUpdateRequest $request) {
        DB::transaction(function () use ($request) {
            $this->updateExperienceDetails($request);
            $this->updateListingDetails($request);
            $this->updateListingMedia($request->media);
        });
    }

    private function updateExperienceDetails(ExperienceUpdateRequest $request) {
        $startTime = Carbon::createFromFormat('H:i', $request->start_time);
        $endTime = Carbon::createFromFormat('H:i', $request->end_time);

        $this->update([
            'type' => $request->type,
            'start_time' => $startTime,
            'end_time' => $endTime,
            'language' => json_encode($request->language),
            'inclusions' => json_encode($request->inclusions),
        ]);
    }

    private function updateListingDetails(ExperienceUpdateRequest $request) {
        $this->listing->update($request->only([
            'name', 'description', 'province', 'city', 'barangay', 'street', 'zip_code',
            'price', 'maximum_guests',
        ]));
    }

    private function updateListingMedia($media) {
        $this->listing->updateMedia($this->listing, $media);
    }

    private static function experienceResponse($experiences) {
        return [
            'success' => true,
            'listings' => $experiences->items(),
            'pagination' => [
                'current_page' => $experiences->currentPage(),
                'per_page' => $experiences->perPage(),
                'total' => $experiences->total(),
                'next_page_url' => $experiences->nextPageUrl(),
                'path' => $experiences->path(),
                'prev_page_url' => $experiences->previousPageUrl(),
                'to' => $experiences->lastItem(),
            ],
        ];
    }

    public static function paginateExperienceListings(Request $request) {
        $perPage = $request->query('per_page', 3);

        $experiences = static::with(['listing.user', 'listing.media'])
            ->paginate($perPage);

        return self::experienceResponse($experiences);
    }

    public static function paginatePublicExperiences(Request $request) {
        $perPage = $request->query('per_page', 3);

        $experiences = static::whereHas('listing', function ($query) {
            $query->where('status', 'active');
        })
            ->with(['listing.user', 'listing.media'])
            ->paginate($perPage);

        return self::experienceResponse($experiences);
    }

    public function getInclusionsAttribute($value) {
        return json_decode($value, true);
    }

    public function getLanguageAttribute($value) {
        return json_decode($value, true);
    }
}
