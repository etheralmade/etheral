import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { SignUpProps } from '../auth';

type Props = {
    signup: (args: SignUpProps) => void;
};

type Inputs = {
    signupName: string;
    signupEmail: string;
    signupPassword: string;
};

const SignUp: React.FC<Props> = ({ signup }) => {
    const { register, handleSubmit } = useForm<Inputs>();

    const debouncedSignup = debounce(signup, 500);

    const submit = ({ signupEmail, signupName, signupPassword }: Inputs) => {
        debouncedSignup({
            name: signupName,
            password: signupPassword,
            email: signupEmail,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="signup-name">Name</label>
            <input
                name="signupName"
                id="signup-name"
                type="text"
                ref={register}
            />
            <label htmlFor="login-email">Email</label>
            <input
                name="signupEmail"
                id="login-email"
                type="email"
                ref={register}
            />
            <label htmlFor="login-password">Password</label>
            <input
                name="signupPassword"
                id="login-password"
                type="password"
                ref={register}
            />
            <input type="submit" value="Login" />
        </form>
    );
};

export { SignUp };
