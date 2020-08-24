import { Product } from 'helper/schema/product';
import { Action } from '../reducers/cart-reducer';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../types/cart';

export const addToCart = (product: Product, amount?: number): Action => ({
    type: ADD_TO_CART,
    payload: {
        product,
        amount,
    },
});

export const removeFromCart = (product: Product, amount?: number): Action => ({
    type: REMOVE_FROM_CART,
    payload: {
        product,
        amount,
    },
});

export const clearCart = (): Action => ({
    type: CLEAR_CART,
});
