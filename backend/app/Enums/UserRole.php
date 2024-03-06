<?php

namespace App\Enums;

class UserRole {
    const HOST = 'host';

    const GUEST = 'guest';

    public static function toArray(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
