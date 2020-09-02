import React from 'react';
import { storiesOf } from '@storybook/react';

import OrderItem from '.';
import { mockOrders } from '../orders.stories';
// import more addons

const story = storiesOf('Components.Admin.Dashboard.Orders.Order Item', module);

story.add('Component', () => <OrderItem order={mockOrders[0]} />);
