import React from 'react';
import { useForm } from 'react-hook-form';
import { debounce } from 'lodash';

import { LoginProps } from '../auth';

type Props = {
    login: (args: LoginProps) => void;
};

type Inputs = {
    loginEmail: string;
    loginPassword: string;
};

const Login: React.FC<Props> = ({ login }) => {
    const { register, handleSubmit } = useForm();

    const debouncedLogin = debounce(login, 500);

    const submit = ({ loginEmail, loginPassword }: Inputs) => {
        debouncedLogin({
            email: loginEmail,
            password: loginPassword,
        });
    };

    return (
        <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="login-email">Email</label>
            <input
                name="loginEmail"
                id="login-email"
                type="email"
                ref={register}
            />
            <label htmlFor="login-password">Password</label>
            <input
                name="loginPassword"
                id="login-password"
                type="password"
                ref={register}
            />
            <input type="submit" value="Login" />
        </form>
    );
};

export { Login };
