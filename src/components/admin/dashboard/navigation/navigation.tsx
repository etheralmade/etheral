import React from 'react';
import { Flex, Box, Button, Text } from 'rebass';

import { InlineIcon } from '@iconify/react';
import linksLine from '@iconify/icons-ri/links-line';
import fileList3Line from '@iconify/icons-ri/file-list-3-line';
import user3Line from '@iconify/icons-ri/user-3-line';
import logoutBoxLine from '@iconify/icons-ri/logout-box-line';
import earthLine from '@iconify/icons-ri/earth-line';

import { StateViews } from '../dashboard';
import Logo from 'components/logo';

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
            width={['100%', '100%', 'fit-content']}
        >
            <Flex
                id="logo"
                justifyContent="center"
                mt={[6]}
                mb={[8]}
                width="100%"
                css={`
                    display: none !important;
                    svg {
                        width: 150px;
                        path {
                            fill: #fff;
                        }
                    }

                    @media screen and (min-width: 48em) {
                        display: flex !important;
                    }
                `}
            >
                <Logo />
            </Flex>
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
            <Button
                variant={
                    inView === StateViews.SETTINGS
                        ? 'adminLinkActive'
                        : 'adminLink'
                }
                onClick={() => {
                    changeView(StateViews.SETTINGS);
                }}
            >
                <InlineIcon icon={earthLine} />
                <Text display={['none', 'none', 'unset']} as="span">
                    Settings
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
