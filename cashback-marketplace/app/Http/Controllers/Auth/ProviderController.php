<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class ProviderController extends Controller
{
    public function redirect(Request $request, string $provider): RedirectResponse|string
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback(Request $request, string $provider): RedirectResponse
    {
        $response = Socialite::driver($provider)->user();

        // Response (for Telegram):
        // id: "240124569"
        // nickname: "kalitvyan"
        // name: "Kostya K."
        // email: null
        // avatar: "https://t.me/i/userpic/320/OifAq3Y5PxFYbEU1lXDQmXxHNTUJClj6zimRQrlLA1Q.jpg

        // Returned User fields (Google)
        // id
        // nickname
        // name
        // email
        // avatar

        $data = [
            'password' => Hash::make(Str::password()),
            'name' => $response->getName() ?? $response->getNickname(),
            'avatar' => $response->getAvatar(),
        ];

        if ($provider === 'telegram') {
            $data['telegram_id'] = $response->getId();
        }

        $user = User::updateOrCreate(
            ['email' => $response->getEmail()],
            $data
        );

        if ($user->wasRecentlyCreated) {
            event(new Registered($user));
        }

        Auth::login($user, remember: true);

        return redirect()->intended(route('dashboard', absolute: false));
    }
}
