import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { OrderItem } from './order-item';
import { mockOrder, mockProducts, mockOrderShipped } from 'helper/const';
// import more addons

const story = storiesOf('Components.Admin.Dashboard.Orders.Order Item', module);

story
    .add('Not shipped order', () => (
        <OrderItem
            order={mockOrder}
            allProducts={mockProducts}
            updateShipping={action('update-shipping')}
        />
    ))
    .add('Shipped order', () => (
        <OrderItem
            order={mockOrderShipped}
            allProducts={mockProducts}
            updateShipping={action('update-shipping')}
        />
    ));
