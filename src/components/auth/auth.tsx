import React, { useState, useEffect } from 'react';
import { useNavigate } from '@reach/router';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { Flex, Box } from 'rebass';

import Login from './login';
import SignUp from './signup';
import useAllProducts from 'helper/use-all-products';
import { FirebaseUserData, InCart } from 'helper/schema/firebase-user';
import { setCart } from 'state/actions/cart';
import extractCartFirestore from 'helper/extract-cart-firestore';

import Modal from 'components/modal';
import { ResetPassword } from 'components/popups';

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
    // used to reset password .
    const [showPassResetModal, setShowPassResetModal] = useState(false);
    const [resetPassText, setResetPassText] = useState('');

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
            } finally {
                navigate('/');
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
                    const inCart = (await (userData.inCart as any)) as InCart[];
                    // const onWishlist = (await (userData.wishlist as any)) as InCart;

                    const filteredInCartData = await extractCartFirestore({
                        firestoreCartData: inCart,
                        allProducts,
                    });

                    await dispatch(
                        setCart({
                            cart: filteredInCartData,
                            wishlist: [],
                        })
                    );
                }
            } catch (e) {
                console.error(e);
            } finally {
                navigate('/');
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
                const url =
                    process.env.NODE_ENV === 'production'
                        ? '/.netlify/functions/subscribe-mailing-list'
                        : '/subscribe-mailing-list/';

                try {
                    await axios.post(`${url}?email=${email}`);
                } catch (e) {
                    console.error(e);
                }
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

    /**
     * Function to be called when user clicked on the forgot password button
     */
    const forgotPassword = () => {
        setShowPassResetModal(true);
    };

    const resetPassword = async (email: string) => {
        const SUCCESS_TEXT =
            '💡 Password reset email has been sent to your email address.';
        const FAIL_TEXT = 'Oops, something went wrong. Please try again later';

        try {
            await auth.sendPasswordResetEmail(email);
            await setResetPassText(SUCCESS_TEXT);
        } catch (e) {
            console.error(e);
            setResetPassText(FAIL_TEXT);
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
            {showPassResetModal && (
                <Modal center={true}>
                    <ResetPassword
                        text={resetPassText}
                        close={() => {
                            setShowPassResetModal(false);
                        }}
                        resetPassword={resetPassword}
                    />
                </Modal>
            )}
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
                    forgotPassword={forgotPassword}
                    firebaseError={
                        errTarget === ErrorTarget.LOGIN ? error : undefined
                    }
                />
            </Box>
        </Flex>
    );
};

export { Auth };
