import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";

//TODO Purpose:
//TODO    1) To allow users to see the individual posts including who it was posted by on the posts page.
//TODO    2) To allow users to like, dislike, and delete post if the post was made by that user.

// How it works:
//    1) The PostItem function takes in addLike, removeLike, and deletePost actions from the actions/post
// folder. The auth state and _id, text, name, avatar, user, likes, comments, date are deconstructed off
// of the post state and brought in as parameters. The showActions default prop is also brought into
// the PostItem function as a parameter.
//?    2) The PostItem function returns a div containing a Link fragment, a p tag with the text and date,
//? and a Fragment containing actions a user can do.
//    3) The Link fragment provides a link to the users profile by linking to `/profile/:user` where
// :user equals the value of user brought in from the deconstructed state of post.
//?    4) The text state is displayed in a p tag using JSX. The date state is displayed in a Moment fragment
//? with the format YYYY/MM/DD.
//    5) The showActions state is called in a JSX function if showActions is true it returns a Fragment
// (which it is as its currently set to true in this file, see PostItem.defaultProps).
//?    6) The Fragment contains a button with a onClick property that has the value of an anonymous function
//? calling the addLike function with _id as its parameter, an icon with a thumbs up symbol is displayed in a
//? i tag, and underneth that is a JSX function that checks to see if the likes array is longer than 0
//? if it is then it returns a span tag with the likes.length value.
//    7) The Fragment contains another button with a onClick property that has the value of an anonymous
// function calling the removeLike funciton with _id as its parameter, an icon with thumbs down symbol is
// displayed in a i tag.
//?    8) The Fragment contains a Link fragment that provides a link to that post's page by directing to
//? `posts/:_id where :_id is the _id value of that post. A JSX function checks to see if the comments
//? array length is greater than 0 and if true returns a span of containing the value of comments.length
//    9) Using JSX if auth.loading is false and user equals auth.user._id then a button tag is returned
// that has an onClick property that is assigned to an anonymous function, passing in e, and calling
// deletePost with _id as its parameters.
//?    10) The addLike, removeLike, and deletePost actions are defined as required functions in
//? PostItem.propTypes. The post and auth state are defined as required objects.

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions,
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{text}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{date}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <button
            onClick={(e) => addLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up"></i>{" "}
            {likes.length > 0 && <span>{likes.length}</span>}
          </button>
          <button
            onClick={(e) => removeLike(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down"></i>{" "}
          </button>
          <Link to={`post/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <button
              onClick={(e) => deletePost(_id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
