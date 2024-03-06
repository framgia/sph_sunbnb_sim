<?php

namespace App\Enums;

class Amenity {
    const KITCHEN = 'Kitchen';

    const WIFI = 'Wifi';

    const TV = 'TV';

    const CABLE = 'Cable';

    const CRIB = 'Crib';

    const INDOOR_FIREPLACE = 'Indoor Fireplace';

    const AIR_CONDITIONING = 'Air Conditioning';

    const FAN = 'Fan';

    const SHOWER = 'Shower';

    const HEATER = 'Heater';

    const BATHTUB = 'Bathtub';

    const IRON = 'Iron';

    const WASHER = 'Washer';

    const DRYER = 'Dryer';

    const PARKING = 'Parking';

    const GYM = 'Gym';

    const BACKYARD = 'Backyard';

    const BEACH_ACCESS = 'Beach Access';

    const BALCONY = 'Balcony';

    const POOL = 'Pool';

    const JACUZZI = 'Jacuzzi';

    const OUTDOOR_FIREPLACE = 'Outdoor Fireplace';

    const BBQ_GRILL = 'BBQ Grill';

    const PETS_ALLOWED = 'Pets Allowed';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
