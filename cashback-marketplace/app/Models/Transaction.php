<?php

namespace App\Models;

use App\Casts\Money;
use App\Enums\TransactionType;
use App\Models\Traits\FormatedDate;
use App\Models\Traits\HasMoney;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use FormatedDate, HasMoney;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'transactions';

    public const PAGE_SIZE = 10;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'hash',
        'amount',
        'currency',
        'type',
        'user_id',
        'note',
        'accepted_at',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'amount' => Money::class,
            'type' => TransactionType::class,
        ];
    }

    /**
     * Transaction is pending or complete.
     */
    public function getIsAcceptedAttribute(): bool
    {
        return (bool) $this->accepted_at;
    }

    /**
     * Scope a query to only accepted transactions.
     */
    public function scopeIsAccepted(Builder $query): void
    {
        $query->whereNotNull('accepted_at');
    }

    /**
     * User that make transactions.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
