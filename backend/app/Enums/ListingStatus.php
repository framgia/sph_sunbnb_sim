<?php

namespace App\Enums;

class ListingStatus {
    const PENDING = 'Pending';

    const REFUSED = 'Refused';

    const ACTIVE = 'Active';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
