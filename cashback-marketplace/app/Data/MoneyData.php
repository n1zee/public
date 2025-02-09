<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class MoneyData extends Data
{
    public function __construct(
        public float $value,
        public string $currency,
        public string $symbol,
    ) {}
}
