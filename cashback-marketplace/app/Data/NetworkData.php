<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class NetworkData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $address,
        public string $tx,
    ) {}
}
