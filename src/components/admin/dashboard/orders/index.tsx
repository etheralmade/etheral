import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';

import { Orders as OrdersEl } from './orders';
import { Order } from 'helper/schema/order';

const Orders = () => {
    const [orders, setOrders] = useState<Order[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-let
            let ordersContainer: Order[] = [];
            const reqOrders = await firebase
                .firestore()
                .collection('order')
                .get();
            const rspOrders = await reqOrders.forEach(doc => {
                const orderData: Order = doc.data() as Order;
                ordersContainer = [...ordersContainer, orderData];
            });

            console.log(rspOrders);
        })();
    }, []);

    return orders ? <OrdersEl orders={orders} /> : <></>;
};

export default Orders;
