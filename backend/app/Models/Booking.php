<?php

namespace App\Models;

use App\Enums\BookingStatus;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\DB;

class Booking extends Model {
    use HasFactory;

    protected $fillable = [
        'start_date', 'end_date', 'number_of_guests', 'total_price', 'status',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public static function createBooking($request): self {
        $listing = Listing::findOrFail($request->listing_id);

        $booking = new Booking($request->only(['start_date', 'end_date', 'number_of_guests']));
        $booking->user()->associate(auth()->user());
        $booking->listing()->associate($listing);
        $booking['total_price'] = $booking->calculateTotalPrice();
        $booking['status'] = BookingStatus::PENDING;

        DB::transaction(function () use ($booking, $listing) {
            $booking->save();
            $listing->handleCalendarEntries($booking->setCalendarDates(false));
        });

        return $booking;
    }

    private function calculateTotalPrice(): float {
        $numberOfDays = Carbon::parse($this->start_date)->diffInDays(Carbon::parse($this->end_date));

        return $this->listing->listable_type === 'App\Models\Experience'
            ? $this->listing->price * $this->number_of_guests
            : $this->listing->price * $numberOfDays;
    }

    private function setCalendarDates($available): array {
        $dates = CarbonPeriod::create($this->start_date, $this->end_date)->toArray();

        if (count($dates) > 1 && $this->listing->listable_type === 'App\Models\Accommodation') {
            array_pop($dates);
        }

        $calendarDates = [];

        foreach ($dates as $date) {
            $calendarDates[] = [
                'date' => $date,
                'available' => $available,
                'booking_id' => $available ? null : $this->id,
            ];
        }

        return $calendarDates;
    }
}
