import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";
import CommentForm from "../post/CommentForm";
import CommentItem from "../post/CommentItem";
import { getPost } from "../../actions/post";
import { Link } from "react-router-dom";

//TODO Purpose:
//TODO    1) To display an individual page for posts that consist of the post, comment form, and all
//TODO comments left under the post.

// How it works:
//    1) The Post function takes in getPost and match, along with post and loading that is deconstructed
// off of the post object.
//?    2) The Post function uses useEffect to call an anonymous function that executes the getPost function
//? with match.params.id as a parameter. getPost is the dependency of useEffect.
//    3) The Post function returns the Spinner fragment, brought in from layout, if loading or post is equal
// to null. Else a Fragment with a Link to posts, PostItem, CommentForm, and CommentItem fragments is returned.
//?    4) The Link tag displays a button that once clicked brings user to /posts, where they can see every post.
//    5) The PostItem fragment displays the individual post by setting a prop named post to the post state.
// A showActions props is set to the value of false in order for us to reuse to PostItem fragment that is
// created in the posts folder, but without having actions such as like, dislike, and delete, be displayed.
//?    6) The CommentForm fragment displays the commentForm passing in a prop named postId with the value
//? post._id that we get from the post state.
//    7) In a div called comments there is a map function attached to the array of post.comments. The map
// function takes in comment for its individual instance and returns the CommentItem fragment using a key with
// the value of comment._id, a prop with the name comment has the value of comment, and a prop with the name
// postId has the value of post._id
//?    8) getPost and post are defined in Post.propTypes. getPost is defined as a required function. The post
//? state is defined as a required object.
//    9) mapStateToProps defines the post state using state.post

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />;
      <CommentForm postId={post._id} />
      <div className="comments">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPost })(Post);
