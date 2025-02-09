import { useLaunchParams } from '@telegram-apps/sdk-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { parseStartupParams } from '#core/helpers';

export const useDeeplink = () => {
    const lp = useLaunchParams();
    const router = useRouter();

    const params = parseStartupParams<{ pid?: string; cid?: string }>(lp.startParam);

    useEffect(() => {
        if (params.pid) {
            router.push(`/product/${params.pid}`);
        }

        if (params.cid) {
            router.push(`/category/${params.cid}`);
        }
    }, [params.cid, params.pid, router]);
};
