import axios from "axios";
import { format } from "prettier";
import { setAlert } from "./alert";
import {
  ADD_POST,
  DELETE_POST,
  GET_POSTS,
  GET_POST,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_COMMENT,
  DELETE_COMMENT,
} from "./types";

//TODO Purpose:
//TODO    1) To handle all the application actions that will make a request to "/api/posts".
//TODO The actions that a user may trigger are getting all posts, adding a like, removing a like,
//TODO deleting a post, adding a post, getting a single post, adding a comment, and deleting a comment.
//TODO    2) To update the state of the application, if you arent already aware, we are using Redux.
//TODO All the states that are being updated in this file are found in reducers/post.js.

// How it works:
//    1) The getPosts function makes a GET request to "/api/posts". If successful it will dispatch
// "GET_POSTS" and send the returned data found in res.data as a payload to be handled by the
// "GET_POSTS" reducer else dispatches POST_ERROR with the error status and error message returned by
// "/api/posts" as the payload.
//?    2) The addLike function takes in a postId and makes a PUT request to "/api/posts/like/:postId"
//? where :postId equals the passed in postId value. If successful it will dispatch "UPDATE_LIKES"
//? and send the returned data found in res.data as a likes array and the postId as a payload to be
//? handled by the "UPDATE_LIKES" reducer else dispatches POST_ERROR.
//    3) The removeLike function takes in a postId and makes a PUT request to "/api/posts/unlike/:postId".
// If successful it will dispatch "UPDATE_LIKES" and send the likes array and postId as a payload to be
// handled by the "UPDATE_LIKES" reducer else dispatches POST_ERROR.
//?    4) The deletePost function takes in a postId and makes a DELETE request to "/api/posts/:postId".
//? If successful it will dispatch "DELETE_POST" with postId as a payload to be handled by the
//? "DELETE_POST" reducer and then will dispatch a setAlert action with "Post Removed" as its message.
//? If unsuccessful it will dispatch "POST_ERROR" with msg and status as its payload.
//    5) The addPost function takes in an object named formData and creates a config object
// with the neccessary headers for making a POST request to "/api/posts" sending with it the
// config and formData objects. If successful it will dispatch "ADD_POST" with res.data as a payload
// to be handled by the "ADD_POST" reducer and then will dispatch a setAlert action with "Post Added"
// as its message. If unsuccessful it will dispatch "POST_ERROR".
//?    6) The getPost function (for single post) takes in a id and makes a GET request to "/api/posts/:id".
//? If successful it will dispatch "GET_POST" with res.data as a payload to be handled by the "GET_POST"
//? reducer. If unsuccessful it will dispatch "POST_ERROR".
//    7) The addComment function takes in a postId and an object named formData. Creates a config object
// with the necessary headers for making a POST request to "/api/posts/comment/:postId/" sending with it
// the config and formData objects. If successful it will dispatch "ADD_COMMENT" with res.data as a payload
// to be handled by the "ADD_COMMENT" reducer and then will dispatch a setAlert action with "Comment Added"
// as its message. If unsuccessful it will dispatch "POST_ERROR".
//?    8) The deleteComment function takes in a postId and a commentId, and makes a DELETE request to
//? "/api/posts/comment/:postId/:commentId". If successful it will dispatch "DELETE_COMMENT" with commentId
//? as a payload to be handled by the "DELETE_COMMENT" reducer and then will dispatch a setAlert action
//? with "Comment Removed" as its message. If unsuccessful it will dispatch "POST_ERROR".

// Get posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add like
export const addLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }, // Sending the post id along with the returned array of likes
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Remove like
export const removeLike = (postId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/unlike/${postId}`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data }, // Sending the post id along with the returned array of likes
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete post
export const deletePost = (postId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);

    dispatch({
      type: DELETE_POST,
      payload: postId,
    });

    dispatch(setAlert("Post Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(`/api/posts`, formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get post
export const getPost = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);

    dispatch({
      type: DELETE_COMMENT,
      payload: commentId,
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
