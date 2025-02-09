import type { SyntheticEvent } from 'react';

import { useLaravelReactI18n } from 'laravel-react-i18n';

import { useModalStore } from '@/components/modal/use-modal-store';
import { MotionBlock } from '@/components/motion-block';
import type { Brand } from '@/types/brand';
import type { Auth, User } from '@/types/user';

interface Props extends Auth {
    brand: Brand;
}

const generateBrandLink = (brand: Brand, user: User) => {
    const name = brand.name.split(' ')[0].toLowerCase();

    return `${brand.referral_link}?bta=45843&brand=${name}&afp1=${user?.id}&afp2=${brand.hash}&afp10=telergam`;
};

export const BrandItem = ({ brand, auth }: Props) => {
    const { t } = useLaravelReactI18n();

    const onModalOpen = useModalStore((state) => state.onOpen);

    const onClick = (e: SyntheticEvent) => {
        e.preventDefault();
        if (!auth.user) {
            onModalOpen('loginModal');
        }
    };

    const brandLink = generateBrandLink(brand, auth.user);

    return (
        <MotionBlock key={brand.id} className="sm:px-2 px-4 py-3.5 md:w-1/2 lg:w-1/3 w-full">
            <div className="h-full bg-dark-gray rounded-2xl p-3 overflow-hidden min-w-full">
                <a
                    onClick={onClick}
                    href={brandLink}
                    className="block rounded-10 border-gray-700 bg-dashed p-3 font-serif"
                >
                    <div className="flex items-center justify-between">
                        <div
                            className="h-10 w-[110px] bg-contain bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(/images/brands/${brand.logo})` }}
                        />

                        <div className="text-right text-sm text-text-gray">{brand.name}</div>
                    </div>

                    <div className="py-10 text-center">
                        <div className="text-orange text-42 font-medium leading-10">
                            {brand.cashback}%
                        </div>
                        <div className="text-pureWhite font-medium text-base">{t('cashback')}</div>
                    </div>

                    <div className="mb-2 flex">
                        <p className="text-green truncate font-medium leading-tight mx-auto">
                            {t(brand.bonus)}
                        </p>
                    </div>
                </a>
            </div>
        </MotionBlock>
    );
};
