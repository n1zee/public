<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Account extends Pivot
{
    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'accounts';

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'approved_at' => 'datetime:d.m.Y',
        ];
    }

    /**
     * Get account formated approve date.
     */
    public function getApproveDateAttribute(): ?string
    {
        return $this->approved_at?->format('d.m.Y');
    }

    /**
     * Account approved or not.
     */
    public function getIsApprovedAttribute(): bool
    {
        return (bool) $this->approved_at;
    }
}
