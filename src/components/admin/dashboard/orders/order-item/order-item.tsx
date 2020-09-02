import React, { useState } from 'react';
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
import ShippingConfirmation, { Inputs } from './ship-confirm';

type Props = {
    order: Order;
    allProducts: Product[];
    updateShipping: (data: Inputs) => void;
};

const OrderItem: React.FC<Props> = ({ order, allProducts, updateShipping }) => {
    const [orderState, setOrderState] = useState<Order>(order);
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
    } = orderState;

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

    const confirmShipping = (data: Inputs) => {
        setOrderState(prev => ({
            ...prev,
            shippingData: {
                ...data,
                shippingDate: new Date(data.shippingDate),
            },
            delivered: true,
        }));
        updateShipping(data);
    };

    const { sessionId, paymentNo, paymentName, expired, fee } = transactionData;

    const spanStyle = {
        marginLeft: '12px',
        fontWeight: 400,
    };

    const headingStyle = {
        my: [2, 2, 3],
    };

    const infoStyle = {
        mb: [5, 5, 6],
    };

    console.log(shippingData);

    return orderState ? (
        <Flex width="100%">
            <Box width="100%">
                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    flexWrap="wrap"
                >
                    <Heading as="h3" variant="h3" color="brown.2">
                        OrderId: <span style={{ color: '#553517' }}>{oid}</span>
                    </Heading>
                    <Box variant={paid ? 'paidBadge' : 'notPaidBadge'}>
                        <InlineIcon
                            icon={paid ? checkboxCircleFill : closeCircleLine}
                        />
                        {paid ? 'Paid' : 'Not paid'}
                    </Box>
                </Flex>

                <Heading as="h4" variant="h4" {...headingStyle}>
                    Buyer&apos;s info
                </Heading>
                <Box {...infoStyle}>
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

                <Heading as="h4" variant="h4" {...headingStyle}>
                    Order info
                </Heading>
                <Box {...infoStyle}>
                    <Text variant="bodyMedium">
                        Order made on{' '}
                        <span style={spanStyle}>{getDate(date)}</span>. Payment
                        via{' '}
                        <span style={spanStyle}>
                            {via} - {channel}
                        </span>
                    </Text>
                    <Heading as="h5" variant="h5">
                        Products
                    </Heading>
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

                <Flex
                    alignItems="center"
                    justifyContent="space-between"
                    {...headingStyle}
                >
                    <Heading as="h4" variant="h4">
                        Transaction Info
                    </Heading>
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
                <Box {...infoStyle}>
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

                <Heading as="h4" variant="h4" {...headingStyle}>
                    Ship to
                </Heading>
                <Box {...infoStyle}>
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

                <Heading as="h4" variant="h4" my={[4, 4, 5]}>
                    Status: {delivered ? `Shipped ` : 'Not shipped'}{' '}
                    <InlineIcon
                        icon={delivered ? checkboxCircleFill : closeCircleLine}
                    />
                </Heading>
                {delivered && shippingData ? (
                    <>
                        <Heading as="h4" variant="h4" {...headingStyle}>
                            Shiping Informations
                        </Heading>
                        <Box data-testid="shipping-info">
                            {shippingData.shippingDate && (
                                <Text variant="bodyMedium">
                                    Shipped date:{' '}
                                    <span style={spanStyle}>
                                        {getDate(shippingData.shippingDate)}
                                    </span>
                                </Text>
                            )}
                            <Text variant="bodyMedium">
                                Tracking number:{' '}
                                <span style={spanStyle}>
                                    {shippingData.trackingNum}
                                </span>
                            </Text>
                            <Text variant="bodyMedium">
                                Shipped by:{' '}
                                <span style={spanStyle}>
                                    {shippingData.shippedBy}
                                </span>
                            </Text>
                        </Box>
                    </>
                ) : (
                    <ShippingConfirmation confirmShipping={confirmShipping} />
                )}
            </Box>
        </Flex>
    ) : (
        <></>
    );
};

export { OrderItem };
