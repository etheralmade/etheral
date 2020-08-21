import { DECREMENT, INCREMENT, RESET } from 'state/types/number';

export const initialState = {
    num: 0,
};

type IState = {
    num: number;
};

export interface Action {
    type: string;
    payload?: {
        num: number;
    };
}

const reducer = (state: IState = initialState, action: Action) => {
    const { type, payload } = action;

    switch (type) {
        case INCREMENT:
            if (payload) {
                return {
                    num: state.num + payload.num,
                };
            } else {
                return {
                    num: state.num + 1,
                };
            }
        case DECREMENT:
            if (payload) {
                return {
                    num: state.num - payload.num,
                };
            } else {
                return {
                    num: state.num - 1,
                };
            }
        case RESET:
            return {
                num: 0,
            };
        default:
            return state;
    }
};

export default reducer;
