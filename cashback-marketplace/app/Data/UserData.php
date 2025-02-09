<?php

namespace App\Data;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;

class UserData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public ?string $email,
        #[MapInputName('telegram_id')]
        public ?string $telegram,
    ) {
    }
}
