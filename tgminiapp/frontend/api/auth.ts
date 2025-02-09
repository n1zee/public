import Cookie from 'js-cookie';

import { createGetRequest, createPostRequest } from '#api/request';

import { ClaimInfo } from '#types/claim';
import { User } from '#types/user';

const init = () =>
    createPostRequest<{ jwt: string }>({
        path: 'auth',
        body: {
            uri: window.location.href,
        },
    });

const me = () =>
    createGetRequest<User>({
        path: 'auth',
    });

const claimInfo = () =>
    createPostRequest<ClaimInfo>({
        path: 'auth/claim',
    });

export const checkAuthOrInit = async (langCode: string) => {
    try {
        await me();
    } catch (err: any) {
        if (err.status === 401) {
            Cookie.set('lang', langCode);
            Cookie.remove('auth');

            const res = await init();

            Cookie.set('auth', res.jwt);
        } else {
            console.error('Unexpected error:', err);
        }
    }
};

export const authApi = {
    init,
    me,
    claimInfo,
};
