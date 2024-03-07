<?php

namespace App\Enums;

class Reason {
    const INACCURATE = 'It is inaccurate or incorrect.';

    const NOT_REAL = 'It is not a real place or stay.';

    const SCAM = 'It is a scam.';

    const OFFENSIVE = 'It is offensive.';

    const OTHERS = 'It is something else.';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
