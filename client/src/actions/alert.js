import { v4 as uuid } from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "./types";

// Purpose: To send a custom alert message.

// How it work: The action is called by passing in a msg
// and alert type that can be used to custom the styling.
// Note: A list of the alert styles can be found or added in App.js
// Note: timeout is set at 5 seconds by default, but timeout can be made custom
// by passing in timeout into the setTimeout function.

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuid.v4;
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
