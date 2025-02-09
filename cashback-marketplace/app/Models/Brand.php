<?php

namespace App\Models;

use App\Models\Traits\IsActive;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Brand extends Model
{
    use HasFactory, IsActive, SoftDeletes;

    public const PAGE_SIZE = 10;

    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'cashback' => 'decimal:0',
        ];
    }

    /**
     * The "booted" method of the model.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('ordered', static function (Builder $builder) {
            $builder->orderBy('order');
        });
    }

    /**
     * Categories to which the brand belongs.
     */
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class);
    }

    /**
     * Users that belongs to the Brand.
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'accounts', 'brand_id', 'user_id')
            ->withTimestamps()
            ->withPivot(['account_id', 'approved_at'])
            ->using(Account::class);
    }
}
