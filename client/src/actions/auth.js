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

// Purpose: 1) To identify a user based on the setAuthToken to decide if user's
// profile content should be loaded or if an error should occur where they are asked
// to register or login. 2) To create an action that registers a user by sending the appropiate
// data to the back-end for account creation. 3) To create an action that logins a user by sending
// the email and password to the back-end for validation. 4) To create an action that clears
// the approiate data from the application state and logs the user out.

// How it works: 1) Makes a request to "/api/auth" if successful it will dispatch "USER_LOADED"
// and send the returned data as a payload to be stored in auth state else dispatches AUTH_ERROR.
// 2) Makes a request to "/api/users" with the necessary header and form data.
// If request is successful then "REGISTER_SUCCESS" will be dispatched along with loadUser action.
// Else user will be an alert message displaying the error and "REGISTER_FAIL" will be dispatched.
// 3) An config object is created with the needed headers for making a post request to the back-end.
// The form data that was sent over is stored in JSON object called body and a post request is sent to
// "/api/auth" with the config object and the body JSON object.

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
    console.log("/api/users res.data: ", res.data);
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
    console.log("/api/auth res.data: ", res.data);
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
