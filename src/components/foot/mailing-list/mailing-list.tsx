import React from 'react';

import { Box, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

// import local components

type Props = {};

const MailingList: React.FC<Props> = () => {
    return (
        <Box mb={[5, 5]}>
            <Text variant="productName" id="mailing-list-input" mb={[4]}>
                Join mailing list to be the first to receive news bout our
                offers
            </Text>
            {/* use mailchimp form here! */}
            <Box as="form">
                <Flex
                    flexDirection={['column', 'row']}
                    css={`
                        & > input[type='email'] {
                            font-family: Syne, sans-serif;
                            margin-bottom: 8px;
                            background-color: #fff;

                            @media screen and (min-width: 27em) {
                                margin-bottom: 0;
                                margin-right: 8px;
                                padding: 8px;
                            }
                        }
                    `}
                >
                    <Input
                        name="mailing-list-email"
                        aria-labelledby="mailing-list-input"
                        type="email"
                        placeholder="Insert your email here"
                    />
                    <Input type="submit" variant="buttons.secondary" />
                </Flex>
            </Box>
        </Box>
    );
};

export { MailingList };
