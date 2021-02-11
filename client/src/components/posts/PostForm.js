import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";

//TODO Purpose:
//TODO    1) To allow a user to have the ability to create a post that will be displayed on the posts page.

// How it works:
//    1) The PostForm function takes in addPost, a function from the actions/post file.
//?    2) The PostForm function uses useState to create a constant named text and sets it to
//? an empty string. A setText function is also created off of useState.
//    3) The PostForm function returns a div that contains a h3, form, textarea, and input tag.
//?    4) The form tag has an onSubmit property that has an anonymous function as its value. The anonymous
//? function takes in e (the event object) as a parameter. e.prevent.Default is called, addPost is called
//? with a object, containing the constant text, as its parameter.
//    5) The textarea tag has an onChange property that has an anonymous function as its value. The anonymous
// function takes in e. Then the setText function is called with e.target.value as its param that updates the
// state of text.
//?    6) The addPost action is defined in PostForm.propTypes as a required function.

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        className="form my-1"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
