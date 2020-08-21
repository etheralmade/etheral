import { combineReducers } from 'redux';
import numberReducer from './number-reducer';

export default combineReducers({
    numReducer: numberReducer,
});
