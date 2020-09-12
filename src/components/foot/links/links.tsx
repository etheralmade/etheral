import React from 'react';
import { Link } from '@reach/router';

import { Flex, Box, Text, Heading } from 'rebass';

type Props = {};

const Links: React.FC<Props> = () => {
    const headingStyle = {
        mb: [4, 4],
        mt: [5, 5],
    };

    const boxStyle = {
        mr: [5, 4, 7, 9],
        css: `
            & a {
                text-decoration: none;
                div { max-width: 100px; }
            }

            & h4 {
                max-width: 100px;
            }

        `,
    };

    return (
        <Flex
            as="nav"
            flexDirection={'row'}
            flexWrap={['wrap', 'wrap', 'nowrap']}
            justifyContent={['space-between', 'space-between', 'flex-start']}
            px={[5, 5, 0]}
            mr={[0, 0, 5, 9, 10]}
        >
            {/* Left hand side links */}
            <Box className="footer-left" {...boxStyle}>
                <Heading as="h4" variant="linkActive" {...headingStyle}>
                    About
                </Heading>
                <Link to="/">
                    <Text variant="linkSmall">About</Text>
                </Link>
                <Link to="/">
                    <Text variant="linkSmall">Contacts</Text>
                </Link>
                <Link to="/">
                    <Text variant="linkSmall">Stocks?</Text>
                </Link>
            </Box>

            {/* Middle links */}
            <Box className="footer-middle" {...boxStyle}>
                <Heading as="h4" variant="linkActive" {...headingStyle}>
                    Customer Care
                </Heading>
                <Link to="/">
                    <Text variant="linkSmall">FAQ</Text>
                </Link>
                <Link to="/">
                    <Text variant="linkSmall">Something</Text>
                </Link>
                <Link to="/">
                    <Text variant="linkSmall">Terms and Conditions</Text>
                </Link>
            </Box>

            {/* Right side links */}
            <Box className="footer-right" {...boxStyle}>
                <Heading as="h4" variant="linkActive" {...headingStyle}>
                    Social Media
                </Heading>
                <a href="/">
                    <Text variant="linkSmall">Instagram</Text>
                </a>
                <a href="/">
                    <Text variant="linkSmall">Facebook</Text>
                </a>
            </Box>
        </Flex>
    );
};

export { Links };
