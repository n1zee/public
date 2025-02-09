<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class AccountDetailsData extends Data
{
    public function __construct(
        public string $accountId,
        public bool $isApproved,
        public ?string $approveDate,
    ) {}
}
