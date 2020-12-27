import React, { useState } from 'react';
import { Flex, Box } from 'rebass';

import Orders from './orders';
import Links from './links';
import Navigation from './navigation';
import Settings from './settings';
import Admins from './admins';

type Props = {
    db: firebase.firestore.Firestore;
    adminEmail: string;
    logout: () => void;
};

export enum StateViews {
    ORDERS,
    ADMINS,
    LINKS,
    SETTINGS,
    NONE,
}

const Dashboard: React.FC<Props> = ({ logout, db, adminEmail }) => {
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
            toRender = <Admins db={db} adminEmail={adminEmail} />;
            break;
        case StateViews.LINKS:
            toRender = <Links />;
            break;
        case StateViews.SETTINGS:
            toRender = <Settings />;
            break;
        case StateViews.NONE:
            toRender = <h1>None</h1>;
            break;
        default:
            toRender = <h1>None</h1>;
            break;
    }

    return (
        <Flex
            data-testid="dashboard"
            minHeight="100vh"
            bg="#333"
            flexDirection={['column-reverse', 'column-reverse', 'row']}
            justifyContent="space-between"
            css={`
                box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.125);
            `}
        >
            {/* Navigation */}
            <Box width={['100%', '100%', 'fit-content']}>
                <Navigation
                    logout={logout}
                    changeView={changeView}
                    inView={view}
                />
            </Box>
            <Box
                width="100%"
                height={['80vh', '80vh', '100vh']}
                flex={1}
                p={[5, 5, 7]}
                bg="white.1"
                sx={{ overflow: 'hidden' }}
            >
                {toRender}
            </Box>
        </Flex>
    );
};

export { Dashboard };
