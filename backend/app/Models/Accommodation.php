<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Accommodation extends Model {
    use HasFactory;

    protected $fillable = ['type', 'bed_count', 'bedroom_count', 'bathroom_count', 'minimum_days', 'maximum_days', 'amenities'];

    public function listing() {
        return $this->morphOne(Listing::class, 'listable');
    }

    public static function instantiateAccommodation(Request $request) {
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
}
