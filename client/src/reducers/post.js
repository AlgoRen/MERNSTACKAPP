import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "../actions/types";

//TODO Purpose:
//TODO    1) To handle post related actions and return the appropriate state. 

// How it works:
//    1) The initialState is set to an object containing keys: posts that is set to an empty array, post that is
// set to null, loading that is set to true, and error that is set to an empty object. An export default function 
// is made that passes in state, that is given the value of initialState, and action as a parameter. 
//?    2) The action parameter is deconstructed to type and payload. A switch case is called that checks type.
//    3) If the type that is passed into the switch case is equal to GET_POSTS then an object containing the entirety 
// of the state array, posts set to the payload constant and loading set to false is returned. If the type that 
// is passed into the switch case is equal to GET_POST then a object containing the entirety of the state array, 
// post set to the payload constant, and loading set to false is returned. 
//?    4) If the type that is passed into the switch case is equal to DELETE_POST, then an object containing the
//? entirety of the state array is returned. The object is also returned with post that is set to the result of the 
//? filter method that is called on state.posts passing in a single instance, post, and returns the values where 
//? post._id does NOT equal the payload constant. Lastly, setting loading to false within the returned object.
//    5) If the type that is passed into the switch case is equal to ADD_POST, then an object containing the entirety
// of the state array is returned. The object is also returned with post that is set to an array containing
// payload and the entirety of state.posts, respectively. Lastly, setting loading to false within the returned object. 
//?    6) If the type that is passed into the switch case is equal to POST_ERROR, then an object containing the entirety
//? of the state array is returned, error is set to payload, and loading is set to false.
//    7) If the type that is passed into the switch case is equal to UPDATE_LIKES then, an object containing the
// entirety of state array is returned. The object is also returned with posts that is set to the result of the map
// method that is being called on state.posts. The map method called on state.posts is returning an object that
// contains everything in the post state and likes that is set to payload.likes, respectively, if the single 
// instance, post, has a post._id value that is equal to the payload.postId value, or else just post is returned. 
// Lastly, the object is returned with loading set to false. 
//?    8) If the type that is passed into the switch case is equal to ADD_COMMENT, then an object containing the
//? entirety of state array is returned. The object is also returned with posts that is set to an object containing
//? entirety of state.post array and comment that is set to payload. Lastly, the object is returned with loading set
//? to false.
//    9) If the type that is passed into the switch case is equal to REMOVE_COMMENT, then an object containg the
// entirety of state array is returned. The object is also returned with post that is set to an object that contains
// entirety of state.post and comments that is set to the result of the filter method that is being called on 
// state.post.comments. The filter method that is called on state.post.comments passing in a single instance, 
// comments, and returns the values where comment._id does NOT equal the payload constant. Lastly, setting 
// loading to false within the returned object.
//?    10) If the type that is passed into the switch case is equal to any other condition, then a
//? default case is called that returns the state array. 

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        //** Going through all posts and returning all posts that do not have an id
        //** that matches the payload which holds the id of the post to be deleted.
        posts: state.posts.filter((post) => post._id !== payload),
        loading: false,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts], // Getting the current post state array and adding our payload.
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case UPDATE_LIKES:
      return {
        ...state,
        // Mapping through the posts, selecting the post that matches the post._id provided by the payload,
        // then we are returning a new state with all of the post data and manipulating the likes count
        // by updating the likes with the return likes from the payload.
        // If it doesnt match the id we are just returning the post as is.
        posts: state.posts.map((post) =>
          post._id === payload.postId ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false,
      };
    case DELETE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            (comment) => comment._id !== payload
          ),
        },
        loading: false,
      };
    default:
      return state;
  }
}
