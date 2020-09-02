import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons

import { Orders } from './orders';
import { Order } from 'helper/schema/order';

const story = storiesOf('Components.Admin.Dashboard.Orders', module);

export const mockOrders: Order[] = [
    {
        oid: 'asdadwda',
        buyerName: 'Jane Doe',
        buyerEmail: 'jane@doe',
        buyerPhone: 123412412,
        buyerUId: 'admin',
        buyerAddr: 'Storkowerstrasse',
        buyerPostal: 1234143,
        total: 32000,
        currency: 'IDR',
        date: new Date(),
        via: 'va',
        channel: 'bni',
        products: [{ pid: '1234', amount: 12 }],
        paid: true,
        delivered: false,
        transactionData: {
            sessionId: '1234',
            paymentNo: '12',
            paymentName: 'Jane Doe - BNI',
            expired: '1231241412',
            fee: 3000,
        },
    },
];

story.add('Component', () => <Orders orders={mockOrders} />);
