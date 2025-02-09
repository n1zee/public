<?php

namespace App\Enums;

use App\Traits\AdvancedEnum;

enum TransactionType: string
{
    use AdvancedEnum;

    case RECEIVE = 'receive';
    case WITHDRAW = 'withdraw';
}
