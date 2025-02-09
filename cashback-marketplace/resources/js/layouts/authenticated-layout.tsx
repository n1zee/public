import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { clsx } from 'clsx';
import { motion } from 'framer-motion';

import { Head } from '@inertiajs/react';

import { BottomMenu } from '@/components/bottom-menu';
import { Footer } from '@/components/footer';
import { LoadingPlaceholder } from '@/components/loading-placeholder';
import { DesktopMenu } from '@/components/main-menu/desktop-menu';
import { MobileMenu } from '@/components/main-menu/mobile-menu';
import { Notification } from '@/components/notification';
import { Onboarding } from '@/components/onboarding';
import type { User } from '@/types/user';

interface Props {
    user: User;
    children: ReactNode;
    title: string;
    header?: string;
    isHeaderCentered?: boolean;
}

export const AuthenticatedLayout = ({
    user,
    header,
    title,
    children,
    isHeaderCentered = false,
}: Props) => {
    useEffect(() => {
        return () => {
            localStorage.removeItem('loaded');
        };
    }, []);

    return (
        <>
            <LoadingPlaceholder />
            <Onboarding />
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Notification />
                <Head title={title} />

                <div className="min-h-screen bg-black">
                    <nav className="bg-black border-b border-light-black">
                        <DesktopMenu user={user} />
                        <MobileMenu user={user} />
                    </nav>

                    {header && (
                        <header className="bg-black">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                                <h2
                                    className={clsx([
                                        'font-semibold text-xl text-white leading-tight',
                                        isHeaderCentered && 'text-center',
                                    ])}
                                >
                                    {header}
                                </h2>
                            </div>
                        </header>
                    )}

                    <main>{children}</main>
                </div>
            </motion.div>
            <Footer />

            <BottomMenu />
        </>
    );
};
