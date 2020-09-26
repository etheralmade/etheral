import { findIndex, without } from 'lodash';

import { Product } from 'helper/schema/product';
import {
    ADD_TO_CART,
    REMOVE_FROM_CART,
    CLEAR_CART,
    SET_CART,
} from '../types/cart';
import { SetCartArgs } from 'state/actions/cart';

// user should be able to add multiple amount of the same items to the cart.
export interface Action {
    type: string;
    payload?: ActionPayload;
}

type ActionPayload = {
    product?: Product;
    amount?: number;
    cartItems?: { cart: SetCartArgs; wishlist: SetCartArgs };
    toWishlist?: boolean;
    fromWishlist?: boolean;
};

export interface ProductNote {
    size: string;
    gemSize?: string;
    gemType?: string;
}

const initialState: IState = {
    cart: [],
    wishlist: [],
};

type CartState = {
    product: Product;
    amount: number;
    note: { details: ProductNote; amount: number }[];
}[];

export type IState = {
    cart: CartState;
    wishlist: CartState;
};

const reducer = (state: IState = initialState, action: Action): IState => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART:
            if (payload && payload.product) {
                return addToCart(payload, state);
            } else {
                return state;
            }

        case REMOVE_FROM_CART:
            if (payload && payload.product) {
                return removeFromCart(payload, state);
            } else {
                return state;
            }
        case CLEAR_CART:
            return initialState;
        case SET_CART:
            if (payload && payload.cartItems) {
                const {
                    cartItems: { cart, wishlist },
                } = payload;
                return { cart, wishlist };
            } else {
                return state;
            }
        default:
            return state;
    }
};

/**
 * helper function to check if a product exists in the global state's cart and / or wishlist.
 * @param product product to find
 * @param state current state
 * @param wishlist value to determine where to find the product (either cart / wishlist.)
 */
const checkIfExist = (
    product: Product,
    state: IState,
    wishlist: boolean
): [number, boolean] => {
    if (wishlist) {
        const index = findIndex(
            state.wishlist,
            o => o.product.pid === product.pid
        );
        return [index, index !== -1];
    } else {
        const index = findIndex(state.cart, o => o.product.pid === product.pid);
        return [index, index !== -1];
    }
};

const addToCart = (payload: ActionPayload, state: IState): IState => {
    const { product, amount, toWishlist } = payload;
    // check if action is valid.
    if (product && amount !== undefined && toWishlist !== undefined) {
        const [index, doesExist] = checkIfExist(product, state, toWishlist);

        const productNote = product.orderNote || {
            size: '',
            gemSize: '',
            gemType: '',
        };

        if (doesExist) {
            const item = toWishlist ? state.wishlist[index] : state.cart[index]; // observed item..

            // find if the exact note as provided from action does exist within the observed item
            const noteIndex = findIndex(
                item.note,
                o =>
                    o.details.size === productNote.size &&
                    o.details.gemSize === productNote.gemSize &&
                    o.details.gemType === productNote.gemType
            );

            // add product to wishlist.
            if (toWishlist) {
                if (noteIndex !== -1) {
                    const note = item.note[noteIndex];
                    return {
                        ...state,
                        wishlist: [
                            ...without(state.wishlist, item),
                            {
                                ...item,
                                amount: item.amount + amount,
                                note: [
                                    ...without(item.note, note),
                                    {
                                        ...note,
                                        amount: note.amount + amount,
                                    },
                                ],
                            },
                        ],
                    };
                } else {
                    return {
                        ...state,
                        wishlist: [
                            ...without(state.wishlist, item),
                            {
                                ...item,
                                amount: item.amount + amount,
                                note: [
                                    ...item.note,
                                    { details: productNote, amount },
                                ],
                            },
                        ],
                    };
                }
                // add product to cart.
            } else {
                if (noteIndex !== -1) {
                    const note = item.note[noteIndex];
                    return {
                        ...state,
                        cart: [
                            ...without(state.cart, item),
                            {
                                ...item,
                                amount: item.amount + amount,
                                note: [
                                    ...without(item.note, note),
                                    {
                                        ...note,
                                        amount: note.amount + amount,
                                    },
                                ],
                            },
                        ],
                    };
                } else {
                    return {
                        ...state,
                        cart: [
                            ...without(state.cart, item),
                            {
                                ...item,
                                amount: item.amount + amount,
                                note: [
                                    ...item.note,
                                    { details: productNote, amount },
                                ],
                            },
                        ],
                    };
                }
            }
        } else {
            // simply add to the array if product doesn't exist.
            if (toWishlist) {
                return {
                    ...state,
                    wishlist: [
                        ...state.wishlist,
                        {
                            product,
                            amount,
                            note: [
                                {
                                    details: productNote,
                                    amount,
                                },
                            ],
                        },
                    ],
                };
            } else {
                return {
                    ...state,
                    cart: [
                        ...state.cart,
                        {
                            product,
                            amount,
                            note: [
                                {
                                    details: productNote,
                                    amount,
                                },
                            ],
                        },
                    ],
                };
            }
        }
    } else {
        return state;
    }
};

const removeFromCart = (payload: ActionPayload, state: IState): IState => {
    const { product, amount, fromWishlist } = payload;
    // check if action is valid.
    if (product && amount !== undefined && fromWishlist !== undefined) {
        const [index, doesExist] = checkIfExist(product, state, fromWishlist);

        const productNote = product.orderNote || {
            size: '',
            gemSize: '',
            gemType: '',
        };

        if (doesExist) {
            const item = fromWishlist
                ? state.wishlist[index]
                : state.cart[index]; // observed item..

            // find if the exact note as provided from action does exist within the observed item
            const noteIndex = findIndex(
                item.note,
                o =>
                    o.details.size === productNote.size &&
                    o.details.gemSize === productNote.gemSize &&
                    o.details.gemType === productNote.gemType
            );

            if (noteIndex === -1) {
                return state; // product details not provided => no product to be removed.
            }

            // add product to wishlist.
            if (fromWishlist) {
                if (item.amount === amount) {
                    return {
                        ...state,
                        wishlist: without(state.wishlist, item),
                    };
                } else {
                    const note = item.note[noteIndex];
                    //
                    return {
                        ...state,
                        wishlist: [
                            ...without(state.wishlist, item),
                            {
                                ...item,
                                amount: item.amount - amount,
                                note:
                                    amount === note.amount
                                        ? without(item.note, note)
                                        : [
                                              ...without(item.note, note),
                                              {
                                                  ...note,
                                                  amount: note.amount - amount,
                                              },
                                          ],
                            },
                        ],
                    };
                }
            } else {
                if (item.amount === amount) {
                    return {
                        ...state,
                        cart: without(state.cart, item),
                    };
                } else {
                    const note = item.note[noteIndex];
                    //
                    return {
                        ...state,
                        cart: [
                            ...without(state.cart, item),
                            {
                                ...item,
                                amount: item.amount - amount,
                                note:
                                    amount === note.amount
                                        ? without(item.note, note)
                                        : [
                                              ...without(item.note, note),
                                              {
                                                  ...note,
                                                  amount: note.amount - amount,
                                              },
                                          ],
                            },
                        ],
                    };
                }
            }
        } else {
            // no product to be removed.
            return state;
        }
    } else {
        return state;
    }
};

export default reducer;
