import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import { Flex } from 'rebass';

import { Product } from 'helper/schema';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';
import useAllProductImages from 'helper/use-all-product-images';
import useAllProducts from 'helper/use-all-products';
import Pagination from 'components/pagination';
import Breadcrumbs from 'components/breadcrumbs';

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

const initialPagination = {
    productPerPage: 8,
    currIndex: 0,
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
    // add filter.
    const { extractImgs } = useAllProductImages();
    const allProducts = useAllProducts();

    const debug = true;

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
        ].sort((a, b) => a.name.localeCompare(b.name));
        if (!withFilters) {
            setStore(debug ? multipliedProducts : allProducts);
        }
    }, [setStore, withFilters, allProducts, debug]);

    useEffect(() => {
        paginate({ ...pagination }, store);
        calculateNumOfPages({ ...pagination }, store);
    }, [store, pagination]);

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

    const handleClickPage = (pageNum: number) => {
        setPagination(prev => ({ ...prev, currIndex: pageNum }));
    };

    return (
        <Flex
            className="top"
            flexDirection="column"
            alignItems="center"
            pb={[6, 6, 4]}
        >
            {/* shop banner image. */}
            <Flex width="100%" px={[5]}>
                {/* breadcrumbs */}
                <Breadcrumbs
                    location={'shop'}
                    append={true}
                    appendText={'SHOP ALL'}
                />
                {/* filter component */}
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
                        justify-content: space-evenly;
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
            <Pagination
                numOfPages={numOfPages}
                handleClickPage={handleClickPage}
                current={pagination.currIndex}
            />
        </Flex>
    );
};

export { Shop };
