import React from 'react';
import { Box, Flex, Heading, Text } from 'rebass';
import checkboxCircleFill from '@iconify/icons-ri/checkbox-circle-fill';
import closeCircleLine from '@iconify/icons-ri/close-circle-line';
import { InlineIcon } from '@iconify/react';

import { Order } from 'helper/schema/order';

type Props = {
    order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
    const {
        oid,
        buyerName,
        buyerEmail,
        buyerPhone,
        buyerUId,
        buyerAddr,
        buyerPostal,
        total,
        currency,
        date,
        via,
        channel,
        products,
        paid,
        shippingMethod,
        delivered,
        transactionData,
        shippingData,
    } = order;

    const spanStyle = {
        marginLeft: '12px',
        fontWeight: 400,
    };

    return (
        <Flex width="100%">
            <Box width="100%">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Heading variant="h3" color="brown.2">
                        OrderId: <span style={{ color: '#553517' }}>{oid}</span>
                    </Heading>
                    <Box variant={paid ? 'paidBadge' : 'notPaidBadge'}>
                        <InlineIcon
                            icon={paid ? checkboxCircleFill : closeCircleLine}
                        />
                        {paid ? 'Paid' : 'Not paid'}
                    </Box>
                </Flex>
                <Box>
                    <Heading variant="h4">Buyer&apos;s info</Heading>
                    <Text variant="bodyMedium">
                        Name: <span style={spanStyle}>{buyerName}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Email: <span style={spanStyle}>{buyerEmail}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Phone: <span style={spanStyle}>{buyerPhone}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Buyer UserID:{' '}
                        <span style={spanStyle}>
                            {buyerUId === 'admin' ? 'None' : buyerUId}
                        </span>
                    </Text>
                </Box>
                <Box>
                    <Heading variant="h4">Ship to</Heading>
                    <Text variant="bodyMedium">
                        Address: <span style={spanStyle}>{buyerAddr}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Postal code:{' '}
                        <span style={spanStyle}>{buyerPostal}</span>
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

export { OrderItem };
