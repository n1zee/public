'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { catalogApi } from '#api/catalog';

import { getSubcategories } from '#core/categories-utils';

import { usePaginatedCardList } from '#hooks/usePaginatedCardList';

import { PaginatedCardsList } from '#components/catalog/cards-list/paginated';
import { CatalogSearch } from '#components/catalog/catalog-search';
import { CategoriesList } from '#components/catalog/categories-list/common';
import { PageLayout } from '#components/layout/page';

export default function CatalogPage() {
    const params = useParams<{ categoryId: string }>();
    const categoryId = Number(params.categoryId);

    const { data: subCategories, isPending: subCategoriesLoading } = useQuery({
        queryKey: ['getCategoriesList', categoryId],
        queryFn: () => catalogApi.getCategoriesList({}),
        select: (data) => getSubcategories(data.list, categoryId),
    });

    const { products, fetchNextPage, hasNextPage, productsIsPending } = usePaginatedCardList({
        categoryId: [categoryId],
    });

    const isLoading = subCategoriesLoading || productsIsPending;

    return (
        <PageLayout>
            <CatalogSearch isLoading={isLoading} />
            <CategoriesList data={subCategories} isLoading={isLoading} />
            <PaginatedCardsList
                className="mt-4"
                products={products}
                fetchNextPage={fetchNextPage}
                hasNextPage={hasNextPage}
                isLoading={productsIsPending}
            />
        </PageLayout>
    );
}
