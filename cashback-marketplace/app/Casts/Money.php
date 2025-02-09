<?php

namespace App\Casts;

use Akaunting\Money\Currency;
use Akaunting\Money\Money as MoneyObject;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use UnexpectedValueException;

class Money implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): MoneyObject
    {
        return new MoneyObject(
            $attributes['amount'],
            new Currency($attributes['currency']),
        );
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): array
    {
        if (! $value instanceof MoneyObject) {
            throw new UnexpectedValueException('The given value is not an MoneyObject instance.');
        }

        return [
            'amount' => (int) $value->getAmount(),
            'currency' => $value->getCurrency()->getCurrency(),
        ];
    }
}
