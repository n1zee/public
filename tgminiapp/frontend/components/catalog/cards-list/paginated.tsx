import type {
    FetchNextPageOptions,
    InfiniteData,
    InfiniteQueryObserverResult,
} from '@tanstack/react-query';
import { useEffect, useRef } from 'react';

import { ProductShort } from '#types/catalog';
import { Filters, Pagination } from '#types/core';

import { CardsList } from './common';

interface Props {
    products?: InfiniteData<
        { list: ProductShort[]; filters: Filters; pagination: Pagination },
        unknown
    >;
    className?: string;
    fetchNextPage: (
        options?: FetchNextPageOptions | undefined,
    ) => Promise<
        InfiniteQueryObserverResult<
            InfiniteData<
                { list: ProductShort[]; filters: Filters; pagination: Pagination },
                unknown
            >,
            Error
        >
    >;
    isLoading: boolean;
    hasNextPage: boolean;
}

export const PaginatedCardsList = ({
    products,
    fetchNextPage,
    hasNextPage,
    isLoading,
    className,
}: Props) => {
    const loadMoreRef = useRef(null);

    const allProducts = products?.pages.flatMap((page) => page.list) || [];

    useEffect(() => {
        if (!hasNextPage || !loadMoreRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    void fetchNextPage();
                }
            },
            {
                root: null,
                rootMargin: '200px',
                threshold: 0,
            },
        );

        observer.observe(loadMoreRef.current);

        return () => observer.disconnect();
    }, [hasNextPage, fetchNextPage]);

    return (
        <div className={className}>
            <CardsList products={allProducts} isLoading={isLoading} />
            <div ref={loadMoreRef} className="mt-5 h-10"></div>
        </div>
    );
};
