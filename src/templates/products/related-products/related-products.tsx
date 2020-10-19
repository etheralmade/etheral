import React from 'react';

import { Link } from '@reach/router';

import { Flex } from 'rebass';

import { Product } from 'helper/schema';
import useAllProductImages from 'helper/use-all-product-images';
import ProductCard, {
    Props as ProductCardProps,
} from 'components/product-card';

type Props = {
    products: Product[];
};

const RelatedProducts: React.FC<Props> = ({ products }) => {
    const { extractImgs } = useAllProductImages();

    // code snippet basically taken from homepage-products.tsx
    return (
        <Flex
            flexDirection="row"
            // alignItems='space'
            flexWrap="wrap"
            px={[0, 0, 8]}
            css={`
                justify-content: space-between;

                /* edge space-evenly progressive enhancement. */
                @supports not (-ms-ime-align: auto) {
                    justify-content: space-evenly;
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
                        <ProductCard {...props} css={``} mb={[7]} width="90%" />
                    </Link>
                );
            })}
        </Flex>
    );
};

export { RelatedProducts };
