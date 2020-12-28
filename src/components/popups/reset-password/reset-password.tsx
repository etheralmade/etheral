import React, { useState } from 'react';
// import styling libs
import { Box, Heading, Button, Text } from 'rebass';
import { Input, Label } from '@rebass/forms';
// import local components

type Props = {
    /**
     * Text to be rendered within the component
     */
    text: string;
    /**
     * function to close the modal
     */
    close: () => void;
    /**
     * Function to reset the password for given email address
     */
    resetPassword: (email: string) => void;
};

/**
 * Popup component to be rendered inside a modal to reset user's password
 */
const ResetPassword: React.FC<Props> = ({ text, close, resetPassword }) => {
    const [email, setEmail] = useState('');
    const handleSubmit = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        resetPassword(email);
    };

    return (
        <Box
            onSubmit={handleSubmit}
            as="form"
            bg="#fff"
            p={[5]}
            width={['80vw', '70vw', '400px']}
        >
            <Heading>Reset Password</Heading>
            <Label htmlFor="reset-email" variant="text.formLabel">
                Email address
            </Label>
            <Input
                id="reset-email"
                type="email"
                variant="variants.authInput"
                onChange={e => setEmail(e.target.value)}
            />
            {text && (
                <Text
                    fontWeight="body"
                    fontFamily="body"
                    fontSize={1}
                    color="black.2"
                    mt={[4]}
                >
                    {text}
                </Text>
            )}
            <Button width="100%" my={4}>
                Reset my password
            </Button>
            <Text
                role="button"
                onClick={close}
                fontWeight="body"
                fontFamily="body"
                fontSize={[2]}
                color="black.0"
                textAlign="center"
                sx={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
                Go Back
            </Text>
        </Box>
    );
};

export { ResetPassword };
