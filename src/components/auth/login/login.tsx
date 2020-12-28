import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { Box, Heading, Text, Button, Flex } from 'rebass';
import { Input, Label } from '@rebass/forms';
// import { InlineIcon } from '@iconify/react';
// import googleFill from '@iconify/icons-ri/google-fill';
import GoogleButton from './assets/google-button';

import { LoginProps } from '../auth';

type Props = {
    submitValue?: string;
    firebaseError?: firebase.auth.Error;
    login: (args: LoginProps) => void;
    withGoogle?: () => void;
    forgotPassword?: () => void;
};

type Inputs = {
    loginEmail: string;
    loginPassword: string;
};

const Login: React.FC<Props> = ({
    login,
    withGoogle,
    forgotPassword,
    submitValue,
    firebaseError,
}) => {
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const debouncedLogin = debounce(login, 500);

    const submit = ({ loginEmail, loginPassword }: Inputs) => {
        debouncedLogin({
            email: loginEmail,
            password: loginPassword,
        });
    };

    const textAlignAttr: 'left' | 'center' = 'left';

    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
        role: 'alert',
    };

    return (
        <Box
            as="form"
            onSubmit={handleSubmit(submit)}
            sx={{ textAlign: 'center' }}
        >
            <Heading as="h3" variant="formHeading" mb={[4]}>
                LOGIN
            </Heading>

            <Box mb={5}>
                <Label htmlFor="login-email" variant="text.formLabel">
                    EMAIL
                </Label>
                <Input
                    name="loginEmail"
                    id="login-email"
                    type="email"
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                    })}
                />

                {errors.loginEmail && (
                    <Text {...errorStyling}>
                        Please enter your email address!
                    </Text>
                )}
                {firebaseError &&
                firebaseError.code === 'auth/user-not-found' ? (
                    <Text {...errorStyling}>
                        User with this email address was not found
                    </Text>
                ) : null}

                <Label htmlFor="login-password" variant="text.formLabel">
                    PASSWORD
                </Label>
                <Input
                    name="loginPassword"
                    id="login-password"
                    type="password"
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                    })}
                />

                {errors.loginPassword && (
                    <Text {...errorStyling}>Please enter your password!</Text>
                )}
                {firebaseError &&
                firebaseError.code === 'auth/wrong-password' ? (
                    <Text {...errorStyling}>Wrong password</Text>
                ) : null}
            </Box>
            {window !== undefined && window.location.pathname !== '/admin' ? (
                <Text
                    role="button"
                    onClick={forgotPassword}
                    variant="text.formHeading"
                    fontSize={[10, 10, 10, 10]}
                    textAlign="left"
                    mb={[5]}
                    sx={{ cursor: 'pointer' }}
                >
                    FORGOT PASSWORD?
                </Text>
            ) : null}
            <Flex width="60%" flexDirection="column" m="0 auto">
                <Button type="submit" py={[4]}>
                    {submitValue || 'LOGIN'}
                </Button>
                {withGoogle && (
                    <Button
                        bg="#fff"
                        color="black.0"
                        py={[4]}
                        mt={4}
                        onClick={withGoogle}
                        sx={{
                            borderWidth: 2,
                            borderStyle: 'solid',
                            borderColor: 'black.0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            svg: {
                                height: [24, 24, 24],
                                mr: 4,
                            },
                        }}
                    >
                        <GoogleButton />
                        Sign in with google
                    </Button>
                )}
            </Flex>
        </Box>
    );
};

export { Login };
