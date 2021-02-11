import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//TODO Purpose:
//TODO    1) To create the store object for state management. 
//TODO    2) To have the capability of using redux dev tools to monitor state behavior. 

// How it works:
//    1) Initializes the initialState constant with an empty object. 
//?    2) Initializes the middleware constant with an empty array.
//    3) Sets the store constant to a function called createStore that passes in the rootReduer function (this is
// the combineReducer function that is being exported in the index.js file reducers folder), initialState object,
// and composeWithDevTools function.
//?    4) The function composeWithDevTools function takes in the function applyMiddleware that then takes in the
//? entirety of the middleware array. 

// * Creating store with necessary middleware *
const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
