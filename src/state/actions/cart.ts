import { Product } from 'helper/schema/product';
import { Action, ProductNote } from '../reducers/cart-reducer';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_CART,
    SET_SHOW_CART,
} from '../types/cart';

export const addToCart = (
    product: Product,
    toWishlist: boolean,
    amount?: number
): Action => ({
    type: ADD_TO_CART,
    payload: {
        product,
        amount,
        toWishlist,
    },
});

export const removeFromCart = (
    product: Product,
    fromWishlist: boolean,
    amount?: number
): Action => ({
    type: REMOVE_FROM_CART,
    payload: {
        product,
        amount,
        fromWishlist,
    },
});

export const clearCart = (): Action => ({
    type: CLEAR_CART,
});

export type SetCartArgs = {
    product: Product;
    amount: number;
    note: { details: ProductNote; amount: number }[];
}[];

export const setCart = (args: {
    cart: SetCartArgs;
    wishlist: SetCartArgs;
}): Action => ({
    type: SET_CART,
    payload: {
        cartItems: args,
    },
});

/**
 * function to show/hide cart by dispatching action to global state store.
 */
export const setShowCart = (): Action => ({
    type: SET_SHOW_CART,
});
