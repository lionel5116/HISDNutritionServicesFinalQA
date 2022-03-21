import * as types from './actionTypes';
import SharedApi from '../api/sharedApi';


export const increment = () => {
    return {
      type: "INCREMENT",
    };
  };
  
  export const decrement = () => {
    return {
      type: "DECREMENT",
    };
  };
  
  export const reset = () => {
    return {
      type: "RESET",
    };
  };

export function loadUserSuccess(userProps) {
    return { type: types.LOAD_USER_SUCCESS, userProps };
}

export function loadUser() {
    return function (dispatch) {
      return SharedApi.getUserProperties().then(userProps => {
        dispatch(loadUserSuccess(userProps));
        if(userProps.user.role == 'Admin')
            return;
        else if(userProps.user.role == 'Principal')
            return;
        else if(userProps.user.role == 'Campus')
            return;
        else if(userProps.user.role == 'Report')
            return;
    }).catch(error => {
        throw (error);
    });
  };
}