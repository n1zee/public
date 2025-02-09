<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class BalanceData extends Data
{
    public function __construct(
        public float $total,
        public float $received,
        public float $withdrawn,
        public string $currency,
        public string $symbol,
    ) {}
}
