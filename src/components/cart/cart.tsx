import React from 'react';
import { useDispatch } from 'react-redux';

import { IState as ICartState } from 'state/reducers/cart-reducer';
import { Product } from 'helper/schema/product';
import { removeFromCart } from 'state/actions/cart';

export type Props = {};

const Cart: React.FC<Props & ICartState> = ({ cart }) => {
    const dispatch = useDispatch();

    const handleRemove = (product: Product) => {
        dispatch(removeFromCart(product));
    };

    return (
        <>
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
