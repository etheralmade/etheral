import React from 'react';
import { OrderItem as OrderItemEl } from './order-item';

import { Order } from 'helper/schema/order';
import useAllProducts from 'helper/use-all-products';
import { Inputs } from './ship-confirm';

type Props = {
    order: Order;
    db: firebase.firestore.Firestore;
};

const OrderItem: React.FC<Props> = ({ order, db }) => {
    const allProducts = useAllProducts();

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
