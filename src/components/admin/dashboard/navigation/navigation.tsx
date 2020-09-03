import React from 'react';
import { Flex, Box, Button, Text } from 'rebass';
import { InlineIcon } from '@iconify/react';
import linksLine from '@iconify/icons-ri/links-line';
import fileList3Line from '@iconify/icons-ri/file-list-3-line';
import user3Line from '@iconify/icons-ri/user-3-line';
import logoutBoxLine from '@iconify/icons-ri/logout-box-line';

import { StateViews } from '../dashboard';
import { theme } from 'styles';

type Props = {
    inView: StateViews;
    logout: () => void;
    changeView: (viewname: StateViews) => void;
};

const Navigation: React.FC<Props> = ({ inView, logout, changeView }) => {
    return (
        <Flex
            flexDirection={['row', 'row', 'column']}
            alignItems="flex-start"
            height={['fit-content', 'fit-content', '100vh']}
            // px={[0, 0, 4]}
            width={['100%', '100%', 'fit-content']}
        >
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
                <Text display={['none', 'none', 'unset']} as="span">
                    Orders
                </Text>
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
                <Text display={['none', 'none', 'unset']} as="span">
                    Links
                </Text>
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
                <Text display={['none', 'none', 'unset']} as="span">
                    Admin
                </Text>
            </Button>
            <Box my="auto" />
            <Button variant={'adminLink'} onClick={logout}>
                <InlineIcon icon={logoutBoxLine} />
                <Text display={['none', 'none', 'unset']} as="span">
                    Log out
                </Text>
            </Button>
        </Flex>
    );
};

export { Navigation };
