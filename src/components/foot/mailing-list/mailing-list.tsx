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
                    sx={{ "& > input[type='submit']": { border: 'none' } }}
                >
                    <Input
                        name="mailing-list-email"
                        aria-labelledby="mailing-list-input"
                        type="email"
                        placeholder="Insert your email here"
                        variant="variants.textInput"
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
