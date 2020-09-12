import React, { useState } from 'react';
import { Card, Heading } from 'rebass';

import { Order } from 'helper/schema/order';
import OrderItem from './order-item';

type Props = {
    orders: Order[];
    db: firebase.firestore.Firestore;
};

const Orders: React.FC<Props> = ({ orders, db }) => {
    // onFocus state -> which order is on focus.
    const [onFocus, setOnFocus] = useState('');

    return (
        <>
            <Heading as="h1" color="#333" fontSize={[5]}>
                Orders
            </Heading>
            <Card>
                {orders.map(order => )}
            </Card>
            {/* <Card
                mt={[3, 3, 6]}
                width={[1]}
                bg="white.0"
                overflow="hidden"
                css={`
                    border-radius: 4px;
                    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.125);
                `}
            >
                {orders.map(order => (
                    <OrderItem key={order.oid} order={order} db={db} />
                ))}
            </Card> */}
        </>
    );
};

export { Orders };
