import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { debounce } from 'lodash';

import { Box, Heading, Text, Button } from 'rebass';
import { Input, Label } from '@rebass/forms';

import { SignUpProps } from '../auth';
import Checkbox from 'components/checkbox';

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
    const methods = useForm<Inputs>();
    const { register, handleSubmit, getValues, errors } = methods;

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
        <FormProvider {...methods}>
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
                        <Text {...errorStyling}>
                            Please enter your password
                        </Text>
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

                    <Checkbox
                        name="signupNewsletter"
                        id="signup-newsletter"
                        text="Sign me up for the newsletter"
                    />
                </Box>

                <Button type="submit" mt={[5]} px={[9]} py={[4]}>
                    CREATE ACCOUNT
                </Button>
            </Box>
        </FormProvider>
    );
};

export { SignUp };
