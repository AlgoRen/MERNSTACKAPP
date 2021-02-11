import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addEducation } from "../../actions/profile";

//TODO Purpose:
//TODO    1) To create a form that provides a user with the ability to add education credentials.

// How it works:
//    1) The AddEducation function takes in addEducation action and the history prop.
//?    2) The AddEducation function calls a useState hook and sets properties of school, degree, fieldofstudy,
//? from, to, and description to a empty string, and sets current to false. The useState is deconstructed to
//? an object called formData and function called setFormData.
//    3) The AddEducation function calls another useState hook passing in false and deconstructs a boolean
// called toDateDisabled and a function named toggleDisabled off of the useState.
//?    4) The following constants are deconstructed off of the formData object: school, degree, fieldofstudy,
//? from, to, current, and description.
//    5) A onChange function is defined passing in e (the event object) that returns setFormData calling it
// with the following parameters: the entire state of formData and the Key-Value pair e.target.name: e.target.value
// inside of an object.
//?    6) The AddEducation function returns a Fragment that contains a h1 tag saying Add An Education, a p tag
//? saying Add any school or bootcamp that you have attended, a small tag saying * = required field, a form tag
//? that contains inputs for school, degree, fieldofstudy, from, current, to, and a textarea for description.
//? Also, a Link fragment that will take a user to the dashboard route. Lastly, an input tag with the type of
//? submit that once clicked will trigger the onSubmit property on form.
//   7) When the form is submitted, the onSubmit property calls an anonymous function that passes in e,
// preventsDefault, and executes the addEducation action with the parameters formData and history.
//?   8) The addEducation action is defined as a required function in AddEducation.propTypes.

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Education</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any school or bootcamp that you
        have attended
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addEducation(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            value={school}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            value={degree}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Field of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div class="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Currently Enrolled
          </p>
        </div>
        <div class="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisabled ? "disabled" : ""}
          />
        </div>
        <div class="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type="submit" class="btn btn-primary my-1" />
        <Link class="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
