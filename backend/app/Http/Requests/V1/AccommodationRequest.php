<?php

namespace App\Http\Requests\V1;

use App\Enums\AccommodationType;
use App\Enums\Amenity;
use Illuminate\Foundation\Http\FormRequest;

class AccommodationRequest extends FormRequest {
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array {
        $listingRequest = new ListingRequest();

        return array_merge($listingRequest->rules(), [
            'type' => ['required', 'string', 'in:'.implode(',', AccommodationType::getConstants())],
            'bed_count' => 'required|integer|min:1',
            'bedroom_count' => 'required|integer|min:1',
            'bathroom_count' => 'required|integer|min:1',
            'minimum_days' => 'required|integer|min:1',
            'maximum_days' => 'required|integer|min:1',
            'amenities' => ['array', 'in:'.implode(',', Amenity::getConstants())],
            'media' => ['required', 'array', 'min:1'],
            'media.*' => 'url',
        ]);
    }
}
