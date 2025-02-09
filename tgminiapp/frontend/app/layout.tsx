import { clsx } from 'clsx';
import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';

import { Root } from '#components/root';

import '@telegram-apps/telegram-ui/dist/styles.css';
import './globals.css';

const sfPro = localFont({
    src: [
        {
            path: '../fonts/SFProDisplay-Regular.woff2',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../fonts/SFProDisplay-Medium.woff2',
            weight: '500',
            style: 'normal',
        },
        {
            path: '../fonts/SFProDisplay-Semibold.woff2',
            weight: '600',
            style: 'normal',
        },
        {
            path: '../fonts/SFProDisplay-Bold.woff2',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-sf-pro',
});

export const metadata: Metadata = {
    title: '',
    description: '',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" data-theme="light">
            <body className={clsx(sfPro.className, 'antialiased mobile-body')}>
                <div className="mobile-wrap">
                    <div className="mobile-content">
                        <Root>{children}</Root>
                    </div>
                </div>
            </body>
        </html>
    );
}
