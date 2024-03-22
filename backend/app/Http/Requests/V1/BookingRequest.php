<?php

namespace App\Http\Requests\V1;

use App\Rules\DateAvailabilityRule;
use App\Rules\MinMaxDaysRule;
use App\Rules\MinMaxGuestsRule;
use Illuminate\Foundation\Http\FormRequest;

class BookingRequest extends FormRequest {
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
            'start_date' => 'required|date|after:today',
            'end_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
                new DateAvailabilityRule(),
                new MinMaxDaysRule(),
            ],
            'number_of_guests' => [
                'required',
                'integer',
                'min:1',
                new MinMaxGuestsRule(),
            ],
            'listing_id' => 'required|integer|exists:listings,id',
        ];
    }
}
