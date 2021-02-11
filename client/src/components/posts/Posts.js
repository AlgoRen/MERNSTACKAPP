import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { getPosts } from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

//TODO Purpose:
//TODO    1) To display all posts posted by the applications users.
//TODO    2) To allow a user to access a form to add a post.

// How it works:
//    1) The Posts function takes in getPosts action and posts and loading state that is deconstructed
// off of the post object.
//?    2) The useEffect hook is called with an anonymous function that calls the getPosts action, the
//? useEffect hook has getPosts as a dependency.
//    3) The Posts function checks to see what the state of loading is. If the loading state is currently
// true it will return a fragment named Spinner. Else it will return a Fragment containing a h1, p,
// and a div tag. Along with the PostForm fragment.
//?    4) In the div tag a JSX function uses posts.map to map through the posts returning a fragment with
//? the name of PostItem with two props. A prop named key with the value of the post._id and a prop
//? named post with the value of the post state.
//    5) The getPosts action is defined as a required function in Posts.propTypes and the post state
// is defined as a required object.
//?    6) mapStateToProps defines the post state using state.post

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Posts</h1>
      <p className="lead">
        <i className="fas fa-user"> Welcome to the community!</i>
      </p>
      <PostForm />
      <div className="posts">
        {posts.map((post) => (
          <PostItem key={post._id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
