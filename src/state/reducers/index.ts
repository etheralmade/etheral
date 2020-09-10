import { combineReducers } from 'redux';
import numberReducer from './number-reducer';
import productReducer from './products-reducer';
import cartReducer from './cart-reducer';
import currencyReducer from './currency-reducer';

export default combineReducers({
    numberReducer,
    productReducer,
    cartReducer,
    currencyReducer,
});
