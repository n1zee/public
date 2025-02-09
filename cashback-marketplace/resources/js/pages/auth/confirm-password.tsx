import type { SyntheticEvent } from 'react';

import { useLaravelReactI18n } from 'laravel-react-i18n';

import { useForm } from '@inertiajs/react';

import { GuestLayout } from '@/layouts/guest-layout';
import { Button } from '@/ui/button';
import { TextInput } from '@/ui/input';
import { createSetInertiaInputDataHandler } from '@/utils/set-input-data';

interface FormData {
    password: string;
}

export default function ConfirmPassword() {
    const { t } = useLaravelReactI18n();

    const { data, setData, post, processing, errors, reset } = useForm<FormData>({
        password: '',
    });

    const setInputData = createSetInertiaInputDataHandler(setData);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        post('/confirm-password', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout title={t('confirm_password')} note={t('this_is_a_secure_area')}>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        isFocused
                        onChange={setInputData('password')}
                        label={t('password')}
                        errorMessage={errors.password}
                    />
                </div>

                <div className="flex items-center justify-end mt-4">
                    <Button className="ms-4" disabled={processing}>
                        {t('confirm')}
                    </Button>
                </div>
            </form>
        </GuestLayout>
    );
}
