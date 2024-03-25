<?php

namespace App\Http\Requests\V1;

use Illuminate\Foundation\Http\FormRequest;

class AccommodationReviewRequest extends FormRequest {
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
        return [
            'cleanliness_rating' => 'required|numeric|min:1|max:5',
            'location_rating' => 'required|numeric|min:1|max:5',
            'value_rating' => 'required|numeric|min:1|max:5',
            'comment' => 'nullable|string',
        ];
    }
}
