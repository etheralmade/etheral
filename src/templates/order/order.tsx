import React from 'react';
import { findIndex } from 'lodash';
// import styling libs
import { Box, Heading, Flex } from 'rebass';
// import local components
import ProductsSummary from 'components/checkout/products-summary';
import { DetailBox } from 'templates/user/order-overview';

import useAllProducts from 'helper/use-all-products';
import { Order as OrderSchema } from 'helper/schema';
import { CartState } from 'state/reducers/cart-reducer';
import { getDateReadable } from 'helper/get-date';

/**
 * order: Order object to be observed.
 */
type Props = {
    order: OrderSchema;
};

/**
 * Component to show details of an order.
 */
const Order: React.FC<Props> = ({ order }) => {
    const allProducts = useAllProducts();

    // products from the order object do not have any actual product instance
    // what is being done here is to add the actual product instance into each products
    // from the order object.
    const products: CartState[] = order.products
        .map(product => {
            // removing pid attr from product obj.
            const { pid, ...rest } = product;

            const index = findIndex(allProducts, o => o.pid === pid); // filtering product to be observed

            return index === -1
                ? undefined
                : { ...rest, product: allProducts[index] };
        })
        .filter(product => product !== undefined) as CartState[]; // filtering all undefined attrs.

    const { oid, date, total, currency, delivered, paid } = order;

    return (
        <Box className="content" px={[6, 6, 8, 9, 11]}>
            <Heading variant="h3">Order ID: {oid}</Heading>

            <Flex my={[5]} sx={{ div: { mr: [5] } }} flexWrap="wrap">
                {/* total cost */}
                <DetailBox heading="Total cost" text={`${currency} ${total}`} />

                {/* order date */}
                <DetailBox
                    heading="Order date"
                    text={`${getDateReadable(date)}`}
                />

                {/* status if order is delivered */}
                <DetailBox
                    heading="Delivery status"
                    text={delivered ? 'Shipped' : 'In process'}
                />

                {/* status if order is paid */}
                <DetailBox
                    heading="Payment status"
                    text={paid ? 'Paid' : 'Payment not yet received'}
                />
            </Flex>

            <ProductsSummary
                currency={order.currency}
                cart={products}
                wishlist={[]} // mock
                showCart={false} // mock
            />
        </Box>
    );
};

export { Order };
