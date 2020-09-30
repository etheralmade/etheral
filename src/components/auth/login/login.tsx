import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { Box, Heading, Text, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';

import { LoginProps } from '../auth';

type Props = {
    submitValue?: string;
    firebaseError?: firebase.auth.Error;
    login: (args: LoginProps) => void;
};

type Inputs = {
    loginEmail: string;
    loginPassword: string;
};

const Login: React.FC<Props> = ({ login, submitValue, firebaseError }) => {
    const { register, handleSubmit, errors } = useForm<Inputs>();

    const debouncedLogin = debounce(login, 500);

    const submit = ({ loginEmail, loginPassword }: Inputs) => {
        console.log({ loginEmail, loginPassword });

        debouncedLogin({
            email: loginEmail,
            password: loginPassword,
        });
    };

    const forgotPassword = () => {
        console.log('Forgot password');
    };

    const textAlignAttr: 'left' | 'center' = 'left';

    const errorStyling = {
        variant: 'formError',
        textAlign: textAlignAttr,
        mt: [3],
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

            <Box>
                <Label htmlFor="login-email" variant="text.formLabel">
                    EMAIL
                </Label>
                <Input
                    name="loginEmail"
                    id="login-email"
                    type="email"
                    placeholder="EMAIL ADDRESS"
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
                    placeholder="PASSWORD"
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
            <Text
                role="button"
                onClick={forgotPassword}
                variant="text.formHeading"
                fontSize={[10]}
                textAlign="left"
                my={[5]}
            >
                FORGOT PASSWORD?
            </Text>
            <Button type="submit" px={[9]} py={[4]}>
                {submitValue || 'LOGIN'}
            </Button>
        </Box>
    );
};

export { Login };
