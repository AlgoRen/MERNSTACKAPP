import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

//TODO Purpose:
//TODO    1) To create a form for a user to leave a comment on a post.

// How it works:
//    1) The CommentForm function takes in postId and addComment as parameters.
//?    2) The CommentForm function uses useState to create a constant named text and sets it to
//? an empty string. A setText function is also created off of useState.
//    3) The CommentForm function returns a div that has a h3 tag asking the user to Leave a comment...,
// a form tag with a textarea and input tag inside.
//?    4) The form tag has an onSubmit property that is assigned to an anonymous function that passes in e
//? (the event) as a parameter. e.preventDefault is called. An action called addComment with postId and a
//? object containing the text constant, that is from the useState hook, is passed in as parameters.
//? The addComment action is called with the parameters executing from the "actions/post" file. The setText
//? hook is called with empty strings to reset the state of the text constant.
//    5) The textarea tag has name, cols, rows, placeholder, onChange, and required properties. The onChange
// property is assigned to an anonymous function that passes in e as a parameter. the setText function is
// called with e.target.value passed in as a parameter.
//?    6) The input tag has type and value properties assigned to submit and Submit, respectively.
//    7) The addComment action is defined in CommentForm.propTypes as a required function.

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Leave a comment...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText("");
        }}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          onChange={(e) => setText(e.target.value)}
          required
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
