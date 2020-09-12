import React from 'react';
import { Link } from '@reach/router';

import { Flex, Box, Heading } from 'rebass';

import { Product } from 'helper/schema/product';
import { FixedData as FixedDataPages } from 'pages';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';
import useAllProductImages from 'helper/use-all-product-images';

import './homepage.scss';

type Props = {
    products: Product[];
};

const HomepageProducts: React.FC<Props> = ({ products }) => {
    const { extractImgs, s } = useAllProductImages();

    return (
        <Box variant="outerWrapper">
            <Heading
                textAlign="center"
                as="h2"
                variant="h2"
                mb={[5, 5, 6, 7]}
                fontWeight="body"
            >
                NEW ARRIVALS
            </Heading>
            <Flex
                flexDirection={['column', 'column', 'row']}
                alignItems={['flex-start']}
                flexWrap="wrap"
                justifyContent={['space-evenly']}
                px={[6]}
            >
                {products.map(product => {
                    const props: ProductCardProps = {
                        product,
                        imgs: extractImgs(product, true, true),
                    } as ProductCardProps;
                    return (
                        <Link
                            key={product.pid}
                            to={product.slug}
                            className="product-link"
                        >
                            <ProductCard
                                {...props}
                                css={``}
                                mb={[7]}
                                // mx={[1, 1, 5]}
                                width="100%"
                            />
                        </Link>
                    );
                })}
            </Flex>
        </Box>
    );
};

export { HomepageProducts };