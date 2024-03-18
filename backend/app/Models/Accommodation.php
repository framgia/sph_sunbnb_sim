<?php

namespace App\Models;

use App\Http\Requests\V1\AccommodationRequest;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Accommodation extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['type', 'bed_count', 'bedroom_count', 'bathroom_count', 'minimum_days', 'maximum_days', 'amenities'];

    public function listing() {
        return $this->morphOne(Listing::class, 'listable');
    }

    public static function instantiateAccommodation(AccommodationRequest $request) {
        $accommodationData = $request->all();
        $accommodationData['amenities'] = json_encode($request->amenities);

        return $accommodationData;
    }

    public static function createAccommodation(AccommodationRequest $request) {
        $accommodationData = self::instantiateAccommodation($request);

        return self::create($accommodationData);
    }

    public function getAmenitiesAttribute($value) {
        return json_decode($value, true);
    }
}
