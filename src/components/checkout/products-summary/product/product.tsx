import React from 'react';
import { get } from 'lodash';

import { Box, Text } from 'rebass';
import Img, { FixedObject } from 'gatsby-image';
import { InlineIcon } from '@iconify/react';
import priceTag3Fill from '@iconify/icons-ri/price-tag-3-fill';

import { Currencies } from 'state/reducers/currency-reducer';
import { Product as ProductSchema } from 'helper/schema';
import useAllProductImages from 'helper/use-all-product-images';
import { getPrice } from 'helper/get-total-price';
import { theme } from 'styles';

type Props = {
    // item props => taken from cart-items.tsx
    item: {
        product: ProductSchema;
        amount: number;
        details: {
            size: string;
            gemSize?: string;
            gemType?: string;
        };
    };
    currency: Currencies;
    gridTemplate: string[];
    first: boolean;
};

/**
 * Component to display a product and its details. => data sourced from cart global state.
 */
const Product: React.FC<Props> = ({ item, currency, gridTemplate, first }) => {
    const { product, amount, details } = item;

    // fetch all product imgs..
    const { extractImgs } = useAllProductImages();

    // extract the image of THIS product
    const { xs, s }: any = extractImgs(product, false);

    const textStyling = {
        display: ['block', 'block', 'flex'],
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    };

    return (
        <Box
            className={first ? 'checkout-product' : ''}
            py={[4]}
            // mx={[4]}
            sx={{
                display: 'grid',
                gridColumn: '1/6',
                gridTemplateColumns: [
                    '10vw 140px 1fr 10vw',
                    '10vw 140px 1fr 10vw',
                    gridTemplate[2],
                ],
                gridTemplateRows: [
                    'auto 1fr auto auto',
                    'auto 1fr auto auto',
                    'auto',
                ],

                textAlign: ['left', 'left', 'center'],
                whiteSpace: 'nowrap',
                borderWidth: 0,
                borderColor: 'black.1',
                borderStyle: 'solid',
                borderBottomWidth: 1,
            }}
        >
            {/* image */}
            {s && (
                <Box
                    width={['fit-content']}
                    sx={{
                        gridColumn: ['2/3', '2/3', '1/2'],
                        gridRow: ['1/span 4', '1/span 4', '1/2'],
                    }}
                >
                    <Img
                        fixed={
                            get(
                                xs,
                                'img[0].childImageSharp.fixed'
                            ) as FixedObject
                        }
                    />
                </Box>
            )}

            {/* Product name */}
            <Text
                variant="h4"
                fontSize={[1, 1, 1]}
                sx={{
                    ...textStyling,
                    gridColumn: ['3/4', '3/4', '2/3'],
                    gridRow: '1/2',
                }}
            >
                {product.name}
            </Text>

            {/* details */}
            <Text
                variant="h4"
                fontSize={[1, 1, 1]}
                as="section"
                sx={{
                    ...textStyling,
                    gridColumn: '3/4',
                    gridRow: ['2/3', '2/3', '1/2'],
                }}
            >
                {/* render details of the product => conditional. */}
                Size: {details.size}
                {details.gemType && (
                    <>
                        <br />
                        Gem: {details.gemType}
                    </>
                )}
                {details.gemSize && (
                    <>
                        <br />
                        Gem diameter: {details.gemSize}
                    </>
                )}
            </Text>

            {/* quantity */}
            <Text
                variant="h4"
                fontSize={[1, 1, 1]}
                mt={[4]}
                sx={{
                    ...textStyling,
                    gridColumn: ['3/4', '3/4', '4/5'],
                    gridRow: ['3/4', '3/4', '1/2'],
                    transform: ['unset', 'unset', 'translateY(-12px)'],

                    '&::before': {
                        content: "'Quantity: '",
                        display: ['inline-block', 'inline-block', 'none'],
                    },
                }}
            >
                {amount}
            </Text>

            {/* price */}
            <Text
                variant="h4"
                fontSize={[1, 1, 1]}
                sx={{
                    ...textStyling,
                    gridColumn: ['3/4', '3/4', '5/6'],
                    gridRow: ['4/5', '4/5', '1/2'],
                    svg: { ml: [4] },
                }}
            >
                {currency} {getPrice(item, currency)}
                {product.prices.discountPercentage > 0 && (
                    <InlineIcon
                        icon={priceTag3Fill}
                        color={theme.colors.misc.discount}
                    />
                )}
            </Text>
        </Box>
    );
};

export { Product };
