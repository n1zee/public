import { createGetRequest, createPostRequest } from '#api/request';

import { Category, CategoryShort, Product, ProductShort } from '#types/catalog';
import { BaseQueryParams, Currency, Filters, Pagination, Period, Sort } from '#types/core';

type GetCardsListParams = {
    currency?: Currency[];
    category_id?: number[];
    user_id?: number[];
    period?: Period;
    order?: Sort;
} & BaseQueryParams;

type GetCardListResponse = { list: ProductShort[]; filters: Filters; pagination: Pagination };

type FavoriteAction = {
    card_id: number;
    action: 'ADD' | 'REMOVE';
};

const getCategoriesList = ({ search, limit, offset }: BaseQueryParams) => {
    return createGetRequest<{ list: Category[] }>({
        path: `catalog/categories`,
        queryParams: { search, limit, offset },
    });
};

const getCardsList = ({
    limit,
    offset,
    category_id,
    period,
    order,
    user_id,
    search,
    currency,
}: GetCardsListParams) => {
    return createGetRequest<GetCardListResponse>({
        path: `catalog/cards`,
        queryParams: {
            search,
            limit,
            offset,
            period,
            order,
            user_id,
            currency,
            category_id,
        },
    });
};

const getCard = ({ id }: { id: number }) =>
    createGetRequest<Product>({
        path: `catalog/cards/${id}`,
    });

const favorite = ({ card_id, action }: FavoriteAction) =>
    createPostRequest<FavoriteAction>({
        path: `catalog/favorites`,
        body: {
            card_id,
            action,
        },
    });

const searchCategories = ({ search, limit, offset }: BaseQueryParams) => {
    return createGetRequest<{ list: CategoryShort[]; filters: Filters; pagination: Pagination }>({
        path: `catalog/search/categories`,
        queryParams: { search, limit, offset },
    });
};

const searchCards = ({ search, limit, offset }: BaseQueryParams) => {
    return createGetRequest<GetCardListResponse>({
        path: `catalog/search/cards`,
        queryParams: { search, limit, offset },
    });
};

export const catalogApi = {
    getCategoriesList,
    getCardsList,
    getCard,
    favorite,
    searchCards,
    searchCategories,
};
