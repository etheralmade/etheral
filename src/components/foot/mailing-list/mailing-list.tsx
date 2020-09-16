import React from 'react';

import { Box, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

// import local components

type Props = {};

const MailingList: React.FC<Props> = () => {
    return (
        <Box mb={[5, 5]}>
            {/* use mailchimp form here! */}
            <Box as="form">
                <Flex
                    flexDirection={['column', 'row']}
                    css={`
                        & > input {
                            border: none;

                            &[type='email'] {
                                font-family: Poppins, sans-serif;
                                margin-bottom: 8px;
                                background: none;
                                border-bottom: 4px solid #333;
                                font-size: 12px;

                                @media screen and (min-width: 27em) {
                                    margin-bottom: 0;
                                    margin-right: 8px;
                                    padding: 8px;
                                }

                                @media screen and (min-width: 48em) {
                                    padding: 8px 32px;
                                    font-size: 14px;
                                    width: calc(100% + 64px);
                                }
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
                    <Input type="submit" variant="buttons.primary" />
                </Flex>
            </Box>
            <Text
                variant="productPrice"
                id="mailing-list-input"
                mt={[4]}
                textAlign="center"
                fontSize={[0, 0, 1]}
            >
                Join mailing list to be the first to receive news bout our
                offers
            </Text>
        </Box>
    );
};

export { MailingList };
