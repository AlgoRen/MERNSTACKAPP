import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  DELETE_ACCOUNT,
} from "../actions/types";

// Purpose:
//    1) To handle auth related actions and return the appropriate state. 

// How it works:
//    1) The initialState is set to an object containing keys token, isAuthenticated, loading, user.
// The token key is set to the value that is found from calling getItem, passing in token, on the 
// localStorage object. The rest of the keys' values are set to null. 
//    2) An export default function is made that passes in state, that is given the value
// of intialState, and action as a parameter. 
//    3) The action parameter is deconstructed to type and payload. 
//    4) A switch case is called that checks type.
//    5) If the type that is passed into the switch case is equal to USER_LOADED then a 
// object containing the all of state array, isAuthenticated set to true, loading set to false,
// and user set to payload is returned.
//    6) If the type that is passed into the switch case is equal to REGISTER_SUCCESS or LOGIN_SUCCESS
// then the setItem method is called on the localStorage object and passes in the string token and the 
// constant of payload.token, respectively. Followed up by returning an object with the all of state 
// array, the all of payload array, isAuthenticated set to true, and loading set to false.  
//    7) If the type that is passed into the switch case is equal to REGISTER_FAIL, AUTH_ERROR,
// LOGIN_FAIL, LOGOUT, or DELETE_ACCOUNT then the removeItem method is called on the localStorage object 
// and passes in the string token. Followed up by returning an object with all of state array, token set
// to false, isAuthenticated set to false, and loading set to false.
//   8) If the type that is passed into the switch case is equal to any other condition then a
// default case is called that returns the state array. 

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  // Switch case for checking action type.
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    // Setting localStorage token from payload.
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      //* Setting the token to localStorage from the
      //* token object that was added to the payload object.
      //* This was done in the actions auth in the register function.
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    // Removing localStorage token and returning null token.
    // Setting isAuthenticated to false.
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case DELETE_ACCOUNT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}
