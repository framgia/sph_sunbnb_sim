<?php

namespace App\Http\Requests\V1;

use App\Enums\ExperienceType;
use App\Enums\Inclusion;
use Illuminate\Foundation\Http\FormRequest;

class ExperienceUpdateRequest extends FormRequest {
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
            'type' => ['required', 'string', 'in:'.implode(',', ExperienceType::getConstants())],
            'duration' => 'required|integer|min:1',
            'language' => ['required', 'string', 'in:'.implode(',', LanguageType::getConstants())],
            'inclusions' => ['array', 'in:'.implode(',', Inclusion::getConstants())],
            'name' => 'required|string',
            'description' => 'required',
            'province' => 'required|string',
            'city' => 'required|string',
            'barangay' => 'required|string',
            'street' => 'required|string',
            'zip_code' => 'required|numeric',
            'price' => 'required|numeric',
            'maximum_guests' => 'required|integer|min:1',
            'media.*' => ['array'],
            'media.delete' => ['array'],
            'media.delete.*' => 'integer',
            'media.new' => ['array'],
            'media.new.*' => 'url',
        ];
    }
}
