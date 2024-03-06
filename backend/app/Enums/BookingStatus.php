<?php

namespace App\Enums;

class BookingStatus {
    const PENDING = 'pending';

    const CANCELLED = 'cancelled';

    const REFUSED = 'refused';

    const UPCOMING = 'upcoming';

    const DONE = 'done';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
