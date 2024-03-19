<?php

namespace App\Models;

use App\Http\Requests\V1\ExperienceRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Experience extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['type', 'duration', 'language', 'inclusions'];

    public function listing() {
        return $this->morphOne(Listing::class, 'listable');
    }

    public static function instantiateExperience(ExperienceRequest $request) {
        $experienceData = $request->all();
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
}
