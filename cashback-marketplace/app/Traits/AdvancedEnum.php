<?php

namespace App\Traits;

trait AdvancedEnum
{
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function list(): array
    {
        return array_column(self::cases(), 'value', 'value');
    }
}
