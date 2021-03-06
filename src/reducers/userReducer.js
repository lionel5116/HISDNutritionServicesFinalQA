import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.userProps, action) {
    switch (action.type) {
        case types.LOAD_USER_SUCCESS:
            return action.userProps;        
        default:
            return state;
    }
}
