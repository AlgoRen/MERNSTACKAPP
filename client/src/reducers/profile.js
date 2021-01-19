import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES,
  GET_REPOS,
  CLEAR_REPOS,
} from "../actions/types";

// Purpose:
//    1) To handle profile related actions and return the appropriate state. 

// How it works:
//    1) The initialState is set to an object containing keys: profile that is set to null, 
// profiles and repos that is set to empty arrays, loading that is set to true, and error that is set to an 
// empty object. An export default function is made that passes in state, that is given the value of initialState,
// and action as a parameter. 
//    2) The action parameter is deconstructed to type and payload. A switch case is called that checks type.
//    3) If the type that is passed into the switch case is equal to GET_PROFILE or UPDATE_PROFILE, then an object 
// containing the entirety of the state array, profile set to the payload constant, and loading set to false is returned. 
// If the type that is passed into the switch case is equal to GET_PROFILES, then an object containing the entirety of the 
// state array, profiles set to the payload constant, and loading set to false is returned. 
//    4) If the type that is passed into the switch case is equal to PROFILE_ERROR, then an object containing the entirety
// of the state array, error set to payload, loading set to false, and profile set to null is returned.
//    5) If the type that is passed into the switch case is equal to CLEAR_PROFILE, then an object containing the entirety
// of the state array, profile is set to null, repos is set to an empty array, and loading set to false is returned.
// If the type that is passed into the switch case is equal to CLEAR_REPOS, then an object containing the entirety of the
// state array, repos is set to an empty array, and loading set to false is returned.
//    6) If the type that is passed into the switch case is equal to GET_REPOS, then an object containing the entirety
// of the state array, repos is set to the payload constant, and loading set to false is returned.
//    7) If the type that is passed into the switch case is equal to any other condition, then a default case is called 
// that returns the state array. 


const initialState = {
  profile: null, // Loaded user profile
  profiles: [], // For profile listing page
  repos: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        repos: [],
        loading: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    case CLEAR_REPOS:
      return {
        ...state,
        repos: null,
        loading: false,
      };
    default: {
      return state;
    }
  }
}
