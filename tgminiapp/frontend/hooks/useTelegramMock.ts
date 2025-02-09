import {
    isTMA,
    type LaunchParams,
    mockTelegramEnv,
    parseInitData,
    retrieveLaunchParams,
} from '@telegram-apps/sdk-react';

import { useClientOnce } from '#hooks/useClientOnce';

/**
 * Mocks Telegram environment in development mode.
 */
export function useTelegramMock(isDev = false): void {
    useClientOnce(() => {
        if (!isDev) return;

        if (!sessionStorage.getItem('env-mocked') && isTMA('simple')) {
            return;
        }
        let lp: LaunchParams | undefined;
        try {
            lp = retrieveLaunchParams();
        } catch {
            const initDataRaw = new URLSearchParams([
                [
                    'user',
                    JSON.stringify({
                        id: 99281932,
                        first_name: 'Andrew',
                        last_name: 'Rogue',
                        username: 'rogue',
                        language_code: 'en',
                        is_premium: true,
                        allows_write_to_pm: true,
                    }),
                ],
                ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
                ['auth_date', '1716922846'],
                ['start_param', 'debug'],
                ['chat_type', 'sender'],
                ['chat_instance', '8428209589180549439'],
                ['signature', '6fbdaab833d39f54518bd5c3eb3f511d035e68cb'],
            ]).toString();

            lp = {
                themeParams: {
                    accentTextColor: '#6ab2f2',
                    bgColor: '#17212b',
                    buttonColor: '#5288c1',
                    buttonTextColor: '#ffffff',
                    destructiveTextColor: '#ec3942',
                    headerBgColor: '#17212b',
                    hintColor: '#708499',
                    linkColor: '#6ab3f3',
                    secondaryBgColor: '#232e3c',
                    sectionBgColor: '#17212b',
                    sectionHeaderTextColor: '#6ab3f3',
                    subtitleTextColor: '#708499',
                    textColor: '#000000',
                },
                initData: parseInitData(initDataRaw),
                initDataRaw,
                version: '8',
                platform: 'tdesktop',
            };
        }

        sessionStorage.setItem('env-mocked', '1');
        mockTelegramEnv(lp);
        console.warn(
            '⚠️ As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.',
        );
    });
}
