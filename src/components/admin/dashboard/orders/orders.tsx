import React, { useState, useEffect } from 'react';
import { findIndex, difference } from 'lodash';

import { Text, Heading, Box, Flex, Button } from 'rebass';

import { Order } from 'helper/schema/order';
import OrderItem from './order-item';
import OrderBox from './order-box';

type Props = {
    orders: Order[];
    db: firebase.firestore.Firestore;
    rerenderParent: () => void;
};

const Orders: React.FC<Props> = ({ orders, db, rerenderParent }) => {
    // onFocus state -> which order is on focus.
    const [onFocus, setOnFocus] = useState<Order | undefined>(undefined);

    // state to determine which orders to be shown. (filtering)
    const [display, setDisplay] = useState<Order[]>([]);

    // state to determine which order(s) to display (hidden / not)
    const [displayHidden, setDisplayHidden] = useState(false);

    useEffect(() => {
        // get all hidden orders
        const hidden = orders.filter(order => order.hidden);

        // set display based on the actual displayHidden state
        setDisplay(
            sortOrders(displayHidden ? hidden : difference(orders, hidden))
        );
    }, [displayHidden]);

    /**
     * function to sort orders based on its date (descending)
     * @param items to be ordered
     */
    const sortOrders = (items: Order[]) => [
        // eslint-disable-next-line @typescript-eslint/tslint/config
        ...items.sort((a, b) => b.date.getTime() - a.date.getTime()),
    ];

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
        fontSize: [1],
        color: '#555',
    };

    const boxStyling = {
        p: 4,
        bg: '#fff',
        className: 'custom-scrollbar',
        css: `
            box-shadow: 0 0 8px rgba(0, 0, 0, 0.125);
            max-height: 90vh;
            width: 100vw;

            @media screen and (min-width: 48em) {
                width: 48%;
                max-height: calc(100vh - 64px);
            }
            `,
    };

    return (
        <Flex
            maxHeight="100vh"
            css={`
                justify-content: space-between;

                /* edge space-evenly progressive enhancement. */
                @supports not (-ms-ime-align: auto) {
                    justify-content: space-evenly;
                }
            `}
        >
            <Box
                {...boxStyling}
                css={`
                    @media screen and (max-width: 48em) {
                        opacity: ${onFocus ? 0 : 1};
                    }
                `}
            >
                <Flex justifyContent="space-between" mb={[4]}>
                    <Heading as="h1" color="#333" fontSize={[3]} mb={[3]}>
                        Orders
                    </Heading>

                    <Button
                        sx={{
                            transition: '0.2s',
                            bg: 'white.2',
                            fontFamily: 'body',
                            fontSize: [1],
                            fontWeight: 'medium',
                            color: '#555',
                            '&:hover': { cursor: 'pointer', bg: 'white.3' },
                            p: [3],
                        }}
                        onClick={() => {
                            setDisplayHidden(prev => !prev);
                        }}
                    >
                        {displayHidden ? 'Show orders' : 'Show hidden orders'}
                    </Button>
                </Flex>

                {/* Grid table to show: 
                    |Order ID|Payment status|Currency|Date
                */}
                <Box
                    sx={{
                        display: 'grid',
                        gridGap: 2,
                        gridTemplateColumns: 'repeat(4, minmax(64px, 1fr))',
                        // gridTemplateColumns:
                        //     'minmax(64, 1fr) minmax(64, 1fr) minmax(64, 1fr) ',
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
                {...boxStyling}
                css={`
                    @media screen and (max-width: 48em) {
                        position: absolute;
                        opacity: ${onFocus ? 1 : 0};
                        padding: 0;
                    }
                `}
            >
                {onFocus && (
                    <OrderItem
                        order={onFocus}
                        db={db}
                        goBack={goBack}
                        rerenderParent={rerenderParent}
                    />
                )}
            </Box>
        </Flex>
    );
};

export { Orders };
