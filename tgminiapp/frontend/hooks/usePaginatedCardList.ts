import { useInfiniteQuery } from '@tanstack/react-query';

import { catalogApi } from '#api/catalog';

type Params = {
    limit?: number;
    categoryId?: number[];
};

export const usePaginatedCardList = ({ limit, categoryId }: Params) => {
    const {
        data: products,
        isPending: productsIsPending,
        fetchNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['getCardsList', categoryId],
        queryFn: ({ pageParam = 0 }) =>
            catalogApi.getCardsList({
                limit: limit || 10,
                offset: pageParam,
                category_id: categoryId,
                order: 'PUBLISHED_ASC',
            }),
        getNextPageParam: (lastPage) => {
            const { pagination } = lastPage;
            if (pagination.offset + pagination.limit < pagination.count) {
                return pagination.offset + pagination.limit;
            }
            return undefined;
        },
        initialPageParam: 0,
    });

    return {
        products,
        productsIsPending,
        fetchNextPage,
        hasNextPage,
    };
};
