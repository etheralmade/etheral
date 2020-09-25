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
    payload?: {
        product?: Product;
        amount?: number;
        cartItems?: SetCartArgs;
    };
}

export interface ProductNote {
    size: string;
    gemSize?: string;
    gemType?: string;
}

const initialState: IState = {
    cart: [],
};

export type IState = {
    cart: {
        product: Product;
        amount: number;
        note: { details: ProductNote; amount: number }[];
    }[];
};

const reducer = (state: IState = initialState, action: Action): IState => {
    const checkIfExist = (product: Product): [number, boolean] => {
        const index = findIndex(state.cart, o => o.product.pid === product.pid);
        return [index, index !== -1];
    };

    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART:
            if (payload && payload.product) {
                const { product, amount } = payload;

                const [index, doesExist] = checkIfExist(product);

                const productNote = product.orderNote || {
                    size: '',
                    gemSize: '',
                    gemType: '',
                };

                const toAdd = amount ? amount : 1;
                // handle if product does exist...
                if (doesExist) {
                    const item = state.cart[index];

                    const noteIndex = findIndex(
                        item.note,
                        o =>
                            o.details.size === productNote.size &&
                            o.details.gemSize === productNote.gemSize &&
                            o.details.gemType === productNote.gemType
                    );

                    if (noteIndex !== -1) {
                        const note = item.note[noteIndex];

                        return {
                            cart: [
                                ...without(state.cart, item),
                                {
                                    ...item,
                                    amount: item.amount + toAdd,
                                    note: [
                                        ...without(item.note, note),
                                        {
                                            ...note,
                                            amount: note.amount + toAdd,
                                        },
                                    ],
                                },
                            ],
                        };
                    }
                } else {
                    // simply add to the array if product doesn't exist.
                    return {
                        cart: [
                            ...state.cart,
                            {
                                product,
                                amount: toAdd,
                                note: [{ details: productNote, amount: toAdd }],
                            },
                        ],
                    };
                }
            } else {
                return state;
            }
            break;

        case REMOVE_FROM_CART:
            if (payload && payload.product) {
                const { product, amount } = payload;
                const [index, doesExist] = checkIfExist(product);

                if (doesExist) {
                    const item = state.cart[index];
                    const toRemove = amount ? amount : item.amount;

                    const productNote = product.orderNote || {
                        size: '',
                        gemSize: '',
                        gemType: '',
                    };

                    const noteIndex = findIndex(
                        item.note,
                        o =>
                            o.details.size === productNote.size &&
                            o.details.gemSize === productNote.gemSize &&
                            o.details.gemType === productNote.gemType
                    );

                    if (noteIndex === -1) {
                        return state;
                    }

                    // simply remove if the amount to be removed is same to the amount in cart
                    if (item.amount === toRemove) {
                        return {
                            cart: without(state.cart, item),
                        };
                    } else {
                        const note = item.note[noteIndex];
                        //
                        return {
                            cart: [
                                ...without(state.cart, item),
                                {
                                    ...item,
                                    amount: item.amount - toRemove,
                                    note:
                                        toRemove === note.amount
                                            ? without(item.note, note)
                                            : [
                                                  ...without(item.note, note),
                                                  {
                                                      ...note,
                                                      amount:
                                                          note.amount -
                                                          toRemove,
                                                  },
                                              ],
                                },
                            ],
                        };
                    }
                } else {
                    // do nothing if product doesn't exist.
                    return state;
                }
            } else {
                return state;
            }
        case CLEAR_CART:
            return initialState;
        case SET_CART:
            if (payload && payload.cartItems) {
                const { cartItems } = payload;
                return { cart: cartItems };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default reducer;
