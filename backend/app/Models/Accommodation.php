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
        $accommodation = new self;
        $accommodation->type = $request->type;
        $accommodation->bed_count = $request->bed_count;
        $accommodation->bedroom_count = $request->bedroom_count;
        $accommodation->bathroom_count = $request->bathroom_count;
        $accommodation->minimum_days = $request->minimum_days;
        $accommodation->maximum_days = $request->maximum_days;
        $accommodation->amenities = json_encode($request->amenities);

        return $accommodation;
    }

    public function getAmenitiesAttribute($value) {
        return json_decode($value, true);
    }
}
