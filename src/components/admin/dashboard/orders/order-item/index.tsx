import React, { useState, useEffect } from 'react';
import { OrderItem as OrderItemEl } from './order-item';

import { Text, Flex } from 'rebass';
import { Icon } from '@iconify/react';
import arrowLeftLine from '@iconify/icons-ri/arrow-left-line';

import { Order } from 'helper/schema/order';
import useAllProducts from 'helper/use-all-products';
import { Inputs } from './ship-confirm';

type Props = {
    order: Order;
    db: firebase.firestore.Firestore;
    goBack: () => void;
};

const OrderItem: React.FC<Props> = ({ order, db, goBack }) => {
    const [doRerender, setDoRerender] = useState(false);
    const allProducts = useAllProducts();

    useEffect(() => {
        setDoRerender(false);
    }, [doRerender]);

    const updateShipping = async (data: Inputs) => {
        if (db) {
            const dbRef = await db.collection('order').doc(order.oid);

            await dbRef.update({
                shippingData: {
                    ...data,
                    shippingDate: new Date(data.shippingDate),
                },
                delivered: true,
            });

            await setDoRerender(true);
        }
    };

    return db && !doRerender ? (
        <>
            <Flex
                onClick={goBack}
                alignItems="center"
                sx={{
                    '&:hover': {
                        cursor: 'pointer',
                    },
                }}
            >
                <Icon icon={arrowLeftLine} />
                <Text fontFamily="body" ml={2}>
                    GO BACK
                </Text>
            </Flex>
            <OrderItemEl
                order={order}
                allProducts={allProducts}
                updateShipping={updateShipping}
            />
        </>
    ) : (
        <></>
    );
};

export default OrderItem;
