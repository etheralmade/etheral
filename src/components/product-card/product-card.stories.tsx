import React from 'react';
import { storiesOf } from '@storybook/react';
// import more addons

import { ProductCard } from './product-card';
import { mockProduct1 } from 'helper/const';

const story = storiesOf('Components.Product card', module);

story.add('Component', () => <ProductCard product={mockProduct1} />);
