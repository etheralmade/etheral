import React from 'react';
import { Link } from '@reach/router';

import { Flex, Text } from 'rebass';

import { theme } from 'styles';

type Props = {};

const Links: React.FC<Props> = () => {
    return (
        <Flex
            as="nav"
            flexDirection={['row']}
            justifyContent={['space-between', 'space-between', 'center']}
            alignItems="center"
            py={[4, 4, 5]}
            width="100%"
            sx={{
                '& > a': {
                    textDecoration: 'none',
                    color: theme.colors.black[0],
                    px: [0, 0, 5],
                },
            }}
        >
            <Link to="/contact">
                <Text variant="linkSmall" width="fit-content">
                    CONTACT US
                </Text>
            </Link>
            <Link to="/">
                <Text variant="linkSmall" width="fit-content">
                    FAQ
                </Text>
            </Link>
            <Link to="/">
                <Text variant="linkSmall" width="fit-content">
                    SIZE GUIDE
                </Text>
            </Link>
        </Flex>
    );
};

export { Links };
