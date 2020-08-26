import React from 'react';
import Login from './login';
import SignUp from './signup';

type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    googleProvider: firebase.auth.GoogleAuthProvider;
};

export type LoginProps = {
    email: string;
    password: string;
};

export type SignUpProps = LoginProps & {
    name: string;
};

const Auth: React.FC<Props> = () => {
    // user login
    const loginWithEmail = ({ password, email }: LoginProps) => {
        console.log({ password, email });
    };

    // create new user
    const signupWithEmail = ({ name, password, email }: SignUpProps) => {
        console.log({ name, email, password });
    };

    // sign in/up with google
    const withGoogle = () => {
        return;
    };

    return (
        <>
            <Login login={loginWithEmail} />
            <SignUp signup={signupWithEmail} />
        </>
    );
};

export { Auth };
