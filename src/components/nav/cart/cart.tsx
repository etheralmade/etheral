import React from 'react';
import { useDispatch } from 'react-redux';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Product } from 'helper/schema/product';
import { removeFromCart } from 'state/actions/cart';

export type Props = {
    user: firebase.User | null;
    db: firebase.firestore.Firestore;
};

const Cart: React.FC<Props & ICartState> = ({ cart, user, db }) => {
    const dispatch = useDispatch();

    // option to remove the product from cart.
    const handleRemove = (product: Product) => {
        dispatch(removeFromCart(product));
    };

    // display all products on cart.
    return (
        <>
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
        </>
    );
};

export { Cart };
