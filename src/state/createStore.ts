import { composeWithDevTools } from 'redux-devtools-extension';
import { load, save } from 'redux-localstorage-simple';
import { createStore, applyMiddleware } from 'redux';
// import persistState from 'redux-sessionstorage';
import rootReducer from './reducers';
import { IState as ICartState } from './reducers/cart-reducer';
import { IState as ICurrencyState } from './reducers/currency-reducer';

export interface State {
    numberReducer: any;
    productReducer: any;
    cartReducer: ICartState;
    currencyReducer: ICurrencyState;
}

const getLoadedState = (preloadedState: any) => {
    if (typeof window !== 'undefined') {
        return {
            ...preloadedState,
            ...load({ namespace: 'etheral_states', namespaceSeparator: '::' }),
        };
    }

    return {
        ...preloadedState,
    };
};

export default (preloadedState: State) => {
    return createStore(
        rootReducer,
        getLoadedState(preloadedState),
        composeWithDevTools(
            applyMiddleware(
                save({
                    namespace: 'etheral_states',
                    debounce: 800,
                    namespaceSeparator: '::',
                    // ignoreStates: ['cartReducer'],
                })
            )
        )
    );
};
