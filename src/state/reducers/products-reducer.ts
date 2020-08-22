import { FETCH_PRODUCTS, STORE_PRODUCTS } from 'state/types/products';

type IState = {
    data: any;
    fetching: boolean;
};

export interface Action {
    type: string;
    payload?: any;
}

export const initialState: IState = {
    data: {},
    fetching: false,
};

const reducer = (state: IState = initialState, action: Action): IState => {
    const { type, payload } = action;

    switch (type) {
        case FETCH_PRODUCTS:
            return {
                ...state,
                fetching: true,
            };
        case STORE_PRODUCTS:
            if (payload) {
                return {
                    data: payload.data,
                    fetching: false,
                };
            } else {
                return state;
            }
        default:
            return state;
    }
};

export default reducer;
