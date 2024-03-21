<?php

namespace App\Rules;

use App\Models\Listing;
use Carbon\CarbonPeriod;
use Closure;
use Illuminate\Contracts\Validation\DataAwareRule;
use Illuminate\Contracts\Validation\ValidationRule;

class DateAvailabilityRule implements DataAwareRule, ValidationRule {
    protected $data = [];

    public function setData($data) {
        $this->data = $data;
    }

    public function validate(string $attribute, mixed $value, Closure $fail): void {
        $period = CarbonPeriod::create($this->data['start_date'], $this->data['end_date'])->toArray();
        $listing = Listing::find($this->data['listing_id']);

        if ($listing) {
            if (count($period) > 1 && $listing->listable_type === 'App\Models\Accommodation') {
                array_pop($period);
            }
            foreach ($period as $date) {
                $calendar = $listing->calendars()->where('date', $date)->first();

                if ($calendar && ! $calendar->available) {
                    $fail('Listing is not available for the selected dates.');
                }
            }
        }

    }
}
