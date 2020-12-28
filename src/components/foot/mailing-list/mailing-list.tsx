import React, { useState } from 'react';
import axios from 'axios';

import { Box, Flex, Text } from 'rebass';
import { Input } from '@rebass/forms';

// import local components

type Props = {};

const MailingList: React.FC<Props> = () => {
    const INVITE_TEXT =
        'Join mailing list to be the first to receive news bout our offers';
    const THANKYOU_TEXT =
        'Thank your for joining our mailing list. Your discount code would be sent via email';
    const ERROR_TEXT = 'Oops, something went wrong. Please try again later';

    const [email, setEmail] = useState('');
    const [text, setText] = useState(INVITE_TEXT);

    /**
     * Subscribe to mailing list function..
     */
    const subscribe = async (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();

        // call the serverless function
        const url =
            process.env.NODE_ENV === 'production'
                ? '/.netlify/functions/subscribe-mailing-list'
                : '/subscribe-mailing-list/';

        try {
            await axios.post(`${url}?email=${email}`);

            await setText(THANKYOU_TEXT);
            await setEmail('');
        } catch (e) {
            console.error(e);
            setText(ERROR_TEXT);
        }
    };

    return (
        <Box mb={[5, 5]}>
            {/* use mailchimp form here! */}
            <Box as="form" onSubmit={subscribe}>
                <Flex
                    flexDirection={['column', 'row']}
                    sx={{
                        "& > input[type='submit']": { border: 'none' },
                        '& >input[type=email]': {
                            py: [1],
                            textAlign: 'center',
                        },
                    }}
                >
                    <Input
                        name="mailing-list-email"
                        aria-labelledby="mailing-list-input"
                        type="email"
                        placeholder="Insert your email here"
                        variant="variants.textInput"
                        onChange={e => {
                            setEmail(e.target.value);
                        }}
                    />
                    <Input type="submit" variant="buttons.primary" />
                </Flex>
            </Box>
            <Text
                variant="productPrice"
                id="mailing-list-input"
                mt={[4]}
                textAlign="center"
                fontSize={[1]}
            >
                {text}
            </Text>
        </Box>
    );
};

export { MailingList };
