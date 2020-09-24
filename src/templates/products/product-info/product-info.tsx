import React from 'react';

import { Box, Heading, Text } from 'rebass';

import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';

export type Props = {
    productName: string;
    prices: { idrPrice: number; ausPrice: number; discountPercentage: number };
    description: string;
    productDetails: string;
};

const ProductInfo: React.FC<Props & ICurrencyState> = ({
    productName,
    prices,
    currency,
    description,
    productDetails,
}) => {
    const { idrPrice, ausPrice, discountPercentage } = prices;

    const discounted = discountPercentage > 0;

    return (
        <Box width="100%" flex={1} pl={[0, 5, 6]} pt={[0, 5]}>
            <Heading as="h1" variant="h1">
                {productName.toUpperCase()}
            </Heading>
            <Heading as="h4" variant="productPrice" my={[4]}>
                {currency} {currency === Currencies.IDR ? idrPrice : ausPrice}
                {/* render if discounted */}
            </Heading>

            {/* render forms. */}

            {/* render description section */}
            {description !== '' && <Description description={description} />}

            {/* render product details section */}
            {productDetails !== '' && (
                <Details productDetails={productDetails} />
            )}
        </Box>
    );
};

const Description: React.FC<{ description: string }> = ({ description }) => (
    <Box sx={{ borderTop: '1px solid black', borderBottom: '1px solid black' }}>
        <Heading variant="productName" my={[5]}>
            DESCRIPTION
        </Heading>
        <Text variant="productPrice" mb={[5]}>
            {description}
        </Text>
    </Box>
);

const Details: React.FC<{ productDetails: string }> = ({ productDetails }) => (
    <Box>
        <Heading variant="productName" my={[5]}>
            DETAILS
        </Heading>
        <Box
            sx={{
                fontFamily: 'body',
                fontWeight: 500,
                fontSize: [1, 2, 1, 2],
                color: '#000',
                lineHeight: ['6px', '6px', '7px'],
                ul: {
                    lineHeight: ['6px', '6px', '7px'],
                    li: {
                        lineHeight: ['6px', '6px', '7px'],
                    },
                },
            }}
            dangerouslySetInnerHTML={{ __html: productDetails }}
        />
    </Box>
);

export { ProductInfo };
