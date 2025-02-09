<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Category extends Model
{
    use HasFactory;

    /**
     * Brands that included in the category.
     */
    public function brands(): BelongsToMany
    {
        return $this->belongsToMany(Brand::class);
    }
}
