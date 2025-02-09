import { getLocalisedValue } from '#core/helpers';

import { Category, GroupedCategoriesList } from '#types/catalog';

export function groupCategories(categories: Category[]): GroupedCategoriesList[] {
    const topLevelCategories = categories.filter((category) => category.pid === null);

    return topLevelCategories.map((parentCategory) => ({
        id: parentCategory.id,
        title: getLocalisedValue(parentCategory.title),
        items: categories
            .filter((subcategory) => subcategory.pid === parentCategory.id)
            .map((subcategory) => ({
                id: subcategory.id,
                title: getLocalisedValue(subcategory.title),
            })),
    }));
}

export function getSubcategories(categories: Category[], id: number): Category[] {
    return categories.filter((category) => category.pid === id);
}
