import { RESET } from '@storybook/addon-knobs';
import { DECREMENT, INCREMENT } from 'state/types/number';
import { Action } from '../reducers/number-reducer';

export const increment = (num?: number): Action => {
    const toRet: Action = {
        type: INCREMENT,
    };

    if (num) {
        return {
            ...toRet,
            payload: {
                num,
            },
        };
    } else {
        return toRet;
    }
};

export const decrement = (num?: number): Action => {
    const toRet: Action = {
        type: DECREMENT,
    };

    if (num) {
        return {
            ...toRet,
            payload: {
                num,
            },
        };
    } else {
        return toRet;
    }
};

export const reset = (): Action => ({
    type: RESET,
});
