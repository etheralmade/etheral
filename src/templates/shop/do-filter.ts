import { flatten, intersection } from 'lodash';

import { SortPrice } from './filter';
import { Product } from 'helper/schema';
import { renderName } from 'helper/render-name';

type Args = {
    sort: SortPrice;
    categories: string[];
    collections: string[];
    allProducts: Product[];
};

// optional => connect with redux store?
const doSorting = (sort: SortPrice, allProducts: Product[]): Product[] => {
    // empty filter
    if (sort === SortPrice.NONE) {
        return allProducts;
    }

    // do sorting based on its idr price => IDR Price is benchmark?
    if (sort === SortPrice.HIGH_TO_LOW) {
        return [...allProducts].sort(
            (a, b) => a.prices.idrPrice - b.prices.idrPrice
        );
    } else {
        return [...allProducts].sort(
            (a, b) => b.prices.idrPrice - a.prices.idrPrice
        );
    }
};

const doFilterCategories = (
    categories: string[],
    allProducts: Product[]
): Product[] => {
    // empty filter => no filter is added.
    if (categories.length === 0) {
        return allProducts;
    }

    // flatten the mapped array
    return flatten(
        // map all filters added
        categories.map(ctg =>
            // filter all products based on category by comparing its category name with the categories filter being mapped.
            allProducts.filter(product => renderName(product.category) === ctg)
        )
    );
};

const doFilterCollections = (
    collections: string[],
    allProducts: Product[]
): Product[] => {
    if (collections.length === 0) {
        return allProducts;
    }

    // exact same algo as category filter
    return flatten(
        collections.map(clc =>
            allProducts.filter(
                product => renderName(product.collection) === clc
            )
        )
    );
};

const doFilter = ({
    sort,
    categories,
    collections,
    allProducts,
}: Args): Product[] => {
    // filter by added category filter
    const categorized = doFilterCategories(categories, allProducts);
    // filter by collection
    const collectionized = doFilterCollections(collections, allProducts);
    // combine arrays. => intersection.
    const intersected = intersection(categorized, collectionized);
    // do sorting

    return doSorting(sort, intersected);
};

export { doFilterCategories, doFilterCollections, doSorting, doFilter };
