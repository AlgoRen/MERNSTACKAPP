import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  DELETE_ACCOUNT,
  GET_REPOS,
  CLEAR_REPOS,
} from "./types";

// Purpose:
//    1) To handle all the application actions that will make a request to "/api/profile".
// The actions a user may trigger are getting current profile, getting all profiles,
// getting a profile by id, getting Github repos, creating a profile or updating it,
// adding experiences to profile, adding education to profile, deleting experiences from
// a profile, deleting education from a profile, and deleting the account.
//    2) To update the state of the application. All the states that are being updated
// in this file are found in reducers/profile.js
//    Note: If you have already went through actions/post.js you will see more or less
// the same description in the 'How it work' section, as the functions are very similiar in,
// structure just different variable names and routes being hit.

// How it works:
//    1) The getCurrentProfile function makes a GET request to "/api/profile/me". If successful it will
// dispatch "GET_PROFILE" and send the returned data found in res.data as a payload to be handled by the
// "GET_PROFILE" reducer else dispatches PROFILE_ERROR with the error status and error message returned by
// "/api/profile/me" as the payload.
//    2) The getProfiles function makes a GET request to "/api/profile". If successful it will dispatch
// "GET_PROFILES" and send the returned data found in res.data as a payload to be handled by the
// "GET_PROFILES" reducer else dispatches PROFILE_ERROR with the error status and error message returned by
// "/api/profile" as the payload.
//    3) The getProfileById function takes in a userId and makes a GET request to "/api/profile/user/:userId".
// If successful it will dispatch "GET_PROFILE" with res.data as a payload to be handled by the "GET_PROFILE"
// reducer. If unsuccessful it will dispatch "PROFILE_ERROR".
//    4) The getGithubRepos function takes in a username and makes a GET request to
// "/api/profile/github/:username". If successful it will dispatch "GET_REPOS with res.data as a payload
// to be handled by the "GET_REPOS" reducer. If unsuccessful and returned with a err.response.status of 404
// it will dispatch "CLEAR_REPOS, else it will dispatch "PROFILE_ERROR".
//    5) The createProfile function takes in an object named formData, history, edit parameter set to false as
// parameters. The edit parameter determines if the action being called is on being triggered by first time
// profile creation or the editing of an existing profile. The history parameter is react router object that
// allows for url modification. In the try catch a config object is created with the neccessary headers for
// making a POST request to "/api/profile" sending with it the config and formData objects. If successful
// it will dispatch "GET_PROFILE" with res.data as a payload to be handled by the "GET_PROFILE" reducer
// and then will dispatch a setAlert action with either "Profile Updated" or "Profile Created" depending on
// the truth value of the passed in edit parameter as its message. After alerts are sent an if statement
// will check to see if the edit parameter is set to the defaulted false, meaning the profile is being
// created for the first time and will move the user to the dashboard page via the history.push method.
// If try catch is unsuccessful it will store the error responses in a constant name errors and loop
// through each of the errors dispatching setAlert action with the corresponding error message.
// Finally, it will dispatch "PROFILE_ERROR".

// Get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Get's current user's profile from our backend that has token.
    const res = await axios.get("/api/profile/me");

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get all profiles
export const getProfiles = () => async (dispatch) => {
  try {
    // Get's current user's profile from our backend that has token.
    const res = await axios.get("/api/profile");

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get profile by ID
export const getProfileById = (userId) => async (dispatch) => {
  try {
    // Get's a user's profile from the user ID (not the profile ID.
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    // Get's users Github repos.
    const res = await axios.get(`/api/profile/github/${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.response.status);
    if (err.response.status === 404) {
      dispatch({
        type: CLEAR_REPOS,
      });
      return;
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile
//* Using the edit parameter to distinguish between a user creating a profile
//* versus a user who is updating a profile in order to know where to
//* redirect them on completion. Using history.push to send user to dashboard page.

export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.post("/api/profile", formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    // We have a css class of success that will be used for the styling of the alert.
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // We have a css class of danger that will be used for the styling of the alert.
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/experience", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    // We have a css class of success that will be used for the styling of the alert.
    dispatch(setAlert("Experience Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      // We have a css class of danger that will be used for the styling of the alert.
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await axios.put("/api/profile/education", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    // We have a css class of success that will be used for the styling of the alert.
    dispatch(setAlert("Education Added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // We have a css class of danger that will be used for the styling of the alert.
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Experience Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // We have a css class of danger that will be used for the styling of the alert.
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Education Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      // We have a css class of danger that will be used for the styling of the alert.
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete Account and Profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This can NOT Be undone!")) {
    try {
      await axios.delete(`/api/profile/`);
      // Deleting account and clearing profile out of state.
      dispatch({
        type: CLEAR_PROFILE,
      });
      dispatch({
        type: DELETE_ACCOUNT,
      });

      dispatch(setAlert("Your account has been permantly deleted..."));
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        // We have a css class of danger that will be used for the styling of the alert.
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
