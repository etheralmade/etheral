import React from 'react';
import { findIndex } from 'lodash';

import { Box, Flex, Heading, Text } from 'rebass';
import checkboxCircleFill from '@iconify/icons-ri/checkbox-circle-fill';
import closeCircleLine from '@iconify/icons-ri/close-circle-line';
import arrowDownSFill from '@iconify/icons-ri/arrow-down-s-fill';
import { InlineIcon, Icon } from '@iconify/react';

import { Order } from 'helper/schema/order';
import { Product } from 'helper/schema/product';
import { getDate } from 'helper/get-date';
import { InCart } from 'helper/schema/firebase-user';

type Props = {
    order: Order;
    allProducts: Product[];
};

const OrderItem: React.FC<Props> = ({ order, allProducts }) => {
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

    const renderProduct = (product: InCart) => {
        const index = findIndex(allProducts, o => o.pid === product.pid);
        return index !== -1 ? (
            <Text variant="bodyMedium">
                {product.amount} x
                <span style={spanStyle}>{allProducts[index].name}</span>
            </Text>
        ) : (
            <></>
        );
    };

    const { sessionId, paymentNo, paymentName, expired, fee } = transactionData;

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

                <Heading variant="h4">Buyer&apos;s info</Heading>
                <Box>
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

                {/* Order infos. */}

                <Heading variant="h4">Order info</Heading>
                <Box>
                    <Text variant="bodyMedium">
                        Order made on{' '}
                        <span style={spanStyle}>{getDate(date)}</span>. Payment
                        via{' '}
                        <span style={spanStyle}>
                            {via} - {channel}
                        </span>
                    </Text>
                    <Heading variant="h5">Products</Heading>
                    <Box>
                        {products.map(product => (
                            <React.Fragment key={product.pid}>
                                {renderProduct(product)}
                            </React.Fragment>
                        ))}
                    </Box>
                    <Text variant="bodyMedium">
                        Subtotal:{' '}
                        <span style={spanStyle}>
                            {currency}
                            {'  '}
                            {total}
                        </span>
                    </Text>
                </Box>

                {/* transaction infos. */}

                <Flex alignItems="center" justifyContent="space-between">
                    <Heading variant="h4">Transaction Info</Heading>
                    <Flex
                        variant="center"
                        css={`
                            & > svg {
                                transform: scale(1.3) !important;
                            }
                        `}
                    >
                        <Icon icon={arrowDownSFill} />
                    </Flex>
                </Flex>
                <Box>
                    <Text variant="bodyMedium">
                        Session ID: <span style={spanStyle}>{sessionId}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Payment no: <span style={spanStyle}>{paymentNo}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Payment name:{' '}
                        <span style={spanStyle}>{paymentName}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Expired on: <span style={spanStyle}>{expired}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Fee: <span style={spanStyle}>{fee}</span>
                    </Text>
                </Box>

                {/* Ship-to infos. */}

                <Heading variant="h4">Ship to</Heading>
                <Box>
                    <Text variant="bodyMedium">
                        Address: <span style={spanStyle}>{buyerAddr}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Postal code:{' '}
                        <span style={spanStyle}>{buyerPostal}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Shipping method:{' '}
                        <span style={spanStyle}>{shippingMethod}</span>
                    </Text>
                </Box>
            </Box>
        </Flex>
    );
};

export { OrderItem };
