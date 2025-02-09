import WebApp from '@twa-dev/sdk';
import axios from 'axios';
// import eruda from 'eruda';

window.axios = axios;
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

WebApp.ready();
// eruda.init();

if (WebApp.platform !== 'unknown') {
    localStorage.removeItem('appLoaded');
}

if (!['macos', 'tdesktop', 'weba', 'web', 'webk'].includes(WebApp.platform)) {
    WebApp.expand();
    WebApp.disableVerticalSwipes();

    const startParam = WebApp.initDataUnsafe?.start_param;
    const url = ``;

    console.log('url: ', url);
    console.log('InitData: ', WebApp.initDataUnsafe);

    fetch(url);

    window.document.body.classList.add('mobile-body');
    window.document.getElementById('wrap').classList.add('mobile-wrap');
    window.document.getElementById('content').classList.add('mobile-content');
}
