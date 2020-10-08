import React from 'react';
// import styling libs
import { Box, Heading, Flex, Text } from 'rebass';
// import local components
import DiscountCodeInput from '../discount-code-input';

import { Currencies } from 'state/reducers/currency-reducer';

type Discounts = {
    discounted: boolean;
    discountCode: string;
    discountValue: number;
    discountedAmount: number;
};

type Props = {
    price: number;
    shipping: number;
    currencyPrefix: Currencies;
    totalPrice: number;
    discount: Discounts;
    db: firebase.firestore.Firestore;
    applyCode: (code: string, value: number) => void;
};

const BillingSummary: React.FC<Props> = ({
    price,
    shipping,
    currencyPrefix,
    totalPrice,
    db,
    discount,
    applyCode,
}) => {
    const {
        discounted,
        discountCode,
        discountValue,
        discountedAmount,
    } = discount;

    const textStyling = {
        fontSize: [10],
        fontWeight: 'regular',
        fontFamily: 'body',
    };

    return (
        <Box
            py={[4]}
            width={['100%', '100%', '48%']}
            sx={{
                textAlign: ['center'],
            }}
        >
            <Heading as="h3" variant="h4" fontSize={[1, 1, 3]} mb={[6]}>
                BILLNG SUMMARY
            </Heading>
            {!discounted && <DiscountCodeInput db={db} applyCode={applyCode} />}

            <Box mt={[4]}>
                <Flex justifyContent="space-between">
                    <Text {...textStyling}>Items Total</Text>
                    <Text {...textStyling}>
                        {currencyPrefix} {price}
                    </Text>
                </Flex>

                {/* shipping cost here! */}
                {shipping !== -1 && (
                    <Flex justifyContent="space-between">
                        <Text {...textStyling}>Shipping (JNE)</Text>
                        <Text {...textStyling}>
                            {currencyPrefix} {shipping}
                        </Text>
                    </Flex>
                )}

                {/* discount notifierr */}
                {discounted && (
                    <Flex justifyContent="space-between">
                        <Text {...textStyling} color="misc.discount">
                            Discount code{' '}
                            <span style={{ textDecoration: 'underline' }}>
                                {discountCode}
                            </span>{' '}
                            ({discountValue}%)
                        </Text>
                        <Text {...textStyling} color="misc.discount">
                            -{currencyPrefix} {discountedAmount}
                        </Text>
                    </Flex>
                )}

                {/* order subtotal */}
                {shipping !== -1 && (
                    <Flex justifyContent="space-between">
                        <Text {...textStyling} fontWeight="bold">
                            Subtotal
                        </Text>
                        <Text {...textStyling} fontWeight="bold">
                            {currencyPrefix} {totalPrice}
                        </Text>
                    </Flex>
                )}
            </Box>
        </Box>
    );
};

export { BillingSummary };
