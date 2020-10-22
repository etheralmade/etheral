import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useDispatch } from 'react-redux';

import { Flex, Box, Button } from 'rebass';

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
    signupNewsletter: boolean;
};

// enum to show where the error occurs.
enum ErrorTarget {
    NONE,
    LOGIN,
    SIGN_UP,
}

const Auth: React.FC<Props> = ({
    auth,
    db,
    googleProvider,
    authPersistence,
}) => {
    const [uid, setUid] = useState('');
    const [isNewUser, setIsNewUser] = useState(false);

    // state to store errror msg.
    const [error, setError] = useState<firebase.auth.Error | undefined>(
        undefined
    );
    const [errTarget, setErrTarget] = useState<ErrorTarget>(ErrorTarget.NONE);

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
                    wishlist: [],
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
        // fetch items on cart and wishlist of the user => on login.
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
                    const onWishlist = (await (userData.wishlist as any)) as InCart;

                    const filteredInCartData = await extractCartFirestore({
                        firestoreCartData: inCart,
                        allProducts,
                    });
                    const filteredWishlistData = await extractCartFirestore({
                        firestoreCartData: onWishlist,
                        allProducts,
                    });

                    await dispatch(
                        setCart({
                            cart: filteredInCartData,
                            wishlist: filteredWishlistData,
                        })
                    );
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
            setErrTarget(ErrorTarget.LOGIN);
            setError(e);
        }
    };

    // create new user
    const signupWithEmail = async ({
        name,
        password,
        email,
        signupNewsletter,
    }: SignUpProps) => {
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

            if (await signupNewsletter) {
                // call cloud function to sign this acc to newsletter up
                console.log('Do signup newsletter here');
            }
        } catch (e) {
            setErrTarget(ErrorTarget.SIGN_UP);
            setError(e);
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
        <Flex
            width={['100%', '100%', '100%', '70%', '60%']}
            justifyContent="space-between"
            flexWrap="wrap"
            px={[4, 4, 6]}
            m="0 auto"
        >
            <Box width={['100%', '100%', '48%', '45%', '44%']} my={[5]}>
                <SignUp
                    signup={signupWithEmail}
                    firebaseError={
                        errTarget === ErrorTarget.SIGN_UP ? error : undefined
                    }
                />
            </Box>
            <Box
                width={['100%', '100%', '48%', '45%', '44%']}
                my={[5]}
                sx={{ textAlign: 'center' }}
            >
                <Login
                    login={loginWithEmail}
                    withGoogle={withGoogle}
                    firebaseError={
                        errTarget === ErrorTarget.LOGIN ? error : undefined
                    }
                />
            </Box>
        </Flex>
    );
};

export { Auth };
