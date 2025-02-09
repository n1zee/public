import { useEffect, useRef } from 'react';

export function useDidMountEffect(effect: () => any) {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current && typeof window !== 'undefined') {
            return effect();
        } else {
            didMount.current = true;
        }
    }, [effect]);
}
