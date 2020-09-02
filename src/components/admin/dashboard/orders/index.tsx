import React, { useEffect, useState } from 'react';
import firebase from 'gatsby-plugin-firebase';
import { set } from 'lodash';

import { Orders as OrdersEl } from './orders';
import { Order } from 'helper/schema/order';

type Props = {
    db: firebase.firestore.Firestore;
};

const Orders: React.FC<Props> = ({ db }) => {
    const [orders, setOrders] = useState<Order[] | undefined>(undefined);

    useEffect(() => {
        (async () => {
            // eslint-disable-next-line @typescript-eslint/tslint/config, immutable/no-let
            let ordersContainer: Order[] = [];
            const reqOrders = await db.collection('order').get();

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
        })();
    }, []);

    return orders ? <OrdersEl orders={orders} db={db} /> : <></>;
};

export default Orders;
