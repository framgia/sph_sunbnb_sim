<?php

namespace App\Enums;

class LanguageType {
    const FILIPINO = 'Filipino';

    const CEBUANO = 'Cebuano';

    const ILOCANO = 'Ilocano';

    const HILIGAYNON = 'Hiligaynon';

    const ENGLISH = 'English';

    const JAPANESE = 'Japanese';

    const MANDARIN = 'Mandarin';

    const HINDI = 'Hindi';

    const SPANISH = 'Spanish';

    const FRENCH = 'French';

    const ARABIC = 'Arabic';

    const BENGALI = 'Bengali';

    const PORTUGUESE = 'Portuguese';

    const RUSSIAN = 'Russian';

    const URDU = 'Urdu';

    const INDONESIAN = 'Indonesian';

    const GERMAN = 'German';

    public static function getConstants(): array {
        $reflectionClass = new \ReflectionClass(__CLASS__);

        return $reflectionClass->getConstants();
    }
}
