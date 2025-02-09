import './bootstrap.js';
import '../css/app.css';

import { LaravelReactI18nProvider } from 'laravel-react-i18n';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';

import { createInertiaApp } from '@inertiajs/react';

import { Ziggy } from './ziggy.js';

const appName = import.meta.env.VITE_APP_NAME || 'Cashbacker';

(globalThis as any).Ziggy = Ziggy;
(window as any).Ziggy = Ziggy;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx')
        ),
    setup({ el, App, props }) {
        const initialLang = props.initialPage.props.localeData as any;

        const appElement = (
            <LaravelReactI18nProvider
                locale={initialLang.languageCode}
                fallbackLocale='en'
                files={import.meta.glob('/lang/*.json')}
            >
                <App {...props} />
            </LaravelReactI18nProvider>
        );

        if (import.meta.env.DEV) {
            createRoot(el).render(appElement);
            return;
        }

        hydrateRoot(el, appElement);
    },
    progress: {
        color: '#21C063'
    }
});
