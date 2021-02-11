import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import post from "./post";

//TODO Purpose:
//TODO    1) To provide a single access point for accessing all of the application's reducer functions.

// How it works:
//    1) An export default function named combineReducers is called with an object containing alert,
// auth, profile, and post.

export default combineReducers({
  alert,
  auth,
  profile,
  post,
});
