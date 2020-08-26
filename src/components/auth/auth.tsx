import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';

import Login from './login';
import SignUp from './signup';
import useAllProducts from 'helper/use-all-products';

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

    const navigate = useNavigate();
    const allProducts = useAllProducts();

    useEffect(() => {
        // call this function just if user is logged in!
        if (auth.currentUser) {
            (async () => {
                if (!isNewUser) {
                    await fetchCartItems();
                } else {
                    await createNewUser();
                }

                await navigate('/');
            })();
        }
    }, [uid]);

    const createNewUser = async () => {
        console.log('create new user');
    };

    const fetchCartItems = async () => {
        console.log('fetching cart item');
    };

    // user login
    const loginWithEmail = async ({ password, email }: LoginProps) => {
        try {
            const loginReq = await auth.signInWithEmailAndPassword(
                email,
                password
            );
            const { user } = await loginReq;

            if (user !== null) {
                setUid(user.uid);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // create new user
    const signupWithEmail = async ({ name, password, email }: SignUpProps) => {
        try {
            const signupReq = await auth.createUserWithEmailAndPassword(
                email,
                password
            );

            const { user } = await signupReq;

            if (user !== null) {
                await user.updateProfile({
                    displayName: name,
                });
                await setIsNewUser(true);
                await setUid(user.uid);
            }
        } catch (e) {
            console.error(e);
        }
    };

    // sign in/up with google
    const withGoogle = async () => {
        try {
            const signinReq = await auth.signInWithPopup(googleProvider);

            const { user } = await signinReq;

            if (user !== null) {
                await setIsNewUser(signinReq.additionalUserInfo?.isNewUser);
                await setUid(user.uid);
            }
        } catch (e) {
            console.error(e);
        }
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
