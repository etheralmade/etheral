import React from 'react';
import { Flex, Box, Button } from 'rebass';
import { InlineIcon } from '@iconify/react';
import linksLine from '@iconify/icons-ri/links-line';
import fileList3Line from '@iconify/icons-ri/file-list-3-line';
import user3Line from '@iconify/icons-ri/user-3-line';
import logoutBoxLine from '@iconify/icons-ri/logout-box-line';

import { StateViews } from '../dashboard';

type Props = {
    inView: StateViews;
    logout: () => void;
    changeView: (viewname: StateViews) => void;
};

const Navigation: React.FC<Props> = ({ inView, logout, changeView }) => {
    return (
        <Flex flexDirection="column" alignItems="flex-start" height="100vh">
            <Button
                variant={
                    inView === StateViews.ORDERS
                        ? 'adminLinkActive'
                        : 'adminLink'
                }
                onClick={() => {
                    changeView(StateViews.ORDERS);
                }}
            >
                <InlineIcon icon={fileList3Line} />
                Orders
            </Button>
            <Button
                variant={
                    inView === StateViews.LINKS
                        ? 'adminLinkActive'
                        : 'adminLink'
                }
                onClick={() => {
                    changeView(StateViews.LINKS);
                }}
            >
                <InlineIcon icon={linksLine} />
                Links
            </Button>
            <Button
                variant={
                    inView === StateViews.ADMINS
                        ? 'adminLinkActive'
                        : 'adminLink'
                }
                onClick={() => {
                    changeView(StateViews.ADMINS);
                }}
            >
                <InlineIcon icon={user3Line} />
                Admin users
            </Button>
            <Box my="auto" />
            <Button variant={'adminLink'} onClick={logout}>
                <InlineIcon icon={logoutBoxLine} />
                Log out
            </Button>
        </Flex>
    );
};

export { Navigation };
