<?php

namespace App\Http\Requests\V1;

use App\Enums\ExperienceType;
use App\Enums\Inclusion;

class ExperienceRequest extends ListingRequest {
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
        $rules = parent::rules();

        $rules = array_merge($rules, [
            'type' => ['required', 'string', 'in:'.implode(',', ExperienceType::getConstants())],
            'duration' => 'required|integer|min:1',
            'language' => 'required|string',
            'inclusions' => ['array', 'in:'.implode(',', Inclusion::getConstants())],
        ]);

        return $rules;
    }
}
