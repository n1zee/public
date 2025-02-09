<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class AccountData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $logo,
        public float $cashback,
        public AccountDetailsData $details
    ) {}
}
