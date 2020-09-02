import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Dashboard from '.';
// import more addons

const story = storiesOf('Components.Admin.Dashboard', module);

story.add('Component', () => <Dashboard logout={action('logout')} />);
