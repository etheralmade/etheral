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
                fontWeight="bold"
            >
                {displayText.toUpperCase()}
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
                            key={`homepage-${product.pid}`}
                            to={product.slug}
                            className="product-link"
                        >
                            <ProductCard
                                {...props}
                                css={``}
                                mb={[7]}
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
