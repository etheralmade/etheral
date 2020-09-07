import React from 'react';
import { Link } from '@reach/router';

import { Flex, Text } from 'rebass';
import { Icon } from '@iconify/react';
import user3Line from '@iconify/icons-ri/user-3-line';

type Props = {
    user: firebase.User | null;
    desktop: boolean;
};

const Account: React.FC<Props> = ({ user, desktop }) => {
    return (
        <Flex
            alignItems="center"
            mb={[4, 4, 0]}
            mr={[0, 0, 4]}
            css={`
                display: ${desktop ? 'none' : 'flex'} !important;

                @media screen and (min-width: 48em) {
                    display: ${!desktop ? 'none' : 'flex'} !important;
                }
            `}
        >
            <Icon className="icons" icon={user3Line} />
            <Link to={'auth'}>
                <Text
                    variant="link"
                    ml={[3]}
                    pl={[3]}
                    css={`
                        border-left: 1px solid black;
                    `}
                >
                    {user ? user.displayName : 'LOGIN'}
                </Text>
            </Link>
        </Flex>
    );
};

export { Account };
