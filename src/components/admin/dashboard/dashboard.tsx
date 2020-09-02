import React, { useState } from 'react';
import { Flex, Box } from 'rebass';

import Orders from './orders';
import Navigation from './navigation';

type Props = {
    db: firebase.firestore.Firestore;
    logout: () => void;
};

export enum StateViews {
    ORDERS,
    ADMINS,
    LINKS,
    NONE,
}

const Dashboard: React.FC<Props> = ({ logout, db }) => {
    const [view, setView] = useState<StateViews>(StateViews.NONE);

    const changeView = (viewName: StateViews) => {
        setView(viewName);
    };

    // eslint-disable-next-line immutable/no-let, @typescript-eslint/tslint/config
    let toRender;
    switch (view) {
        case StateViews.ORDERS:
            toRender = <Orders db={db} />;
            break;
        case StateViews.ADMINS:
            toRender = <h1>Admins</h1>;
            break;
        case StateViews.LINKS:
            toRender = <h1>Links</h1>;
            break;
        case StateViews.NONE:
            toRender = <h1>None</h1>;
            break;
        default:
            toRender = <h1>None</h1>;
            break;
    }

    return (
        <Flex data-testid="dashboard" min-height="100vh">
            {/* Navigation */}
            <Box sx={{ position: 'sticky' }}>
                <Navigation
                    logout={logout}
                    changeView={changeView}
                    inView={view}
                />
            </Box>
            <Box width="100%">{toRender}</Box>
        </Flex>
    );
};

export { Dashboard };
