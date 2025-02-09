<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Shows app main screen (Brands with registration links)
     */
    public function __invoke(): Response
    {
        $brands = Brand::with(['categories'])
            ->active()
            ->paginate(Brand::PAGE_SIZE);

        $accountsIds = auth()->user()
            ?->getAccounts()
            ->map(fn ($account) => $account->only('id'))
            ->pluck('id')
            ->toArray();

        return Inertia::render('brands/list', [
            'brands' => $brands,
            'accounts' => $accountsIds,
        ]);
    }
}
