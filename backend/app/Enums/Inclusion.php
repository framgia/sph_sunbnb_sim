<?php

namespace App\Enums;

class Inclusion {
    const FOOD = 'Food';

    const DRINKS = 'Drinks';

    const TRANSPORTATION = 'Transportation';

    const TICKETS = 'Tickets';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
