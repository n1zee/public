<?php

namespace App\Services;

use Illuminate\Http\Request;

class BrowserLanguageService
{
    public static function detectLanguage(Request $request): string
    {
        $preferredLanguages = $request->getLanguages();

        $browserLanguage = reset($preferredLanguages);

        if (preg_match('/^([a-z]+)/i', $browserLanguage, $matches)) {
            return strtolower($matches[1]);
        }

        return (string) config('app.fallback_locale');
    }
}
