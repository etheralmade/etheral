import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import more addons

import Navigation from '.';
import { StateViews } from '../dashboard';

const story = storiesOf('Components.Admin.Dashboard.Navigation', module);

story
    .add('Component with no active view', () => (
        <Navigation
            inView={StateViews.NONE}
            logout={action('log-out')}
            changeView={viewName => {
                action(`changing-view: ${viewName}`);
            }}
        />
    ))
    .add('Component with active view on orders', () => (
        <Navigation
            inView={StateViews.ORDERS}
            logout={action('log-out')}
            changeView={viewName => {
                action(`changing-view: ${viewName}`);
            }}
        />
    ));
