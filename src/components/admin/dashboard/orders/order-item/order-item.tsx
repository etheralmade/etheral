import React, { useState } from 'react';
import { findIndex, get } from 'lodash';
import Img, { FixedObject } from 'gatsby-image';

import { Box, Flex, Heading, Text, Card } from 'rebass';
import checkboxCircleFill from '@iconify/icons-ri/checkbox-circle-fill';
import closeCircleLine from '@iconify/icons-ri/close-circle-line';
import arrowDownFill from '@iconify/icons-ri/arrow-down-s-line';
import { InlineIcon, Icon } from '@iconify/react';
import { CSSTransition } from 'react-transition-group';

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
};

const OrderItem: React.FC<Props> = ({ order, allProducts, updateShipping }) => {
    const [viewOrderInfo, setViewOrderInfo] = useState(false);
    const [viewTransactionInfo, setViewTransactionInfo] = useState(false);
    const [viewShiptoInfo, setViewShiptoInfo] = useState(false);

    const { extractImgs } = useAllProductImages();

    const spanStyle = {
        marginLeft: '12px',
        fontWeight: 500,
        color: theme.colors.brown[1],
    };

    // render each product within an order.
    const renderProduct = (orderedProduct: InCart) => {
        const index = findIndex(allProducts, o => o.pid === orderedProduct.pid);
        const product = allProducts[index];

        const { xs }: any = extractImgs(product, false);
        return index !== -1 ? (
            <Flex>
                <Img
                    fixed={
                        get(xs, 'img[0].childImageSharp.fixed') as FixedObject
                    }
                />
                <Text variant="body">
                    {orderedProduct.amount} x
                    <span style={spanStyle}>{product.name}</span>
                </Text>
            </Flex>
        ) : (
            <></>
        );
    };

    // updates UI state and order data on db.
    const confirmShipping = (data: Inputs) => {
        updateShipping(data);
    };

    const { products, paid, delivered, date } = order;

    return (
        <Box mt={[5]} mx={[3]}>
            <Heading fontFamily="body" fontWeight="body">
                Order ID: <strong>{order.oid}</strong>
            </Heading>
            <Flex className="status">
                <StatusBadge type={BadgeTypes.PAYMENT} paid={paid} />
                <StatusBadge type={BadgeTypes.SHIPPING} shipped={delivered} />
                <StatusBadge type={BadgeTypes.DATE} date={date} />
            </Flex>
            <Box bg="white.3" py={[4]} px={[3]}>
                <Heading
                    as="h4"
                    fontFamily="body"
                    fontWeight="body"
                    fontSize={3}
                    mb={[4]}
                >
                    Products
                </Heading>
                <Box ml={[3, 3, 4]}>
                    {products.map(product => (
                        <React.Fragment key={product.pid}>
                            {renderProduct(product)}
                        </React.Fragment>
                    ))}
                </Box>
            </Box>
        </Box>
    );

    // if (orderState) {
    //     const {
    //         oid,
    //         buyerName,
    //         buyerEmail,
    //         buyerPhone,
    //         buyerUId,
    //         buyerAddr,
    //         buyerPostal,
    //         total,
    //         currency,
    //         date,
    //         via,
    //         channel,
    //         products,
    //         paid,
    //         shippingMethod,
    //         delivered,
    //         transactionData,
    //         shippingData,
    //     } = orderState;

    //     // render each product within an order.
    //     const renderProduct = (product: InCart) => {
    //         const index = findIndex(allProducts, o => o.pid === product.pid);
    //         return index !== -1 ? (
    //             <Text variant="bodyMedium">
    //                 {product.amount} x
    //                 <span style={spanStyle}>{allProducts[index].name}</span>
    //             </Text>
    //         ) : (
    //             <></>
    //         );
    //     };

    //     // updates UI state and order data on db.
    //     const confirmShipping = (data: Inputs) => {
    //         setOrderState(prev =>
    //             prev !== undefined
    //                 ? {
    //                       ...prev,
    //                       shippingData: {
    //                           ...data,
    //                           shippingDate: new Date(data.shippingDate),
    //                       },
    //                       delivered: true,
    //                   }
    //                 : prev
    //         );
    //         updateShipping(data);
    //     };

    //     const {
    //         sessionId,
    //         paymentNo,
    //         paymentName,
    //         expired,
    //         fee,
    //     } = transactionData;

    //     const spanStyle = {
    //         marginLeft: '12px',
    //         fontWeight: 500,
    //         color: theme.colors.brown[1],
    //     };

    //     const headingStyle = {
    //         my: [2, 2, 3],
    //     };

    //     const infoStyle = {
    //         mb: [5, 5, 6],
    //         ml: [3, 3],
    //     };
    //     return (
    //         <h1>{oid}</h1>
    //         // <Card
    //         //     width="100%"
    //         //     px={[3]}
    //         //     py={[4]}
    //         //     css={`
    //         //         border: none;
    //         //         border-color: ${theme.colors.brown[2]};
    //         //         border-width: 0px;
    //         //         border-style: solid;
    //         //         border-bottom-width: 2px;
    //         //         background-color: #fff;
    //         //         & svg {
    //         //             transition: 0.2s;
    //         //         }
    //         //     `}
    //         // >
    //         //     <Flex
    //         //         alignItems={['flex-start', 'flex-start', 'center']}
    //         //         justifyContent="space-between"
    //         //         css={`
    //         //             transition: 0.1s;
    //         //         `}
    //         //     >
    //         //         <Flex
    //         //             alignItems={['flex-start', 'flex-start', 'center']}
    //         //             flexDirection={['column', 'column', 'row']}
    //         //         >
    //         //             <Heading
    //         //                 as="h3"
    //         //                 variant="adminOrderHeading"
    //         //                 color="brown.2"
    //         //             >
    //         //                 OrderId:{' '}
    //         //                 <span
    //         //                     style={{
    //         //                         color: '#553517',
    //         //                     }}
    //         //                 >
    //         //                     {oid}
    //         //                 </span>
    //         //             </Heading>
    //         //             <Box
    //         //                 variant={paid ? 'paidBadge' : 'notPaidBadge'}
    //         //                 mt={[3, 3, 0]}
    //         //                 ml={[0, 0, 4]}
    //         //             >
    //         //                 <InlineIcon
    //         //                     icon={
    //         //                         paid ? checkboxCircleFill : closeCircleLine
    //         //                     }
    //         //                 />
    //         //                 {paid ? 'Paid' : 'Not paid'}
    //         //             </Box>
    //         //         </Flex>
    //         //     </Flex>

    //         //     <Box
    //         //         overflow="hidden"
    //         //         css={`
    //         //             transition: 0.2s;
    //         //         `}
    //         //     >
    //         //         <Heading as="h4" variant="adminOrderBody" {...headingStyle}>
    //         //             Buyer&apos;s info
    //         //         </Heading>
    //         //         <Box {...infoStyle}>
    //         //             <Text variant="bodyMedium">
    //         //                 Name: <span style={spanStyle}>{buyerName}</span>
    //         //             </Text>
    //         //             <Text variant="bodyMedium">
    //         //                 Email: <span style={spanStyle}>{buyerEmail}</span>
    //         //             </Text>
    //         //             <Text variant="bodyMedium">
    //         //                 Phone: <span style={spanStyle}>{buyerPhone}</span>
    //         //             </Text>
    //         //             <Text variant="bodyMedium">
    //         //                 Buyer UserID:{' '}
    //         //                 <span style={spanStyle}>
    //         //                     {buyerUId === 'admin' ? 'None' : buyerUId}
    //         //                 </span>
    //         //             </Text>
    //         //         </Box>

    //         //         {/* Order infos. */}

    //         //         <Flex
    //         //             alignItems="center"
    //         //             justifyContent="space-between"
    //         //             {...headingStyle}
    //         //         >
    //         //             <Heading as="h4" variant="adminOrderBody">
    //         //                 Order info
    //         //             </Heading>
    //         //             <Flex
    //         //                 variant="center"
    //         //                 css={`
    //         //                     &: hover {
    //         //                         cursor: pointer;
    //         //                     }
    //         //                     & > svg {
    //         //                         transform: scale(1)
    //         //                             rotate(
    //         //                                 ${viewOrderInfo ? '180deg' : '0deg'}
    //         //                             ) !important;
    //         //                     }
    //         //                 `}
    //         //                 onClick={() => setViewOrderInfo(!viewOrderInfo)}
    //         //             >
    //         //                 <Icon icon={arrowDownFill} />
    //         //             </Flex>
    //         //         </Flex>
    //         //         <CSSTransition
    //         //             in={viewOrderInfo}
    //         //             timeout={0}
    //         //             unmountOnExit={true}
    //         //         >
    //         //             <Box {...infoStyle}>
    //         //                 <Text variant="bodyMedium">
    //         //                     Order made on{' '}
    //         //                     <span style={spanStyle}>{getDate(date)}</span>.
    //         //                     Payment via{' '}
    //         //                     <span style={spanStyle}>
    //         //                         {via} - {channel}
    //         //                     </span>
    //         //                 </Text>
    //         //                 <Heading as="h5" variant="h5">
    //         //                     Products
    //         //                 </Heading>
    //         //                 <Box ml={[3, 3, 4]} my={[3, 3, 4]}>
    //         //                     {products.map(product => (
    //         //                         <React.Fragment key={product.pid}>
    //         //                             {renderProduct(product)}
    //         //                         </React.Fragment>
    //         //                     ))}
    //         //                 </Box>
    //         //                 <Text variant="bodyMedium">
    //         //                     Subtotal:{' '}
    //         //                     <span style={spanStyle}>
    //         //                         {currency}
    //         //                         {'  '}
    //         //                         {total}
    //         //                     </span>
    //         //                 </Text>
    //         //             </Box>
    //         //         </CSSTransition>

    //         //         {/* transaction infos. */}

    //         //         <Flex
    //         //             alignItems="center"
    //         //             justifyContent="space-between"
    //         //             {...headingStyle}
    //         //         >
    //         //             <Heading as="h4" variant="adminOrderBody">
    //         //                 Transaction Info
    //         //             </Heading>
    //         //             <Flex
    //         //                 variant="center"
    //         //                 css={`
    //         //                     &: hover {
    //         //                         cursor: pointer;
    //         //                     }
    //         //                     & > svg {
    //         //                         transform: scale(1)
    //         //                             rotate(
    //         //                                 ${viewTransactionInfo
    //         //                                     ? '180deg'
    //         //                                     : '0deg'}
    //         //                             ) !important;
    //         //                     }
    //         //                 `}
    //         //                 onClick={() =>
    //         //                     setViewTransactionInfo(!viewTransactionInfo)
    //         //                 }
    //         //             >
    //         //                 <Icon icon={arrowDownFill} />
    //         //             </Flex>
    //         //         </Flex>
    //         //         <CSSTransition
    //         //             in={viewTransactionInfo}
    //         //             timeout={0}
    //         //             unmountOnExit={true}
    //         //         >
    //         //             <Box {...infoStyle}>
    //         //                 <Text variant="bodyMedium">
    //         //                     Session ID:{' '}
    //         //                     <span style={spanStyle}>{sessionId}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Payment no:{' '}
    //         //                     <span style={spanStyle}>{paymentNo}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Payment name:{' '}
    //         //                     <span style={spanStyle}>{paymentName}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Expired on:{' '}
    //         //                     <span style={spanStyle}>{expired}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Fee: <span style={spanStyle}>{fee}</span>
    //         //                 </Text>
    //         //             </Box>
    //         //         </CSSTransition>

    //         //         {/* Ship-to infos. */}

    //         //         <Flex
    //         //             {...headingStyle}
    //         //             alignItems="center"
    //         //             justifyContent="space-between"
    //         //         >
    //         //             <Heading as="h4" variant="adminOrderBody">
    //         //                 Ship to
    //         //             </Heading>
    //         //             <Flex
    //         //                 variant="center"
    //         //                 css={`
    //         //                     &: hover {
    //         //                         cursor: pointer;
    //         //                     }
    //         //                     & > svg {
    //         //                         transform: scale(1)
    //         //                             rotate(
    //         //                                 ${viewShiptoInfo
    //         //                                     ? '180deg'
    //         //                                     : '0deg'}
    //         //                             ) !important;
    //         //                     }
    //         //                 `}
    //         //                 onClick={() => setViewShiptoInfo(!viewShiptoInfo)}
    //         //             >
    //         //                 <Icon icon={arrowDownFill} />
    //         //             </Flex>
    //         //         </Flex>
    //         //         <CSSTransition
    //         //             in={viewShiptoInfo}
    //         //             timeout={0}
    //         //             unmountOnExit={true}
    //         //         >
    //         //             <Box {...infoStyle}>
    //         //                 <Text variant="bodyMedium">
    //         //                     Address:{' '}
    //         //                     <span style={spanStyle}>{buyerAddr}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Postal code:{' '}
    //         //                     <span style={spanStyle}>{buyerPostal}</span>
    //         //                 </Text>
    //         //                 <Text variant="bodyMedium">
    //         //                     Shipping method:{' '}
    //         //                     <span style={spanStyle}>{shippingMethod}</span>
    //         //                 </Text>
    //         //             </Box>
    //         //         </CSSTransition>

    //         //         <Heading as="h4" variant="adminOrderBody" my={[4, 4, 5]}>
    //         //             Status: {delivered ? `Shipped ` : 'Not shipped'}{' '}
    //         //             <InlineIcon
    //         //                 icon={
    //         //                     delivered ? checkboxCircleFill : closeCircleLine
    //         //                 }
    //         //             />
    //         //         </Heading>
    //         //         {delivered && shippingData ? (
    //         //             <>
    //         //                 <Heading
    //         //                     as="h4"
    //         //                     variant="adminOrderBody"
    //         //                     {...headingStyle}
    //         //                 >
    //         //                     Shiping Informations
    //         //                 </Heading>
    //         //                 <Box data-testid="shipping-info">
    //         //                     {shippingData.shippingDate && (
    //         //                         <Text variant="bodyMedium">
    //         //                             Shipped date:{' '}
    //         //                             <span style={spanStyle}>
    //         //                                 {getDate(shippingData.shippingDate)}
    //         //                             </span>
    //         //                         </Text>
    //         //                     )}
    //         //                     <Text variant="bodyMedium">
    //         //                         Tracking number:{' '}
    //         //                         <span style={spanStyle}>
    //         //                             {shippingData.trackingNum}
    //         //                         </span>
    //         //                     </Text>
    //         //                     <Text variant="bodyMedium">
    //         //                         Shipped by:{' '}
    //         //                         <span style={spanStyle}>
    //         //                             {shippingData.shippedBy}
    //         //                         </span>
    //         //                     </Text>
    //         //                 </Box>
    //         //             </>
    //         //         ) : (
    //         //             <ShippingConfirmation
    //         //                 confirmShipping={confirmShipping}
    //         //             />
    //         //         )}
    //         //     </Box>
    //         // </Card>
    //     );
    // } else {
    //     return <></>;
    // }
};

export { OrderItem };
