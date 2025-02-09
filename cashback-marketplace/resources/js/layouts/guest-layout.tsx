import type { ReactNode } from 'react';

import { Head, Link } from '@inertiajs/react';

import { LanguagePicker } from '@/components/language-picker';
import { Logo } from '@/ui/logo';

interface Props {
    title: string;
    note?: string;
    status?: string;
    children: ReactNode;
}

export const GuestLayout = ({ title, note, status, children }: Props) => {
    return (
        <div className="max-w-[992px] mx-auto p-4">
            <Head title={title} />
            <LanguagePicker />
            {note && <div className="mb-4 text-sm p-4 text-gray-500 text-center">{note}</div>}
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="min-h-screen flex flex-col items-center mt-20">
                <div>
                    <Link href="/">
                        <Logo className="h-10 fill-current" />
                    </Link>
                </div>

                <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-dark-gray overflow-hidden sm:rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    );
};
