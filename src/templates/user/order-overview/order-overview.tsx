import React from 'react';
import { findIndex } from 'lodash';
import { Link } from '@reach/router';

// import styling libs
import { Box, Heading, Flex, Text, Button } from 'rebass';
// import local components

import { Order, Product } from 'helper/schema';
import useAllProducts from 'helper/use-all-products';
import { getDateReadable } from 'helper/get-date';

/**
 * order: the order to be shown.
 */
type Props = {
    order: Order;
};

/**
 * heading: text to show as heading / detail identifier
 * text: the actual data to be shown
 */
type DetailBoxProps = {
    heading: string;
    text: string;
};

/**
 * component to display an overview of an order
 * @param param0 props
 */
const OrderOverview: React.FC<Props> = ({ order }) => {
    const allProducts = useAllProducts();

    const { oid, total, date, currency } = order;

    const products: Product[] = order.products
        .map(product => {
            const index = findIndex(allProducts, o => o.pid === product.pid);

            return index === -1 ? undefined : allProducts[index];
        })
        .filter(product => product !== undefined) as Product[];

    return (
        <Box
            p={[4]}
            my={[3, 4, 5]}
            sx={{
                width: ['100%', '100%', '48%'],
                borderColor: 'black.1',
                borderWidth: 1,
                borderStyle: 'solid',
                a: {
                    width: '100%',
                },
            }}
        >
            {/* order id */}
            <Heading variant="h3">Order ID: {oid}</Heading>

            {/* product images */}
            <Flex
                alignItems="center"
                py={[4]}
                sx={{
                    img: {
                        width: [50, 80, 80, 100],
                        height: [50, 80, 80, 100],
                        mr: [3, 3, 5],
                    },
                }}
            >
                {products.map((product, i) => {
                    if (i < 3) {
                        return <img src={product.urls[0]} alt={product.name} />;
                    } else {
                        return null; // show just the first 3 products on the list.
                    }
                })}
                {products.length > 3 && <Text>+ {products.length - 3}</Text>}
            </Flex>

            {/* total cost */}
            <DetailBox heading="Total cost" text={`${currency} ${total}`} />

            {/* order date */}
            <DetailBox heading="Order date" text={`${getDateReadable(date)}`} />

            <Link to={`/order?oid=${oid}`} state={{ order }}>
                <Button width="100%" mt={[5]}>
                    View Order
                </Button>
            </Link>
        </Box>
    );
};

/**
 * component to show data(s) in a seperate manner.
 * @param param0 detail box props
 */
const DetailBox: React.FC<DetailBoxProps> = ({ heading, text }) => {
    return (
        <Box py={[2]}>
            <Heading variant="h4">{heading}</Heading>
            <Text variant="h3" mt={[2]}>
                {text}
            </Text>
        </Box>
    );
};

export { OrderOverview, DetailBox };
