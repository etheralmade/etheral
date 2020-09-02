import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { set } from 'lodash';

import { Orders as OrdersEl } from './orders';
import { Order } from 'helper/schema/order';

const Orders = () => {
    const [orders, setOrders] = useState<Order[] | undefined>(undefined);
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            const dbRef = firebase.firestore();
            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-let
            let ordersContainer: Order[] = [];
            const reqOrders = await dbRef.collection('order').get();

            await reqOrders.forEach(doc => {
                const orderData: Order = doc.data() as Order;
                set(
                    orderData,
                    'date',
                    new Date((orderData.date as any).seconds * 1000)
                );

                if (orderData.shippingData) {
                    set(
                        orderData,
                        'shippingData.shippingDate',
                        new Date(
                            (orderData.shippingData.shippingDate as any)
                                .seconds * 1000
                        )
                    );
                }

                ordersContainer = [...ordersContainer, orderData];
            });

            setOrders(await ordersContainer);
            setDb(dbRef);
        })();
    }, []);

    return orders ? <OrdersEl orders={orders} /> : <></>;
};

export default Orders;
