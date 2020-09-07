import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';
import { Flex } from 'rebass';
import shoppingCart2Line from '@iconify/icons-ri/shopping-cart-2-line';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Product } from 'helper/schema/product';
import { removeFromCart, setCart } from 'state/actions/cart';
import useAllProducts from 'helper/use-all-products';
import extractCartFirestore from 'helper/extract-cart-firestore';
import { InCart } from 'helper/schema/firebase-user';

export type Props = {
    user: firebase.User | null;
    db: firebase.firestore.Firestore;
};

const Cart: React.FC<Props & ICartState> = ({ cart, user, db }) => {
    const [cartSnapshot, setCartSnapshot] = useState(JSON.stringify(cart));
    const [isLoadingCart, setIsLoadingCart] = useState(false);

    const dispatch = useDispatch();
    const allProducts = useAllProducts();

    // check for new window -> if auth is provided -> load actual cart items!
    useEffect(() => {
        if (window !== undefined && user) {
            const value = loadSessionStorage();
            // new window -> fetch new items.
            if (!value) {
                // exactly the same function as auth.tsx -> fetchCartItems.
                (async () => {
                    try {
                        await setIsLoadingCart(true);
                        const docRef = await db
                            .collection('user')
                            .doc(user.uid)
                            .get();

                        const userData = await docRef.data();

                        if ((await docRef.exists) && userData) {
                            const inCart = (await (userData.inCart as any)) as InCart;

                            const filteredInCartData = await extractCartFirestore(
                                {
                                    firestoreCartData: inCart,
                                    allProducts,
                                }
                            );

                            await dispatch(setCart(filteredInCartData));
                        }
                        await saveSessionStorage();
                        await setIsLoadingCart(false);
                    } catch (e) {
                        console.error(e);
                    }
                })();
            }
        }
    }, []);

    useEffect(() => {
        // sync with firestore just if the user is authenticated.
        if (user) {
            if (JSON.stringify(cart) !== cartSnapshot) {
                setIsLoadingCart(true);
                db.collection('user')
                    .doc(user.uid)
                    .update({
                        inCart: cart.map(cartItem => ({
                            pid: cartItem.product.pid,
                            amount: cartItem.amount,
                        })),
                    })
                    .then(() => {
                        setCartSnapshot(JSON.stringify(cart));
                        setIsLoadingCart(false);
                    });
            }
        }
    }, [cart]);

    const loadSessionStorage = () => sessionStorage.getItem('isNewWindow');

    const saveSessionStorage = () =>
        sessionStorage.setItem('isNewWindow', 'true');

    // option to remove the product from cart.
    const handleRemove = (product: Product) => {
        dispatch(removeFromCart(product));
    };
    return (
        <Flex
            variant="center"
            css={`
                position: relative;
                & > svg {
                    height: 24px;
                    width: 24px;
                }
            `}
        >
            <Icon icon={shoppingCart2Line} />
        </Flex>
    );
};

export { Cart };
