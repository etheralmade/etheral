import React from 'react';
import { storiesOf } from '@storybook/react';

import OrderItem from '.';
import { mockOrder, mockProducts, mockOrderShipped } from 'helper/const';
// import more addons

const story = storiesOf('Components.Admin.Dashboard.Orders.Order Item', module);

story
    .add('Not shipped order', () => (
        <OrderItem order={mockOrder} allProducts={mockProducts} />
    ))
    .add('Shipped order', () => (
        <OrderItem order={mockOrderShipped} allProducts={mockProducts} />
    ));
