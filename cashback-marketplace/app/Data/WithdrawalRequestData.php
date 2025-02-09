<?php

namespace App\Data;

use App\Enums\WithdrawalStatus;
use Spatie\LaravelData\Data;

class WithdrawalRequestData extends Data
{
    public function __construct(
        public int $id,
        public string $date,
        public MoneyData $money,
        public WithdrawalStatus $status,
        public NetworkData $network,
        public string $address,
        public string $tx,
    ) {}
}
