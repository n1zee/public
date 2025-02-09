<?php

namespace App\Http\Controllers;

use App\Data\NetworkData;
use App\Models\Brand;
use App\Models\Network;
use Inertia\Inertia;
use Inertia\Response;

class CashbackController extends Controller
{
    /**
     * Shows cashback section.
     */
    public function __invoke(): Response
    {
        $brands = Brand::active()->get(['id', 'name']);

        $networks = NetworkData::collect(
            Network::active()->get()
        );

        // TODO: check accounts model loading, refactor it if needed.

        $user = auth()->user();

        return Inertia::render('cashback/index', [
            'balance' => $user?->getBalance(),
            'transactions' => $user?->getLatestTransactions(),
            'brands' => $brands,
            'networks' => $networks,
            'accounts' => $user?->getAccounts(),
        ]);
    }
}
