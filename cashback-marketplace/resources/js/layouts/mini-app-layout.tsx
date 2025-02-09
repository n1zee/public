import type { ReactNode } from 'react';

import { Head, Link } from '@inertiajs/react';

import { Logo } from '@/ui/logo';

interface Props {
    title: string;
    children: ReactNode;
}

export const MiniAppLayout = ({ title, children }: Props) => {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex flex-col justify-center items-center pt-6 sm:pt-0">
                <div>
                    <Link href="/">
                        <Logo className="h-10 fill-current" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden">{children}</div>
            </div>
        </>
    );
};
