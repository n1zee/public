import {
    backButton,
    viewport,
    themeParams,
    miniApp,
    initData,
    $debug,
    init as initSDK,
    postEvent,
    retrieveLaunchParams,
} from '@telegram-apps/sdk-react';

export function init(debug: boolean) {
    $debug.set(debug);

    initSDK();

    backButton.isSupported() && backButton.mount();
    miniApp.mount();
    themeParams.mount();
    initData.restore();
    void viewport
        .mount()
        .then(() => {
            viewport.bindCssVars();
        })
        .catch((e) => {
            console.error('Something went wrong mounting the viewport', e);
        });

    miniApp.bindCssVars();
    themeParams.bindCssVars();

    const lp = retrieveLaunchParams();

    postEvent('web_app_setup_swipe_behavior', { allow_vertical_swipe: false });

    if (!['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(lp.platform)) {
        postEvent('web_app_request_fullscreen');
    }
    debug && import('eruda').then((lib) => lib.default.init()).catch(console.error);
}
