<?php

namespace App\Http\Controllers;

use App\Traits\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class AccountController extends Controller
{
    use Notification;

    /**
     * Attach a brand to a current user (Creating account).
     *
     * @throws ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'account' => 'required|max:30',
            'brand' => 'required',
            'brand.id' => 'exists:brands,id',
        ], [
            'account.required' => 'required_field',
            'brand.required' => 'required_field',
        ]);

        $brand = $request->get('brand');
        $accountId = $request->get('account');

        $user = $request->user();

        // Check if user has already attached the account.
        $account = DB::table('accounts')
            ->select(['user_id', 'brand_id'])
            ->where('user_id', $user->id)
            ->where('brand_id', $brand['id'])
            ->get();

        // TODO: Refactor to custom validation rule or something else.
        if ($account->isNotEmpty()) {
            throw ValidationException::withMessages([
                'brand' => __('You already registered :name account.', [
                    'name' => $brand['name'],
                ]),
            ]);
        }

        // TODO: Move the whole logic from controller to service class or action.

        $user->accounts()->attach(
            $brand['id'],
            ['account_id' => $accountId]
        );

        $this->notify(
            __('You have successfully registered :name account.', ['name' => $brand['name']]),
            'success'
        );

        return redirect()
            ->intended(route('cashback', absolute: false));
    }
}
