import { Action } from 'state/reducers/products-reducer';
import { FETCH_PRODUCTS, STORE_PRODUCTS } from 'state/types/products';

export const fetchProducts = (): Action => ({
    type: FETCH_PRODUCTS,
});

export const storeProducts = (data?: any): Action => ({
    type: STORE_PRODUCTS,
    payload: {
        data,
    },
});
