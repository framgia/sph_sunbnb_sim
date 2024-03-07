<?php

namespace App\Enums;

class ExperienceType {
    const FOOD_AND_DRINKS = 'Food & Drinks';

    const ART_AND_CULTURE = 'Art & Culture';

    const ENTERTAINMENT = 'Entertainment';

    const TOURS = 'Tours';

    const SPORTS = 'Sports';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
