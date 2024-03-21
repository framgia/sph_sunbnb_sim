<?php

namespace App\Rules;

use App\Models\Listing;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class MinMaxGuestsRule implements DataAwareRule, ValidationRule {
    protected $data = [];

    public function setData($data) {
        $this->data = $data;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $listing = Listing::find($this->data['listing_id']);

        if ($listing) {
            if ($value > $listing->maximum_guests || $value < 1) {
                $fail(
                    'The number of guests should be at least 1 and at most '
                    .$listing->maximum_guests
                    .'.'
                );
            }
        }
    }
}
