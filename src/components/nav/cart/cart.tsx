import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Product } from 'helper/schema/product';
import { removeFromCart } from 'state/actions/cart';

export type Props = {
    user: firebase.User | null;
    db: firebase.firestore.Firestore;
};

const Cart: React.FC<Props & ICartState> = ({ cart, user, db }) => {
    const [cartSnapshot, setCartSnapshot] = useState(JSON.stringify(cart));

    const dispatch = useDispatch();

    useEffect(() => {
        // sync with firestore just if the user is authenticated.
        if (user) {
            if (JSON.stringify(cart) !== cartSnapshot) {
                db.collection('user')
                    .doc(user.uid)
                    .update({
                        inCart: cart.map(cartItem => ({
                            pid: cartItem.product.pid,
                            amount: cartItem.amount,
                        })),
                    });
            }
        }
    }, [cart]);

    // option to remove the product from cart.
    const handleRemove = (product: Product) => {
        dispatch(removeFromCart(product));
    };

    // display all products on cart.
    return (
        <div style={{ width: '100%' }}>
            <h1>Cart. Products: </h1>
            {cart.length < 1 && <h2>No products in cart </h2>}
            {cart.map(cartItem => (
                <React.Fragment key={cartItem.product.name}>
                    <h2>{cartItem.product.name}</h2>
                    <h4>
                        {cartItem.amount}{' '}
                        <button
                            onClick={() => {
                                handleRemove(cartItem.product);
                            }}
                        >
                            Remove all
                        </button>
                    </h4>
                </React.Fragment>
            ))}
        </div>
    );
};

export { Cart };
