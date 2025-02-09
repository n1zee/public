<?php

namespace App\Data;

use App\Enums\TransactionType;
use Spatie\LaravelData\Data;

class TransactionData extends Data
{
    public function __construct(
        public int $id,
        public TransactionType $type,
        public MoneyData $money,
        public string $date,
        public bool $isAccepted,
        public ?string $note,
    ) {}
}
