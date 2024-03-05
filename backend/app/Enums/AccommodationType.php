<?php

namespace App\Enums;

class AccommodationType {
    const BEACH_HOUSE = 'Beach House';

    const MANSION = 'Mansion';

    const TINY_HOUSE = 'Tiny House';

    const ROOM = 'Room';

    const FARM = 'Farm';

    const CONDOMINIUM = 'Condominium';

    const HOTEL = 'Hotel';

    const CABIN = 'Cabin';

    const TOWER = 'Tower';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
