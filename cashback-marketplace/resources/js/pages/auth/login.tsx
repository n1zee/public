import type { SyntheticEvent } from 'react';

import { LoginButton } from '@telegram-auth/react';
import { useLaravelReactI18n } from 'laravel-react-i18n';
import { useRoute } from 'ziggy-js';

import { Link, useForm } from '@inertiajs/react';

import { GuestLayout } from '@/layouts/guest-layout';
import { Button } from '@/ui/button';
import { Checkbox } from '@/ui/checkbox';
import { TextInput } from '@/ui/input';
import { createSetInertiaInputDataHandler } from '@/utils/set-input-data';

interface FormData {
    email: string;
    password: string;
    remember: boolean;
}

interface Props {
    status: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: Props) {
    const { t } = useLaravelReactI18n();
    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    const setInputData = createSetInertiaInputDataHandler(setData);

    const telegramBotName = import.meta.env.VITE_TELEGRAM_BOT_NAME;
    const telegramUrl = import.meta.env.VITE_TELEGRAM_REDIRECT_URI;

    return (
        <GuestLayout title={t('login')} status={status}>
            <form onSubmit={submit}>
                <div>
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused
                        label={t('email')}
                        onChange={setInputData('email')}
                        errorMessage={errors.email}
                    />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={setInputData('password')}
                        label={t('password')}
                        errorMessage={errors.password}
                        containerClassName="mt-4"
                    />

                    <div className="block mt-4">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={setInputData('remember')}
                            containerClassName="flex items-center"
                            label={t('remember_me')}
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        {canResetPassword && (
                            <Link
                                href="/forgot-password"
                                className="underline text-sm text-gray-500 hover:text-gray-700 rounded-md focus:outline-none"
                            >
                                {t('forgot_password')}
                            </Link>
                        )}

                        <Button type="submit" className="ms-4" disabled={processing}>
                            {t('login')}
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col space-y-2 items-center justify-center mt-8">
                    <a href={route('auth.redirect', { provider: 'google' })}>
                        <button
                            type="button"
                            className="px-4 py-2 cursor-pointer border flex gap-4 border-gray-700 rounded-lg text-white w-[13.74rem]"
                        >
                            <img
                                className="w-6 h-6"
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                loading="lazy"
                                alt="google logo"
                            />
                            <span>Log in with Google</span>
                        </button>
                    </a>

                    <LoginButton
                        botUsername={telegramBotName}
                        authCallbackUrl={telegramUrl}
                        buttonSize="large"
                        cornerRadius={6}
                        showAvatar={false}
                        lang="en"
                    />
                </div>
            </form>
        </GuestLayout>
    );
}
