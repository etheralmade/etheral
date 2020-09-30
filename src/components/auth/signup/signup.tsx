import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { Box, Flex, Heading, Text, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';
import { Icon } from '@iconify/react';
import checkFill from '@iconify/icons-ri/check-fill';

import { SignUpProps } from '../auth';

type Props = {
    firebaseError?: firebase.auth.Error | undefined;
    signup: (args: SignUpProps) => void;
};

type Inputs = {
    signupFirstName: string;
    signupLastName: string;
    signupEmail: string;
    signupPassword: string;
    signupConfirmPassword: string;
    signupNewsletter: boolean;
};

const SignUp: React.FC<Props> = ({ firebaseError, signup }) => {
    const { register, handleSubmit, getValues, errors } = useForm<Inputs>();

    const debouncedSignup = debounce(signup, 500);

    const submit = ({
        signupEmail,
        signupFirstName,
        signupLastName,
        signupPassword,
        signupNewsletter,
    }: Inputs) => {
        const name = `${signupFirstName} ${signupLastName}`;

        debouncedSignup({
            name,
            password: signupPassword,
            email: signupEmail,
            signupNewsletter,
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
                NEW ACCOUNT
            </Heading>

            <Box>
                <Label variant="text.formLabel" htmlFor="signup-first-name">
                    FIRST NAME
                </Label>
                <Input
                    id="signup-first-name"
                    name="signupFirstName"
                    type="text"
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                    })}
                />
                {errors.signupFirstName && (
                    <Text {...errorStyling}>Please enter your name</Text>
                )}

                <Label variant="text.formLabel" htmlFor="signup-last-name">
                    LAST NAME
                </Label>
                <Input
                    id="signup-last-name"
                    name="signupLastName"
                    type="text"
                    variant="variants.authInput"
                    ref={register}
                />

                <Label variant="text.formLabel" htmlFor="signup-email">
                    EMAIL
                </Label>
                <Input
                    name="signupEmail"
                    id="signup-email"
                    type="email"
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                    })}
                />
                {errors.signupEmail && (
                    <Text {...errorStyling}>Please enter your email</Text>
                )}
                {firebaseError &&
                firebaseError.code === 'auth/email-already-in-use' ? (
                    <Text {...errorStyling}>{firebaseError.message}</Text>
                ) : null}

                <Label variant="text.formLabel" htmlFor="signup-password">
                    PASSWORD
                </Label>
                <Input
                    name="signupPassword"
                    id="signup-password"
                    type="password"
                    variant="variants.authInput"
                    ref={register({
                        required: true,
                    })}
                />
                {errors.signupPassword && (
                    <Text {...errorStyling}>Please enter your password</Text>
                )}
                {firebaseError &&
                firebaseError.code === 'auth/weak-password' ? (
                    <Text {...errorStyling}>{firebaseError.message}</Text>
                ) : null}

                <Label
                    variant="text.formLabel"
                    htmlFor="signup-confirm-password"
                >
                    CONFIRM PASSWORD
                </Label>
                <Input
                    name="signupConfirmPassword"
                    id="signup-confirm-password"
                    type="password"
                    variant="variants.authInput"
                    ref={register({
                        validate: value =>
                            value === getValues('signupPassword'),
                    })}
                />
                {errors.signupConfirmPassword && (
                    <Text {...errorStyling}>
                        Your passwords don&apos;t match
                    </Text>
                )}

                <Input
                    name="signupNewsletter"
                    id="signup-newsletter"
                    type="checkbox"
                    ref={register}
                    sx={{
                        display: 'none',
                        '& + label #newsletter-checkbox': {
                            height: 16,
                            width: 16,
                            mr: [3],
                            borderWidth: 1,
                            borderStyle: 'solid',
                            borderColor: 'black.0',
                            transition: '0.2s',
                        },
                        '&:checked + label #newsletter-checkbox': {
                            bg: 'black.0',
                            svg: {
                                height: '80%',
                                width: '80%',
                            },
                        },
                    }}
                />
                <Label
                    htmlFor="signup-newsletter"
                    variant="text.formLabel"
                    sx={{ display: 'flex', alignItems: 'cneter' }}
                >
                    <Flex variant="center" id="newsletter-checkbox">
                        <Icon icon={checkFill} color="#fff" />
                    </Flex>
                    Sign me up for the newsletter
                </Label>
            </Box>

            <Button type="submit" mt={[5]} px={[9]} py={[4]}>
                CREATE ACCOUNT
            </Button>
        </Box>
    );
};

export { SignUp };
