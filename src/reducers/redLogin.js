import initialState from './initialState';


export default function redLogin(state = initialState.login,action) {
  console.log(action.type);
  console.log(action.environment);
  switch(action.type) {
     case 'LOGIN_DATA':
     return {
         ...state,
         userName:action.userName ,
         password: action.password,
         environment: action.environment
       };
       default:
        return state;
   }
}
