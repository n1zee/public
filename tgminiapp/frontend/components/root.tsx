'use client';

import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { initData, useLaunchParams, useSignal } from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import Image from 'next/image';
import { type PropsWithChildren, useEffect } from 'react';

import { checkAuthOrInit } from '#api/auth';

import { init } from '#core/init';

import { useClientOnce } from '#hooks/useClientOnce';
import { useDeeplink } from '#hooks/useDeeplink';
import { useDidMount } from '#hooks/useDidMount';
import { useTelegramMock } from '#hooks/useTelegramMock';

import { ErrorBoundary } from './error-boundary';
import { ErrorPage } from './error-page';

import logo from '#assets/images/loader.png';

const queryClient = new QueryClient();

function RootInner({ children }: PropsWithChildren) {
    const isDev = process.env.NODE_ENV === 'development';

    useTelegramMock(isDev);

    const lp = useLaunchParams();
    const debug = isDev || lp.startParam === 'debug';
    const initDataUser = useSignal(initData.user);

    useClientOnce(() => {
        init(debug);
    });

    useEffect(() => {
        (async () => {
            if (initDataUser) {
                await checkAuthOrInit(initDataUser.languageCode ?? 'en');
            }
        })();
    }, [initDataUser]);

    useDeeplink();

    return (
        <QueryClientProvider client={queryClient}>
            <AppRoot
                appearance="dark"
                platform={['macos', 'ios'].includes(lp.platform) ? 'ios' : 'base'}
                className="h-full"
            >
                {children}
            </AppRoot>
        </QueryClientProvider>
    );
}

export function Root(props: PropsWithChildren) {
    const didMount = useDidMount();

    return didMount ? (
        <ErrorBoundary fallback={ErrorPage}>
            <RootInner {...props} />
        </ErrorBoundary>
    ) : (
        <div className="root__loading">
            <Image src={logo} alt="" />
        </div>
    );
}
