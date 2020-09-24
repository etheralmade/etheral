import { CHANGE_CURRENCY } from '../types/currency';

export enum Currencies {
    AUD = 'AUD',
    IDR = 'IDR',
}

export type Action = {
    type: typeof CHANGE_CURRENCY;
    payload: {
        currency: Currencies;
    };
};

export const initialState = {
    currency: Currencies.IDR,
};

export type IState = {
    currency: Currencies;
};

const reducer = (state: IState = initialState, action: Action): IState => {
    const { type } = action;
    if (type === CHANGE_CURRENCY) {
        const {
            payload: { currency },
        } = action;
        return {
            currency,
        };
    } else {
        return state;
    }
};

export default reducer;
