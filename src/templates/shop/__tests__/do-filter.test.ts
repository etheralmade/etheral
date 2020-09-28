import { mockProduct1 } from 'helper/const';
import {
    doFilterCategories,
    doFilterCollections,
    doSorting,
    doFilter,
} from '../do-filter';
import { SortPrice } from '../filter';
import { renderName } from 'helper/render-name';

const a = {
    ...mockProduct1,
    category: 'A',
    collection: 'X',
    prices: { ...mockProduct1.prices, idrPrice: 2 },
};
const b = {
    ...mockProduct1,
    category: 'B',
    collection: 'Y',
    prices: { ...mockProduct1.prices, idrPrice: 5 },
};
const c = {
    ...mockProduct1,
    category: 'C',
    collection: 'Z',

    prices: { ...mockProduct1.prices, idrPrice: 1 },
};
const a2 = {
    ...mockProduct1,
    category: 'A',
    collection: 'Y',
    prices: { ...mockProduct1.prices, idrPrice: 3 },
};

const allProducts = [a, b, c, a2];

describe('Filter algorithms based on category on shop component', () => {
    it('Should filter products based on category correctly', () => {
        const filtered = doFilterCategories(['A'], allProducts);
        expect(filtered.every(product => renderName(product.category) === 'A'));
    });

    it('Should filter products based on several categories correctly', () => {
        const filtered = doFilterCategories(['A', 'C'], allProducts);
        expect(
            filtered.every(
                product =>
                    renderName(product.category) === 'A' ||
                    renderName(product.category) === 'C'
            )
        );
    });

    it('should return all products if no filter is provided (category filter)', () => {
        const filtered = doFilterCategories([], allProducts);

        expect(filtered.length).toBe(allProducts.length);
    });
});

describe('Filter algorithms based on collection on shop component', () => {
    it('Should filter products based on collection correctly', () => {
        const filtered = doFilterCollections(['X'], allProducts);
        expect(
            filtered.every(product => renderName(product.collection) === 'X')
        );
    });

    it('Should filter products based on several collections correctly', () => {
        const filtered = doFilterCollections(['X', 'Z'], allProducts);
        expect(
            filtered.every(
                product =>
                    renderName(product.category) === 'X' ||
                    renderName(product.category) === 'Z'
            )
        );
    });

    it('should return all products if no filter is provided (collection filter)', () => {
        const filtered = doFilterCollections([], allProducts);

        expect(filtered.length).toBe(allProducts.length);
    });
});

describe('Sorting algorithm on shop component (based on idrPrice)', () => {
    it('Should sort products based on its IDR Price (descending)', () => {
        const sorted = doSorting(SortPrice.HIGH_TO_LOW, allProducts);
        expect(
            sorted.every((product, i) => {
                if (i === sorted.length - 1) {
                    return true;
                } else {
                    return (
                        product.prices.idrPrice > sorted[i + 1].prices.idrPrice
                    );
                }
            })
        );
    });

    it('Should sort products based on its IDR Price (ascending)', () => {
        const sorted = doSorting(SortPrice.LOW_TO_HIGH, allProducts);
        expect(
            sorted.every((product, i) => {
                if (i === sorted.length - 1) {
                    return true;
                } else {
                    return (
                        product.prices.idrPrice < sorted[i + 1].prices.idrPrice
                    );
                }
            })
        );
    });
});

describe('Main filter function on shop component', () => {
    it('should filter and sort the prodcuts correctly', () => {
        const sortedAndFiltered = doFilter({
            sort: SortPrice.HIGH_TO_LOW,
            collections: ['X'],
            categories: ['A', 'C'],
            allProducts,
        });

        expect(
            sortedAndFiltered.every((product, i) => {
                if (renderName(product.collection) !== 'X') {
                    return false;
                }

                if (
                    renderName(product.category) !== 'A' &&
                    renderName(product.category) !== 'C'
                ) {
                    return false;
                }

                if (
                    i !== sortedAndFiltered.length - 1 &&
                    product.prices.idrPrice <
                        sortedAndFiltered[i + 1].prices.idrPrice
                ) {
                    return false;
                }

                return true;
            })
        ).toBe(true);
    });
});
