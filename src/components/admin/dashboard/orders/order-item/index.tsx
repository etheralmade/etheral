import React, { useEffect, useState } from 'react';
import { OrderItem as OrderItemEl } from './order-item';
import firebase from 'gatsby-plugin-firebase';

import { Order } from 'helper/schema/order';
import useAllProducts from 'helper/use-all-products';
import { Inputs } from './ship-confirm';

type Props = {
    order: Order;
};

const OrderItem: React.FC<Props> = ({ order }) => {
    const [db, setDb] = useState<firebase.firestore.Firestore | undefined>(
        undefined
    );

    const allProducts = useAllProducts();

    useEffect(() => {
        setDb(firebase.firestore());
    }, []);

    const updateShipping = (data: Inputs) => {
        if (db) {
            db.collection('order')
                .doc(order.oid)
                .update({
                    shippingData: {
                        ...data,
                        shippingDate: new Date(data.shippingDate),
                    },
                    delivered: true,
                });
        }
    };

    return db ? (
        <OrderItemEl
            order={order}
            allProducts={allProducts}
            updateShipping={updateShipping}
        />
    ) : (
        <></>
    );
};

export default OrderItem;
