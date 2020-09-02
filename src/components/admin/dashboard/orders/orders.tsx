import React from 'react';
import { Box, Heading } from 'rebass';

import { Order } from 'helper/schema/order';
import OrderItem from './order-item';

type Props = {
    orders: Order[];
    db: firebase.firestore.Firestore;
};

const Orders: React.FC<Props> = ({ orders, db }) => {
    return (
        <Box width="100%" p={[3, 3, 5]}>
            <Heading as="h1" variant="h1">
                Orders
            </Heading>
            {orders.map(order => (
                <OrderItem key={order.oid} order={order} db={db} />
            ))}
        </Box>
    );
};

export { Orders };
