<?php

namespace App\Http\Controllers;

use App\Http\Requests\ConnectAccountRequest;
use App\Models\Brand;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class ApiController extends Controller
{
    /**
     * Attach account to user.
     * Example:
     * .../api/v1/account/connect?cuid=8&hash=cd589049cd014ebe11d018a2f431973a&player_id=12345
     */
    public function connect(ConnectAccountRequest $request): JsonResponse
    {
        $accountId = $request->get('player_id');

        $userId = $request->get('cuid');
        $user = User::whereId($userId)->first();

        $brandHash = $request->get('hash');
        $brand = Brand::whereHash($brandHash)->first();

        // Check if user has already attached the account.
        $account = DB::table('accounts')
            ->select(['user_id', 'brand_id'])
            ->where('user_id', $user->id)
            ->where('brand_id', $brand->id)
            ->get();

        if ($account->isEmpty()) {
            $user->accounts()->attach(
                $brand->id,
                ['account_id' => $accountId]
            );
        }

        return response()->json([
            'success' => true,
        ]);
    }
}
