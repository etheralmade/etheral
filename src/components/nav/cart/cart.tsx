import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Icon } from '@iconify/react';
import { Flex } from 'rebass';
import closeLine from '@iconify/icons-ri/close-line';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { setCart } from 'state/actions/cart';
import useAllProducts from 'helper/use-all-products';
import extractCartFirestore from 'helper/extract-cart-firestore';
import { InCart } from 'helper/schema/firebase-user';
import CartBadge from './cart-badge';
import CartIcon from '../assets/cart';

export type Props = {
    user: firebase.User | null;
    db: firebase.firestore.Firestore;
    showCart: boolean;
    toggleShowCart: () => void;
};

const Cart: React.FC<Props & ICartState> = ({
    cart,
    wishlist,
    user,
    db,
    showCart,
    toggleShowCart,
}) => {
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
                fetchDatas();
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
                            note: cartItem.note,
                        })),
                    })
                    .then(() => {
                        setCartSnapshot(JSON.stringify(cart));
                        setIsLoadingCart(false);
                    });
            }
        }
    }, [cart]);

    // exactly the same function as auth.tsx -> fetchCartItems.
    // fetch items on cart and wishlist of the user => on new window and if logged in..
    const fetchDatas = async () => {
        try {
            await setIsLoadingCart(true);
            const docRef = await db
                .collection('user')
                .doc(user.uid)
                .get();

            const userData = await docRef.data();

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
            await saveSessionStorage();
            await setIsLoadingCart(false);
        } catch (e) {
            console.error(e);
        }
    };

    const loadSessionStorage = () => sessionStorage.getItem('isNewWindow');

    const saveSessionStorage = () =>
        sessionStorage.setItem('isNewWindow', 'true');

    console.log({ cart, wishlist });

    return (
        <>
            <Flex
                variant="center"
                css={`
                    position: relative;

                    &:hover {
                        cursor: pointer;
                    }
                `}
                onClick={toggleShowCart}
            >
                {showCart ? (
                    <Icon icon={closeLine} className="icons bigger" />
                ) : (
                    <CartIcon className="icons black-on-dropdown" />
                )}
                {cart.length > 0 && !showCart ? (
                    <CartBadge cart={cart} />
                ) : (
                    <></>
                )}
            </Flex>
        </>
    );
};

export { Cart };
