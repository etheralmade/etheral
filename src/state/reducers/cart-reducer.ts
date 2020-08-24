import { Product } from 'helper/schema/product';
import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from '../types/cart';

export interface Action {
    type: string;
    payload?: {
        product: Product;
    };
}

const initialState = {
    products: [],
};

export type IState = {
    products: Product[];
};

const reducer = (state: IState = initialState, action: Action): IState => {
    const { type, payload } = action;
    switch (type) {
        case ADD_TO_CART:
            if (payload) {
                return {
                    products: [...state.products, payload.product],
                };
            } else {
                return state;
            }

        case REMOVE_FROM_CART:
            if (payload) {
                return {
                    products: state.products.filter(
                        product => product.pid !== payload?.product.pid
                    ),
                };
            } else {
                return state;
            }
        case CLEAR_CART:
            return {
                products: [],
            };
        default:
            return state;
    }
};

export default reducer;
