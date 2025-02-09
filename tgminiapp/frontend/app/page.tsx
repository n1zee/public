'use client';

import { useQuery } from '@tanstack/react-query';

import { catalogApi } from '#api/catalog';

import { usePaginatedCardList } from '#hooks/usePaginatedCardList';

import { PaginatedCardsList } from '#components/catalog/cards-list/paginated';
import { CatalogSearch } from '#components/catalog/catalog-search';
import { CategoriesCarousel } from '#components/catalog/categories-list/carousel';
import { CategoryHeader } from '#components/catalog/category-header';
import { PageLayout } from '#components/layout/page';

export default function Home() {
    const { data: categoriesCarouselData, isPending: categoriesCarouselIsPending } = useQuery({
        queryKey: ['getCategoriesList'],
        queryFn: () => catalogApi.getCategoriesList({}),
        staleTime: Infinity,
        select: (data) => data.list.filter((c) => !c.pid),
    });

    const { products, fetchNextPage, hasNextPage, productsIsPending } = usePaginatedCardList({});

    return (
        <PageLayout>
            <CatalogSearch isLoading={categoriesCarouselIsPending || productsIsPending} />
            <CategoriesCarousel
                data={categoriesCarouselData}
                isLoading={categoriesCarouselIsPending}
            />
            <CategoryHeader
                text="Recommendations"
                isLoading={categoriesCarouselIsPending || productsIsPending}
            />
            <PaginatedCardsList
                products={products}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isLoading={productsIsPending}
            />
        </PageLayout>
    );
}
