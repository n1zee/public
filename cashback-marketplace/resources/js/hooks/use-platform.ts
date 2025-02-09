import { useMediaMatch } from 'rooks';

export const usePlatform = () => {
    const isDesktop = useMediaMatch('(min-width: 992px)');

    return isDesktop ? 'desktop' : 'mobile';
};
