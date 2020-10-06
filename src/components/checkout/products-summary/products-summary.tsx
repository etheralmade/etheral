import React from 'react';

import { Box, Heading, Text } from 'rebass';

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
    const gridHeadingSyling = {
        display: ['none', 'none', 'block'],
        gridRow: '1/2',
    };

    return (
        <Box>
            <Heading as="h2" variant="h3">
                ORDER SUMMARY
            </Heading>

            {/* product wrapper => box on mobilem table on desktop */}
            <Box
                className="product-wrapper"
                sx={{
                    display: 'grid',
                    gridTemplateColumns: [
                        '1fr',
                        '1fr',
                        'repeat(5, minmax(120px, 1fr))',
                    ],
                }}
            >
                <Box width="auto" />

                {/* render grid heading */}
                <Text
                    variant="h4"
                    sx={{ ...gridHeadingSyling, gridColumn: '2 / 3' }}
                >
                    PRODUCT NAME
                </Text>
                <Text
                    variant="h4"
                    sx={{ ...gridHeadingSyling, gridColumn: '3 / 4' }}
                >
                    DETAILS
                </Text>
                <Text
                    variant="h4"
                    sx={{ ...gridHeadingSyling, gridColumn: '4 / 5' }}
                >
                    QUANTITY
                </Text>
                <Text
                    variant="h4"
                    sx={{ ...gridHeadingSyling, gridColumn: '5 / 6' }}
                >
                    PRICE
                </Text>
            </Box>
        </Box>
    );
};

export { ProductsSummary };
