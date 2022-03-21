import {combineReducers} from 'redux'
import redLogin from './redLogin';
import userReducer from './userReducer';

const allReducers = combineReducers({
    redLogin,
    userReducer
})
 
export default allReducers;