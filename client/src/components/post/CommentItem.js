import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/post";

// Purpose:
//    1) To display individual comments with each item having the user who posted it with the following data:
// the link to the user's profile, name, avatar, date it was posted, and the text they entered.
//    2) To allow each individual comment to be deleted if it belongs to the logged in user.

// How it works:
//    1) The CommentItem function takes in postId. Also takes in _id, text, name, avatar, user, and date,
// that is deconstructed off of the comment parameter. Along with the auth state and deleteComment action.
//    2) The CommentItem function returns a div that contains a div that has the user's profile information
// and a div that contains the comment information.
//    3) The div that contains the user's profile information is surrounded in a react-router-dom Link tag
// that is directed to `profile/:user` where user is the value that references that user's profile. An image
// of the user is displayed from 'avatar' and along with the name in a h4 tag using JSX.
//    4) The div that contains the comment information displays the text using the 'text' parameter via JSX.
//    5) The Moment fragment is used to display 'date' witht he format YYYY/MM/DD
//    6) Using JSX if auth.loading is false and user equals auth.user._id then a componenet is returned containing
// a button tag that has an onClick property that is assigned to an anonymous function, passing in e, and calling
// deleteComment with postId and _id as its parameters.
//    7) postId, comment, auth, and deleteComment are defined in CommentItem.propTypes. postId is defined as
// a required string, comment and auth is defined as a required object, and deleteComment is defined as a required
// function.
//    8) mapStateToProps defines the auth state using state.auth

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
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
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={(e) => deleteComment(postId, _id)}
          type="button"
          className="btn btn-danger"
        >
          <i className="fas fa-times"></i>
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
