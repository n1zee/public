<?php

namespace App\Http\Middleware;

use App\Services\BrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    public function handle(Request $request, Closure $next): Response
    {
        $preferLanguageCode = BrowserLanguageService::detectLanguage($request);

        if ($request->session()->has('locale')) {
            App::setLocale($request->session()->get('locale'));
        } else {
            App::setLocale($preferLanguageCode);
            $request->session()->put('locale', $preferLanguageCode);
        }

        inertia()->share('localeData', [
            'languageCode' => $request->session()->get('locale'),
        ]);

        return $next($request);
    }
}
