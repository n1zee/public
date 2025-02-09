import Cookie from 'js-cookie';

import { LocalisedString } from '#types/core';

export const parseStartupParams = <T>(str?: string): T => {
    if (!str || !str.length) return {} as T;

    const parts = str.split('-');
    const params: { [key: string]: string } = {};

    for (const part of parts) {
        const [key, val] = part.split('_');
        if (key && val) {
            params[key] = val;
        }
    }

    return params as T;
};

export const generateShareLink = (link: string, text: string) =>
    `https://t.me/share/url?url=${link}&text=${text}`;

export const getLocalisedValue = (localisedStr: LocalisedString | null) => {
    if (!localisedStr) return '';

    const lang = Cookie.get('lang') ?? 'en';

    if (localisedStr[lang as 'en' | 'ru']) {
        return localisedStr[lang as 'en' | 'ru'];
    }

    return localisedStr.en;
};
