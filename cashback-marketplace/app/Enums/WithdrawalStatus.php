<?php

namespace App\Enums;

use App\Traits\AdvancedEnum;

enum WithdrawalStatus: string
{
    use AdvancedEnum;

    case PENDING = 'pending';
    case ACCEPTED = 'accepted';
    case REJECTED = 'rejected';
}
