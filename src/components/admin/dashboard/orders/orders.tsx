import React, { useState } from 'react';
import { findIndex } from 'lodash';

import { Text, Heading, Box, Flex } from 'rebass';

import { Order } from 'helper/schema/order';
import OrderItem from './order-item';
import OrderBox from './order-box';

type Props = {
    orders: Order[];
    db: firebase.firestore.Firestore;
};

const Orders: React.FC<Props> = ({ orders, db }) => {
    // onFocus state -> which order is on focus.
    const [onFocus, setOnFocus] = useState<Order | undefined>(undefined);

    // state to determine which orders to be shown. (filtering)
    const [display, setDisplay] = useState(orders);

    // switch focus order display.
    const focusOrder = (oid: string) => {
        const focusedIndex = findIndex(orders, o => o.oid === oid);
        if (focusedIndex !== -1) {
            setOnFocus(orders[focusedIndex]);
        } else {
            setOnFocus(undefined);
        }
    };

    const goBack = () => {
        setOnFocus(undefined);
    };

    const tabletopStyling = {
        fontFamily: 'body',
        fontSize: [0, 0, 1],
        color: '#555',
    };

    return (
        <Flex justifyContent="space-evenly">
            <Box
                p={4}
                bg="#fff"
                width="48%"
                css={`
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
                `}
            >
                <Heading
                    as="h1"
                    fontWeight={200}
                    color="#333"
                    fontSize={[3]}
                    mb={[3]}
                >
                    Orders
                </Heading>
                {/* Grid table to show: 
                    |Order ID|Payment status|Currency|Date
                */}
                <Box
                    sx={{
                        display: 'grid',
                        gridGap: 2,
                        gridTemplateColumns: 'repeat(4, minmax(64, 1fr))',
                    }}
                >
                    <Text {...tabletopStyling}>Order ID</Text>
                    <Text {...tabletopStyling}>Status</Text>
                    <Text {...tabletopStyling}>Currency</Text>
                    <Text {...tabletopStyling}>Date</Text>
                    <Box
                        sx={{
                            gridColumn: '1/span 4',
                        }}
                    >
                        {display.map((order, i) => (
                            <OrderBox
                                key={order.oid}
                                oid={order.oid}
                                date={order.date}
                                paid={order.paid}
                                shipped={order.delivered}
                                currency={order.currency}
                                bg={i % 2 === 0 ? 'white.2' : 'white.3'}
                                focusOrder={focusOrder}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
            {/* box to show Order. */}
            <Box
                p={4}
                bg="#fff"
                width="48%"
                css={`
                    box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
                `}
            >
                {onFocus && (
                    <OrderItem order={onFocus} db={db} goBack={goBack} />
                )}
            </Box>
        </Flex>
    );
};

export { Orders };
