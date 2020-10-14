import React from 'react';
import { Link } from '@reach/router';

import { Flex, Box, Heading } from 'rebass';

import { Product } from 'helper/schema/product';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';
import useAllProductImages from 'helper/use-all-product-images';

import './homepage.scss';

type Props = {
    products: Product[];
    displayText: string;
};

const HomepageProducts: React.FC<Props> = ({ products, displayText }) => {
    const { extractImgs } = useAllProductImages();

    return (
        <Box variant="outerWrapper">
            <Heading
                textAlign="center"
                as="h2"
                variant="h2"
                mb={[5, 5, 6, 7]}
                fontWeight="body"
            >
                {displayText.toUpperCase()}
            </Heading>
            <Flex
                flexDirection={['row']}
                alignItems={['flex-start']}
                flexWrap="wrap"
                px={[6, 6, 8]}
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
                {products.map(product => {
                    const props: ProductCardProps = {
                        product,
                        imgs: extractImgs(product, true, true),
                    } as ProductCardProps;
                    return (
                        <Link
                            key={`homepage-${product.pid}`}
                            to={product.slug}
                            className="product-link"
                        >
                            <ProductCard
                                {...props}
                                css={``}
                                mb={[7]}
                                width="100%"
                                hidePrices={true} // do not show prices on homepage
                            />
                        </Link>
                    );
                })}
            </Flex>
        </Box>
    );
};

export { HomepageProducts };
