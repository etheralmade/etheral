import { combineReducers } from 'redux';
import numberReducer from './number-reducer';
import productReducer from './products-reducer';

export default combineReducers({
    numberReducer,
    productReducer,
});
