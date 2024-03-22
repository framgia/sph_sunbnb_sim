<?php

namespace App\Http\Requests\V1;

use App\Enums\ExperienceType;
use App\Enums\Inclusion;
use App\Enums\LanguageType;
use Illuminate\Foundation\Http\FormRequest;

class ExperienceRequest extends FormRequest {
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
            'type' => ['required', 'string', 'in:'.implode(',', ExperienceType::getConstants())],
            'start_time' => 'required|string|date_format:H:i',
            'end_time' => 'required|string|date_format:H:i',
            'language' => ['array', 'in:'.implode(',', LanguageType::getConstants())],
            'inclusions' => ['array', 'in:'.implode(',', Inclusion::getConstants())],
            'media' => ['required', 'array', 'min:1'],
            'media.*' => 'url',
        ]);
    }
}
