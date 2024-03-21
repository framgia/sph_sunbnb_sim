<?php

namespace App\Rules;

use App\Models\Listing;
use Carbon\Carbon;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class MinMaxDaysRule implements DataAwareRule, ValidationRule {
    protected $data = [];

    public function setData($data) {
        $this->data = $data;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $numberOfDays = Carbon::parse($this->data['start_date'])->diffInDays(Carbon::parse($this->data['end_date']));
        $listing = Listing::find($this->data['listing_id']);

        if ($listing && $listing->listable_type === 'App\Models\Accommodation') {
            if ($numberOfDays < $listing->listable->minimum_days || $numberOfDays > $listing->listable->maximum_days) {
                $fail(
                    'The number of days should be at least '
                    .$listing->listable->minimum_days
                    .' and at most '
                    .$listing->listable->maximum_days
                    .'.'
                );
            }
        }
    }
}
