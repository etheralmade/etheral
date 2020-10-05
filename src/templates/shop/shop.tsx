import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';
import { fromPairs } from 'lodash';

import { Flex } from 'rebass';

import { Product } from 'helper/schema';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';
import useAllProductImages from 'helper/use-all-product-images';
import useAllProducts from 'helper/use-all-products';
import Pagination from 'components/pagination';
import Breadcrumbs from 'components/breadcrumbs';
import Filter, { SortPrice } from './filter';
import { doFilter } from './do-filter';
import { renderName } from 'helper/render-name';

import './styles.scss'; // styling on links component => cleaner component file.

type Props = {};

/**
 * productPerPage: num of products to be rendered per page.
 * currIndex: current view page num.
 */
type PaginationState = {
    productPerPage: number;
    currIndex: number;
};

export type FilterState = {
    sort: SortPrice;
    collections: string[];
    categories: string[];
};

const initialFilter = {
    sort: SortPrice.NONE,
    collections: [],
    categories: [],
};

const initialPagination = {
    productPerPage: 8,
    currIndex: 0,
};

export type SetFilterArgs = {
    clearFilter: boolean;
    sort?: SortPrice;
    categories?: string[];
    collections?: string[];
};

const Shop: React.FC<Props> = () => {
    // store: all products to be displayed (not filtered by pagination.)
    const [store, setStore] = useState<Product[]>([]);
    // add product per page
    const [pagination, setPagination] = useState<PaginationState>(
        initialPagination
    );
    const [numOfPages, setNumOfPages] = useState(0);

    // to display products (filtered by pagination)
    const [display, setDisplay] = useState<Product[]>([]);
    // filter state.
    const [withFilters, setWithFilters] = useState(false);
    const [filters, setFilters] = useState<FilterState>(initialFilter);
    // add filter.
    const [withUrlParams, setWithUrlParams] = useState(false);
    const [urlParams, setUrlParams] = useState('');

    const { extractImgs } = useAllProductImages();
    const allProducts = useAllProducts();

    // extract filter(s) from page query.
    useEffect(() => {
        if (window) {
            const { search } = location;

            if (search) {
                setWithUrlParams(true);
                setUrlParams(search);
            }
        }
    }, []);

    useEffect(() => {
        const { sort, categories, collections } = filters;

        // map to url?

        setStore(doFilter({ sort, categories, collections, allProducts }));
    }, [filters]);

    // stores variable IF url query is provided.
    useEffect(() => {
        if (allProducts.length > 0 && withUrlParams) {
            extractQuery(urlParams);
            setWithUrlParams(false);
        }
    }, [allProducts]);

    useEffect(() => {
        paginate({ ...pagination }, store);
        calculateNumOfPages({ ...pagination }, store);
    }, [store, pagination]);

    const debug = true;

    // debug mock products
    useEffect(() => {
        const multipliedProducts = [
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
            ...allProducts,
        ].sort((a, b) => a.name.localeCompare(b.name));
        if (!withFilters) {
            setStore(debug ? multipliedProducts : allProducts);
        }
    }, [setStore, withFilters, allProducts, debug]);

    const paginate = (
        { productPerPage, currIndex }: PaginationState,
        inStore: Product[]
    ) => {
        const maxIndex = inStore.length;

        const firstIndex = currIndex * productPerPage;
        const lastIndex = firstIndex + productPerPage;

        // check if first and/or last index is larger than max and adjust accordingly
        const temp = inStore.slice(
            firstIndex >= maxIndex ? maxIndex : firstIndex,
            lastIndex >= maxIndex ? maxIndex : lastIndex
        );

        setDisplay(temp);
    };

    const clearFilters = () => {
        setWithFilters(false);
        setFilters(initialFilter);
    };

    const calculateNumOfPages = (
        { productPerPage }: PaginationState,
        inStore: Product[]
    ) => {
        const initialNumOfPages = inStore.length / productPerPage;
        setNumOfPages(
            inStore.length % productPerPage === 0 // check for any rest from the division.
                ? initialNumOfPages
                : Math.floor(initialNumOfPages + 1) // add an extra page if any rest is there.
        );
    };

    const extractQuery = async (search: string) => {
        // ?category=ring+bracelet&collection=collection%201

        // extract query(ies) => space: %20, multiple filters: +
        const extracted = await search
            .substr(1)
            .split('&') // ['category=ring+bracelet', 'collection=collection%201']
            .map(query => query.split('=')) // [['category','ring+bracelet'], ['collection','collection%201']]
            .map(query => [
                query[0],
                query[1]
                    .split('+') // [['category',['ring', 'bracelet']], ['collection',['collection%201']]]
                    .map(
                        param => renderName(param.split('%20').join(' ')) // [['category',['RING', 'BRACELET']], ['collection',['COLLECTION_1']]]
                    ),
            ]);

        if (await extracted) {
            const query = fromPairs(extracted);

            setFilters({
                sort: SortPrice.NONE,
                categories: query.categories || [],
                collections: query.collections || [],
            });
        }
    };

    const handleClickPage = (pageNum: number) => {
        setPagination(prev => ({ ...prev, currIndex: pageNum }));
    };

    const goToFirst = () => {
        setPagination(prev => ({ ...prev, currIndex: 0 }));
    };

    const goToLast = () => {
        setPagination(prev => ({ ...prev, currIndex: numOfPages - 1 }));
    };

    return (
        <Flex
            className="content"
            flexDirection="column"
            alignItems="center"
            pb={[6, 6, 4]}
        >
            {/* shop banner image. */}
            <Flex
                width="100%"
                px={[5, 5, 8]}
                justifyContent="space-between"
                sx={{ position: 'relative' }}
            >
                {/* breadcrumbs */}
                <Breadcrumbs
                    location={'shop'}
                    append={true}
                    appendText={'SHOP ALL'}
                />
                {/* filter component */}
                <Filter
                    filters={filters}
                    setFilters={setFilters}
                    clearFilters={clearFilters}
                />
            </Flex>
            {/* render products. */}
            <Flex
                className="product-container"
                width="100%"
                alignItems="flex-start"
                flexWrap="wrap"
                px={[5]}
                pb={[5, 5, 6]}
                css={`
                    justify-content: space-between;

                    /* edge space-evenly progressive enhancement. */
                    @supports not (-ms-ime-align: auto) {
                        @media screen and (min-width: 48em) {
                            justify-content: space-evenly;
                        }
                    }
                `}
            >
                {display.map((product, i) => {
                    const props: ProductCardProps = {
                        product,
                        imgs: extractImgs(product, true, true),
                    } as ProductCardProps;

                    // styling on Link component!
                    return (
                        <Link
                            key={`shop-${product.pid}-${i}`}
                            to={product.slug}
                            className="product"
                        >
                            <ProductCard my={[5]} {...props} css={``} />
                        </Link>
                    );
                })}
            </Flex>

            {/* pagination */}
            {numOfPages > 0 && (
                <Pagination
                    numOfPages={numOfPages}
                    handleClickPage={handleClickPage}
                    current={pagination.currIndex}
                    goToFirst={goToFirst}
                    goToLast={goToLast}
                />
            )}
        </Flex>
    );
};

export { Shop };
