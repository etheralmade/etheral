import { Currencies, Action } from 'state/reducers/currency';
import { CHANGE_CURRENCY } from 'state/types/currency';

export const changeCurrency = (currency: Currencies): Action => ({
    type: CHANGE_CURRENCY,
    payload: {
        currency,
    },
});
