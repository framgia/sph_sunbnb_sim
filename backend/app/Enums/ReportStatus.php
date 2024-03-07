<?php

namespace App\Enums;

class ReportStatus {
    const OPEN = 'open';

    const CLOSED = 'closed';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
