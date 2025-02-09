<?php

namespace App\Http\Controllers;

use Akaunting\Money\Currency;
use Akaunting\Money\Money;
use App\Http\Requests\WithdrawalRequest;
use App\Models\WithdrawalRequest as Withdrawal;
use App\Traits\Notification;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class WithdrawalController extends Controller
{
    use Notification;

    public function index(): Response
    {
        $withdrawalRequests = auth()->user()->getWithdrawalRequests();

        return Inertia::render('withdrawal/index', [
            'withdrawalRequests' => $withdrawalRequests,
        ]);
    }

    /**
     * @throws ValidationException
     */
    public function request(WithdrawalRequest $request): RedirectResponse
    {
        $amount = $request->get('amount');
        $address = $request->get('address');
        $network = $request->get('network');

        $user = $request->user();
        $balance = $user->getBalance();

        // Check the balance.
        if ($balance->total < $amount) {
            throw ValidationException::withMessages([
                'amount' => __('Insufficient funds.'),
            ]);
        }

        // TODO: refactor to model setter.
        $amountMoney = new Money(
            $amount,
            new Currency('USD'),
            true
        );

        // TODO: refactor to an action or service class.
        try {
            Withdrawal::create([
                'user_id' => $user->id,
                'amount' => $amountMoney,
                'address' => trim($address),
                'network_id' => $network['id'],
            ]);

            $this->notify(
                __('Withdrawal request successfully created and sent.'),
                'success'
            );
        } catch (Throwable $e) {
            $this->notify(
                __('Failed to send withdrawal request.'),
                'error'
            );
            // TODO: logging $e
        }

        return redirect()
            ->intended(route('cashback', absolute: false));
    }
}
