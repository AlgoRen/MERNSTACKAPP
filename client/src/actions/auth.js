import axios from "axios";
import { setAlert } from "./alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "../utils/setAuthToken";

//TODO Purpose:
//TODO    1) To identify if a token is stored in localStorage, if true,
//TODO the token gets sent to setAuthToken. Sends a request to "/api/auth" to check the
//TODO token to determine if it is valid. If the request is successful "USER_LOADED"
//TODO state is updated. Else "AUTH_ERROR" state is dispatched.
//TODO    2) To create an action that registers a user by sending the appropiate data
//TODO to the back-end for account creation.
//TODO    3) To create an action that logins a user by sending the email and password
//TODO to the back-end for validation.
//TODO    4) To create an action that clears the approiate data from the application state
//TODO and logs the user out.

// How it works:
//    1) The loadUser function makes a GET request to "/api/auth" if successful it will dispatch "USER_LOADED"
// and send the returned data as a payload to be handeled by USER_LOADED reducer else dispatches AUTH_ERROR.
//?    2) The register function makes a POST request to "/api/users" with the config object and form data.
//? If request is successful then "REGISTER_SUCCESS" will be dispatched along with loadUser action.
//? Else user will be presented with an alert message displaying the error and "REGISTER_FAIL" will be dispatched.
//    3) For both register and login function a config object is created with the needed headers
// for making a post request to the back-end.
//?    4) The login function makes a POST request to "/api/auth" with the config object and form data.
//? If request is succesful then "LOGIN_SUCCESS" will be dispatched along with loadUser action.
//? Else user will be presented with an alert message displaying the error and "LOGIN_FAIL" will be dispatched.
//    5) The logout function dispatches "CLEARPROFILE" and "LOGOUT"

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // * Grabbing the user's profile from api/auth * //
    const res = await axios.get("/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, email, password });
  // Make a request to /api/users route and check to see what we get.
  try {
    const res = await axios.post("/api/users", body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });
  // Make a request to /api/users route and check to see what we get.
  try {
    const res = await axios.post("/api/auth", body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
