/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/tslint/config */
/* eslint-disable immutable/no-let */

import React, { useRef, useState } from 'react';
import { findIndex } from 'lodash';
// import styling libs
import { Box, Flex, Heading, Text, Button } from 'rebass';
// import local components
import { Order as OrderSchema } from 'helper/schema';
import { getDateReadable } from 'helper/get-date';
import useAllProducts from 'helper/use-all-products';

// variable to conditinally import
let ReactToPdf: any = null;

type Props = OrderSchema & {
    goBack: () => void;
};

const Invoice: React.FC<Props> = ({
    buyerAddr,
    buyerName,
    buyerPhone,
    buyerPostal,
    currency,
    date,
    products: orderedProducts,
    total,
    shippingCost,
    oid,
    goBack,
}) => {
    const [isClient, setIsClient] = useState(false);
    const ref = useRef();
    const allProducts = useAllProducts();

    const products = orderedProducts.map(prod => {
        const productIndex = findIndex(allProducts, o => o.pid === prod.pid);

        if (productIndex === -1) {
            return prod;
        }

        const { name, prices } = allProducts[productIndex];
        return {
            ...prod,
            name,
            price: currency === 'IDR' ? prices.idrPrice : prices.ausPrice,
        };
    });

    const ETHERAL_PHONE = '12345678';
    const ETHERAL_MAIL = 'etheraletheraletheral';
    const ETHERAL_WEB = 'akdlawdmlasd';

    const styling = {
        fontFamily: 'body',
        fontSize: [3],
    };

    const mediumStyling = {
        ...styling,
        fontWeight: 'medium',
    };

    const productStyling = {
        ...styling,
        my: [2],
    };

    // conditional import, as react-to-pdf uses jspdf and jspdf is not available on SSR.
    if (typeof window !== 'undefined') {
        import('react-to-pdf').then(module => {
            ReactToPdf = module.default;
            setIsClient(true);
        });
    }

    // isClient determines if ReactToPdf is loaded.
    return products.length > 0 && isClient ? (
        <Box className="content" p={[5]} sx={{ overflowX: 'scroll' }}>
            <Box ref={ref} sx={{ width: 768 }} mx="auto" mb={[4]}>
                <Flex justifyContent="space-between" mb={[5]}>
                    {/* logo */}
                    <Box
                        sx={{
                            img: {
                                width: [100],
                                mb: [6],
                            },
                        }}
                    >
                        <img
                            alt="Etheral logo"
                            src="https://firebasestorage.googleapis.com/v0/b/etheral-dev-f86af.appspot.com/o/flamelink%2Fmedia%2FEtheral.png?alt=media&token=334b253c-ad82-4cca-809c-a7ee225ae5cb"
                        />
                        <Heading>BILLED TO</Heading>
                        <Text mt={[5]} {...mediumStyling}>
                            {buyerName}
                            <br />
                            {buyerAddr}
                            <br />
                            {buyerPostal}
                            <br />
                            {buyerPhone}
                        </Text>
                    </Box>
                    {/* etheral and invoice data */}
                    <Box maxWidth="50%">
                        <Heading>
                            INVOICE #{oid}
                            <br />
                            DATE: {getDateReadable(date)}
                        </Heading>
                        <Heading my={[5]}>Etheral</Heading>
                        <Text {...mediumStyling}>
                            {ETHERAL_PHONE}
                            <br />
                            {ETHERAL_MAIL}
                            <br />
                            {ETHERAL_WEB}
                        </Text>
                    </Box>
                </Flex>

                {/* table! */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: [
                            'repeat(4, 1fr)',
                            'repeat(4, 1fr)',
                            '400px 1fr 1fr 1fr',
                        ],
                        '& .line': {
                            gridColumn: '1/5',
                            height: 1,
                        },
                    }}
                >
                    <Heading sx={{ gridColumn: '1/2' }}>PRODUCT NAME</Heading>
                    <Heading sx={{ gridColumn: '2/3' }}>PRICE</Heading>
                    <Heading sx={{ gridColumn: '3/4' }}>QUANTITY</Heading>
                    <Heading sx={{ gridColumn: '4/5' }}>TOTAL PRICE</Heading>

                    <Box className="line" bg="black.1" mt={[5]} />

                    {products.map((product: any) => (
                        <>
                            <Text
                                sx={{ gridColumn: '1/2' }}
                                {...productStyling}
                            >
                                {product.name}
                            </Text>
                            <Text
                                sx={{ gridColumn: '2/3' }}
                                {...productStyling}
                            >
                                {currency} {product.price}
                            </Text>
                            <Text
                                sx={{ gridColumn: '3/4' }}
                                {...productStyling}
                            >
                                {product.amount}
                            </Text>
                            <Text
                                sx={{ gridColumn: '4/5' }}
                                {...productStyling}
                            >
                                {currency} {product.amount * product.price}
                            </Text>
                        </>
                    ))}

                    <Box className="line" bg="black.1" mb={[4]} />

                    <Heading sx={{ gridColumn: '1/2' }}>Total</Heading>
                    <Heading sx={{ gridColumn: '4/5' }}>
                        {currency} {total - (shippingCost || 0)}
                    </Heading>

                    <Text {...productStyling} sx={{ gridColumn: '1/2' }}>
                        Shippng (JNE)
                    </Text>
                    <Text {...productStyling} sx={{ gridColumn: '4/5' }}>
                        {currency} {shippingCost}
                    </Text>

                    <Box className="line" bg="black.0" my={[4]} />

                    <Heading sx={{ gridColumn: '1/2' }}>Total</Heading>
                    <Heading sx={{ gridColumn: '4/5' }}>
                        {currency} {total}
                    </Heading>
                </Box>
            </Box>
            <Flex justifyContent="center">
                <Button onClick={goBack} mr={[3]}>
                    Go back
                </Button>
                <ReactToPdf targetRef={ref} x={4} y={4} filename="invoice.pdf">
                    {({ toPdf }: any) => (
                        <Button onClick={toPdf}>Generate pdf</Button>
                    )}
                </ReactToPdf>
            </Flex>
        </Box>
    ) : null;
};

export { Invoice };
