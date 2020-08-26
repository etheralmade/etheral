import React, { useState, useEffect } from 'react';
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

const Auth: React.FC<Props> = ({ auth, db, googleProvider }) => {
    const [uid, setUid] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    // user login
    const loginWithEmail = async ({ password, email }: LoginProps) => {};

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
            <button onClick={withGoogle}>Sign in with google</button>
        </>
    );
};

export { Auth };
