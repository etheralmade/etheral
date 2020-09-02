import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons

import { Orders } from './orders';
import { mockOrders } from 'helper/const';

const story = storiesOf('Components.Admin.Dashboard.Orders', module);

story.add('Component', () => <Orders orders={mockOrders} />);
