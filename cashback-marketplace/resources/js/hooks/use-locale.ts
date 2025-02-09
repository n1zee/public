import { usePage } from '@inertiajs/react';

export const useLocale = () => {
    const { localeData } = usePage().props;

    return (localeData as any).languageCode;
};
