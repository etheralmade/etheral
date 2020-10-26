import React from 'react';
import { findIndex, get, toPairs, startCase } from 'lodash';
import Img, { FixedObject } from 'gatsby-image';

import { Box, Flex, Heading, Text, Button } from 'rebass';
import { Label } from '@rebass/forms';
import { InlineIcon } from '@iconify/react';
import priceTag3Fill from '@iconify/icons-ri/price-tag-3-fill';

import { getDate } from 'helper/get-date';
import { Order } from 'helper/schema/order';
import { Product } from 'helper/schema/product';
import useAllProductImages from 'helper/use-all-product-images';
import StatusBadge, { BadgeTypes } from '../status-badge';
import { InCart } from 'helper/schema/firebase-user';
import ShippingConfirmation, { Inputs } from './ship-confirm';

import { theme } from 'styles';

import './transition.css';

type Props = {
    order: Order;
    allProducts: Product[];
    updateShipping: (data: Inputs) => void;
    hideOrder: (oid: string) => void;
};

const OrderItem: React.FC<Props> = ({
    order,
    allProducts,
    updateShipping,
    hideOrder,
}) => {
    const { extractImgs } = useAllProductImages();

    const spanStyle = {
        marginLeft: '12px',
        fontWeight: 600,
        color: theme.colors.black[0],
    };

    // render each product within an order.
    const renderProduct = (orderedProduct: InCart) => {
        const index = findIndex(allProducts, o => o.pid === orderedProduct.pid);
        const product = allProducts[index];

        const { xs }: any = extractImgs(product, false);
        return index !== -1 ? (
            <Box>
                <Flex
                    alignItems="center"
                    py={[1]}
                    sx={{
                        borderColor: 'black.1',
                        borderStyle: 'solid',
                        borderWidth: 0,
                        borderBottomWidth: 1,
                    }}
                >
                    <Img
                        fixed={
                            get(
                                xs,
                                'img[0].childImageSharp.fixed'
                            ) as FixedObject
                        }
                    />
                    <Text variant="productPrice" ml={[5]} my={[2]}>
                        {orderedProduct.amount} x {product.name}
                        {product.prices.discountPercentage > 0 && (
                            <Box as="span" display="inline-block">
                                <Text
                                    color="misc.discount"
                                    fontWeight="bold"
                                    ml={[4]}
                                    sx={{ '& svg': { mr: [2] } }}
                                >
                                    <InlineIcon
                                        icon={priceTag3Fill}
                                        color={theme.colors.misc.discount}
                                    />
                                    {product.prices.discountPercentage}%
                                </Text>
                            </Box>
                        )}
                    </Text>
                </Flex>
                <Box
                    my={[4]}
                    sx={{
                        fontFamily: 'body',
                        width: '100%',
                        overflow: 'hidden',
                        '.info': {
                            height: 0,
                            width: 0,
                            overflow: 'hidden',
                            transition: '0.2s',
                        },
                        'input[type=checkbox]': { display: 'none' },
                        'input[type=checkbox]:checked + .info': {
                            height: 'fit-content',
                            width: '100%',
                        },
                    }}
                >
                    <Label
                        htmlFor={`${product.name}-info`}
                        mt={[4]}
                        sx={{
                            textDecoration: 'underline',
                            fontWeight: 'bold',
                            '&:hover': { cursor: 'pointer' },
                        }}
                    >
                        View order details:
                    </Label>
                    <input type="checkbox" id={`${product.name}-info`} />

                    {/* render notes here! */}
                    <Box m={[3]} className="info">
                        {orderedProduct.note.map(noteItem => {
                            const { amount, details } = noteItem;

                            // { size: S, gemType: A, gemSize: '' }
                            const renderDetails = toPairs(details) // [['size', 'S'], ['gemType', 'A'], ['gemSize', '']]
                                .filter(arr => arr[1]) // [['size', 'S'], ['gemType', 'A'],]
                                .map(arr => `${startCase(arr[0])}: ${arr[1]}`); // ['Size: S', 'Gem Type: A',]

                            return (
                                <Flex
                                    key={`note-${product.name}-${JSON.stringify(
                                        renderDetails
                                    )}`}
                                >
                                    <Text
                                        as="span"
                                        fontFamily="heading"
                                        mr={[4]}
                                    >
                                        {amount} x
                                    </Text>
                                    <Box>
                                        {renderDetails.map((rd, i) => (
                                            <Text
                                                key={`${product.name}-${rd}-${i}`}
                                            >
                                                {rd}
                                            </Text>
                                        ))}
                                    </Box>
                                </Flex>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        ) : (
            <></>
        );
    };

    // updates UI state and order data on db.
    const confirmShipping = (data: Inputs) => {
        updateShipping(data);
    };

    const {
        products,
        paid,
        delivered,
        date,
        buyerName,
        buyerPhone,
        buyerEmail,
        buyerUId,
        via,
        channel,
        currency,
        total,
        buyerAddr,
        buyerPostal,
        shippingData,
        discount,
        discountCode,
        message,
        oid,
    } = order;

    return (
        <Box mt={[5]} mx={[3]}>
            <Heading fontFamily="body" fontWeight="body" color="black.0">
                Order ID: <strong>{oid}</strong>
            </Heading>

            {/* status badges */}
            <Flex className="status">
                <StatusBadge type={BadgeTypes.PAYMENT} paid={paid} />
                <StatusBadge type={BadgeTypes.SHIPPING} shipped={delivered} />
                <StatusBadge type={BadgeTypes.DATE} date={date} />
            </Flex>

            {/* products */}
            <Box
                bg="white.2"
                py={[4]}
                pr={[3]}
                pl={[4, 4, 5]}
                my={[5]}
                sx={{
                    borderColor: 'black.1',
                    borderStyle: 'solid',
                    borderWidth: 1,
                }}
            >
                <Heading as="h4" variant="adminOrderBody">
                    Products
                </Heading>
                <Box>
                    {products.map(product => (
                        <React.Fragment key={product.pid}>
                            {renderProduct(product)}
                        </React.Fragment>
                    ))}
                </Box>

                {/* render discount infos. */}
                {discountCode && (
                    <Box my={[4]}>
                        <Heading as="h4" variant="adminOrderBody">
                            Discount
                        </Heading>
                        <Box mt={[3]}>
                            <Text variant="productPrice">
                                Code:{' '}
                                <span style={{ fontWeight: 'bold' }}>
                                    {discountCode}
                                </span>
                            </Text>
                            <Text variant="productPrice">
                                Discount:{' '}
                                <span
                                    style={{
                                        fontWeight: 'bold',
                                        color: theme.colors.misc.discount,
                                    }}
                                >
                                    {discount}%
                                </span>
                            </Text>
                        </Box>
                    </Box>
                )}

                <Text variant="bodyMedium" mt={[5]} mr={[3]} textAlign="right">
                    Payment via{' '}
                    <span style={spanStyle}>
                        {via} - {channel}
                    </span>
                </Text>
                <Text variant="bodyMedium" mr={[3]} textAlign="right">
                    Subtotal:
                    <span style={spanStyle}>
                        {currency}
                        {'  '}
                        {total}
                    </span>
                </Text>
            </Box>

            {/* Customer info */}
            <Box overflow="hidden" my={[5]}>
                <Heading as="h4" variant="adminOrderBody">
                    Buyer&apos;s info
                </Heading>
                <Box ml={[3, 3, 4]}>
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
            </Box>

            {/* ship-to infos */}
            <Box my={[5]}>
                <Heading as="h4" variant="adminOrderBody">
                    Shipping info
                </Heading>
                <Box ml={[3, 3, 4]}>
                    <Text variant="bodyMedium">
                        Address: <span style={spanStyle}>{buyerAddr}</span>
                    </Text>
                    <Text variant="bodyMedium">
                        Postal code:{' '}
                        <span style={spanStyle}>{buyerPostal}</span>
                    </Text>
                </Box>
            </Box>

            {/* messages (if available) */}
            {message && (
                <Box my={[5]}>
                    <Heading as="h4" variant="adminOrderBody">
                        Message
                    </Heading>
                    <Box ml={[3, 3, 4]}>
                        <Text variant="bodyMedium">
                            For:{' '}
                            <span style={spanStyle}>{message.forName}</span>
                        </Text>
                        <Text variant="bodyMedium">
                            From:{' '}
                            <span style={spanStyle}>{message.fromName}</span>
                        </Text>
                        <Text variant="bodyMedium">
                            Message: <br />
                            <span style={spanStyle}>{message.message}</span>
                        </Text>
                    </Box>
                </Box>
            )}

            {/* confirm shipping. */}
            {delivered && shippingData ? (
                <>
                    <Heading as="h4" variant="adminOrderBody">
                        Shiping Informations
                    </Heading>
                    <Box data-testid="shipping-info" ml={[3, 3, 4]} mb={[5]}>
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

            {/* button to hide order */}
            {delivered && paid ? (
                <Button onClick={() => hideOrder(oid)}>Hide order</Button>
            ) : null}
        </Box>
    );
};

export { OrderItem };
