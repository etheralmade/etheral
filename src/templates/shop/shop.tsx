import React, { useState, useEffect } from 'react';
import { Link } from '@reach/router';

import { Box, Flex } from 'rebass';

import { Product } from 'helper/schema';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';
import useAllProductImages from 'helper/use-all-product-images';
import useAllProducts from 'helper/use-all-products';

import './styles.scss'; // styling on links component => cleaner component file.

type Props = {};

const Shop: React.FC<Props> = () => {
    // to display products
    const [display, setDisplay] = useState<Product[]>([]);
    const [withFilters, setWithFilters] = useState(false);
    // add product per page
    // add filter.

    useEffect(() => {
        if (!withFilters) {
            setDisplay(allProducts);
        }
    }, [setDisplay, withFilters, allProducts]);

    const { extractImgs } = useAllProductImages();
    const allProducts = useAllProducts();

    return (
        <Box className="top">
            {/* shop banner image. */}
            {/* filter component */}
            {/* render products. */}
            <Flex
                className="product-container"
                width="100%"
                alignItems="flex-start"
                flexWrap="wrap"
                px={[5]}
                css={`
                    justify-content: space-between;

                    /* edge space-evenly progressive enhancement. */
                    @supports not (-ms-ime-align: auto) {
                        justify-content: space-evenly;
                    }
                `}
            >
                {display.map(product => {
                    const props: ProductCardProps = {
                        product,
                        imgs: extractImgs(product, true, true),
                    } as ProductCardProps;

                    // styling on Link component!
                    return (
                        <Link
                            key={`shop-${product.pid}`}
                            to={product.slug}
                            className="product"
                        >
                            <ProductCard my={[5]} {...props} css={``} />
                        </Link>
                    );
                })}
            </Flex>
        </Box>
    );
};

export { Shop };
