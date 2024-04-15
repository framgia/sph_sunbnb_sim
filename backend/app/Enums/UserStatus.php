<?php

namespace App\Enums;

class UserStatus {
    const ACTIVE = 'active';

    const BANNED = 'banned';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
