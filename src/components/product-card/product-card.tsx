import React from 'react';
import Img, { FixedObject } from 'gatsby-image';

import { Box, BoxProps, Text } from 'rebass';

import { Product } from 'helper/schema/product';
import Tile from 'components/tile';

import './product-card.scss';

export type Props = BoxProps & {
    product: Product;
    imgs?: {
        sources: FixedObject | FixedObject[];
    }[];
};

const ProductCard: React.FC<Props> = ({ product, imgs, css, ...rest }) => {
    console.log(css);

    const { name, idrPrice, urls } = product;

    if (imgs) {
        return (
            <Box {...rest}>
                <Box bg="brown.0" p={[2]} width="fit-content" mb={[3]}>
                    <Box className="product-img">
                        <Img
                            fixed={imgs[0].sources}
                            alt={name}
                            className={`product-main${
                                imgs.length > 1 ? ' hide-on-hover' : ''
                            }`}
                        />
                        {imgs.length > 1 && (
                            <Img
                                fixed={imgs[1].sources}
                                alt={`${name}-second-view`}
                                className="show-on-hover"
                            />
                        )}
                    </Box>
                </Box>

                <Text variant="productName">{name}</Text>
                <Text variant="productPrice">IDR {idrPrice}</Text>
            </Box>
        );
    } else {
        return (
            <Box {...rest}>
                <Tile url={urls[0]} imgAlt={name} />
                <Text>{name}</Text>
                <Text>IDR {idrPrice}</Text>
            </Box>
        );
    }
};

export { ProductCard };
