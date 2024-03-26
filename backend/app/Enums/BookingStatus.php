<?php

namespace App\Enums;

class BookingStatus {
    const PENDING = 'Pending';

    const CANCELLED = 'Cancelled';

    const REFUSED = 'Refused';

    const UPCOMING = 'Upcoming';

    const DONE = 'Done';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
