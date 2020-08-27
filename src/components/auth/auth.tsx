import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useDispatch } from 'react-redux';

import Login from './login';
import SignUp from './signup';
import useAllProducts from 'helper/use-all-products';
import { FirebaseUserData, InCart } from 'helper/schema/firebase-user';
import { setCart } from 'state/actions/cart';
import extractCartFirestore from 'helper/extract-cart-firestore';

type Props = {
    auth: firebase.auth.Auth;
    db: firebase.firestore.Firestore;
    googleProvider: firebase.auth.GoogleAuthProvider;
    authPersistence: string;
};

export type LoginProps = {
    email: string;
    password: string;
};

export type SignUpProps = LoginProps & {
    name: string;
};

const Auth: React.FC<Props> = ({
    auth,
    db,
    googleProvider,
    authPersistence,
}) => {
    const [uid, setUid] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    const navigate = useNavigate();
    const allProducts = useAllProducts();
    const dispatch = useDispatch();

    // set auth persistence.
    useEffect(() => {
        auth.setPersistence(authPersistence);
    }, []);

    useEffect(() => {
        // call this function just if user is logged in!
        const currentUser = auth.currentUser;
        if (currentUser !== null) {
            (async () => {
                if (!uid) {
                    await setUid(currentUser.uid);
                }

                if (!isNewUser) {
                    await fetchCartItems(currentUser);
                } else {
                    await createNewUser(currentUser);
                }

                await navigate('/');
            })();
        }
    }, [uid]);

    const createNewUser = async (currentUser: firebase.User) => {
        if (currentUser !== null) {
            try {
                const userData: FirebaseUserData = {
                    name: currentUser.displayName
                        ? currentUser.displayName
                        : '',
                    email: currentUser.email ? currentUser.email : '',
                    inCart: [],
                    orders: [],
                };

                await db
                    .collection('user')
                    .doc(currentUser.uid)
                    .set(userData);
            } catch (e) {
                console.error(e);
            }
        }
    };

    const fetchCartItems = async (currentUser: firebase.User) => {
        if (currentUser) {
            try {
                const docRef = await db
                    .collection('user')
                    .doc(currentUser.uid)
                    .get();

                const userData = await docRef.data();

                // fetch and checks for all undefined object.
                if ((await docRef.exists) && userData) {
                    const inCart = (await (userData.inCart as any)) as InCart;

                    const filteredInCartData = await extractCartFirestore({
                        firestoreCartData: inCart,
                        allProducts,
                    });

                    await dispatch(setCart(filteredInCartData));
                }
            } catch (e) {
                console.error(e);
            }
        }
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
                if (signinReq.additionalUserInfo) {
                    await setIsNewUser(signinReq.additionalUserInfo.isNewUser);
                }
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
