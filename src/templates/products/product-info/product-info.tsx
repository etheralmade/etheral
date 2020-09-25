import React from 'react';

import { Box, Heading, Text, Flex } from 'rebass';

import {
    IState as ICurrencyState,
    Currencies,
} from 'state/reducers/currency-reducer';
import { theme } from 'styles';
import { withDiscount } from 'helper/with-discount';
import ProductForm from './product-form';

export type Props = {
    productName: string;
    prices: { idrPrice: number; ausPrice: number; discountPercentage: number };
    description: string;
    productDetails: string;
    availableSizes: string;
    gems: {
        withGems: boolean;
        gemTypes: string;
        gemSizes: string;
    };
};

const ProductInfo: React.FC<Props & ICurrencyState> = ({
    productName,
    prices,
    currency,
    description,
    productDetails,
    availableSizes,
    gems,
}) => {
    const { idrPrice, ausPrice, discountPercentage } = prices;

    const discounted = discountPercentage > 0;

    return (
        <Box
            width="100%"
            maxWidth={['100%', '60%', '50%', '40%']}
            flex={1}
            pl={[0, 5, 6]}
            pt={[0, 5]}
            pb={[5]}
        >
            <Heading as="h1" variant="h1">
                {productName.toUpperCase()}
            </Heading>

            {/* product price with the ability to extend when the product is discounted. */}
            <Flex alignItems="center" my={[4]}>
                <Heading
                    as="h4"
                    color={
                        discounted
                            ? theme.colors.misc.discount
                            : theme.colors.black[0]
                    }
                    className={discounted ? 'discount' : ''}
                    css={`
                        ${discounted &&
                            `
                            :after {
                                content: '-${discountPercentage}%';
                                color: ${theme.colors.misc.discount};
                                font-family: Poppins, sans-serif;
                                
                                position: absolute;
                                right: -48px;
                                top: 0;

                                display: block;
                            }
                        `};
                        width: fit-content;
                        font-family: Poppins, sans-serif;
                        font-weight: 500;
                    `}
                >
                    {currency}{' '}
                    {currency === Currencies.IDR ? idrPrice : ausPrice}
                </Heading>
                {discounted && (
                    <Heading
                        as="h4"
                        variant="productName"
                        color={theme.colors.misc.discount}
                        ml={[9]}
                    >
                        {currency}{' '}
                        {withDiscount(
                            currency === Currencies.IDR ? idrPrice : ausPrice,
                            discountPercentage
                        )}
                    </Heading>
                )}
            </Flex>

            {/* render forms. */}
            <ProductForm availableSizes={availableSizes} gems={gems} />

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
