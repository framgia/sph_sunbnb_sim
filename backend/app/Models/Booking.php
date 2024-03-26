<?php

namespace App\Models;

use App\Enums\BookingStatus;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Booking extends Model {
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'start_date', 'end_date', 'number_of_guests', 'total_price', 'status',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function listing(): BelongsTo {
        return $this->belongsTo(Listing::class);
    }

    public function calendars(): HasMany {
        return $this->hasMany(Calendar::class);
    }

    public static function paginateBookingsByListing($listingId, Request $request) {
        $perPage = $request->query('per_page', 3);

        return static::where('listing_id', $listingId)
            ->with(['user:id,first_name,last_name,email'])
            ->paginate($perPage);
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

    public function deleteBooking() {
        if (in_array($this->status, [BookingStatus::CANCELLED, BookingStatus::REFUSED, BookingStatus::DONE])) {
            $this->deleteCalendarEntries();
            $this->delete();
        } elseif ($this->status === BookingStatus::PENDING) {
            abort(400, 'Cancel your booking first.');
        } elseif ($this->status === BookingStatus::UPCOMING) {
            abort(400, "You can't delete this booking.");
        }
    }

    private function deleteCalendarEntries() {
        foreach ($this->calendars as $calendarEntry) {
            $calendarEntry->delete();
        }
    }

    public function cancelBooking(): void {
        if (in_array($this->status, [BookingStatus::PENDING, BookingStatus::UPCOMING])) {
            $this->update(['status' => BookingStatus::CANCELLED]);
            $this->updateCalendarEntries(true);
        } else {
            abort(400, "You can't cancel this booking.");
        }
    }

    private function updateCalendarEntries(bool $available): void {
        foreach ($this->calendars as $calendarEntry) {
            $calendarEntry->update(['available' => $available]);
        }
    }

    public static function paginateBookingsByUser($userId, Request $request) {
        $perPage = $request->query('per_page', 5);

        return static::where('user_id', $userId)
            ->with(['listing', 'user'])
            ->paginate($perPage);
    }

    public static function bookingsResponse($bookings) {
        return [
            'success' => true,
            'bookings' => $bookings->items(),
            'pagination' => [
                'current_page' => $bookings->currentPage(),
                'per_page' => $bookings->perPage(),
                'total' => $bookings->total(),
                'next_page_url' => $bookings->nextPageUrl(),
                'path' => $bookings->path(),
                'prev_page_url' => $bookings->previousPageUrl(),
                'to' => $bookings->lastItem(),
            ],
        ];
    }
}
