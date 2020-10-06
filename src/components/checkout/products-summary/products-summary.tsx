import React from 'react';
import { flatten } from 'lodash';

import { Box, Heading, Text } from 'rebass';

import Product from './product';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Currencies } from 'state/reducers/currency-reducer';

type Props = ICartState & {
    currency: Currencies;
};

/**
 * Component to display the summary of current order's products.
 * User should be able to check the products they ordered.
 */
const ProductsSummary: React.FC<Props> = ({ cart, currency }) => {
    // taken from cart-items.tsx
    const cartMapped = cart.map(item => {
        const notes = item.note.map(o => ({ ...item, ...o, note: undefined }));

        return notes;
    });

    /**
     * sorting the mapped data => avoid unconsistent order of items on cart component
     */
    const data = flatten(cartMapped);

    const gridTemplate = ['1fr', '1fr', 'repeat(5, minmax(120px, 1fr))'];

    const gridHeadingSyling = {
        display: ['none', 'none', 'block'],
        gridRow: '1/2',
        mb: 5,
    };

    return (
        <Box px={[4, 4, 9, 10, 11]}>
            <Heading as="h2" variant="h3" mb={[5]}>
                ORDER SUMMARY
            </Heading>

            {/* product wrapper => box on mobilem table on desktop */}
            <Box
                className="product-wrapper"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: gridTemplate,
                    gridGap: 2,
                    '& .checkout-product': {
                        borderTopWidth: [0, 0, 1],
                    },
                }}
            >
                <Box width="auto" />

                {/* render grid heading */}
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '2 / 3' }}
                >
                    PRODUCT NAME
                </Text>
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '3 / 4' }}
                >
                    DETAILS
                </Text>
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '4 / 5' }}
                >
                    QUANTITY
                </Text>
                <Text
                    variant="h3"
                    sx={{ ...gridHeadingSyling, gridColumn: '5 / 6' }}
                >
                    PRICE
                </Text>

                {/* render products */}
                {data.map((item, i) => (
                    <Product
                        item={item}
                        currency={currency}
                        first={i === 0}
                        gridTemplate={gridTemplate}
                        key={`checkout-${item.product.pid}-${JSON.stringify(
                            item.details
                        )}`}
                    />
                ))}
            </Box>
        </Box>
    );
};

export { ProductsSummary };
