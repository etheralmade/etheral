import React from 'react';
import { Card, Heading } from 'rebass';

import { Order } from 'helper/schema/order';
import OrderItem from './order-item';

type Props = {
    orders: Order[];
    db: firebase.firestore.Firestore;
};

const Orders: React.FC<Props> = ({ orders, db }) => {
    return (
        <>
            <Heading as="h1" variant="headingAdmin">
                Orders
            </Heading>
            <Card
                mt={[3, 3, 6]}
                width={[1]}
                bg="#f9f9f9"
                overflow="hidden"
                css={`
                    border-radius: 4px;
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.125);
                `}
            >
                {orders.map(order => (
                    <OrderItem key={order.oid} order={order} db={db} />
                ))}
            </Card>
        </>
    );
};

export { Orders };
