import React, { Fragment, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addExperience } from "../../actions/profile";

// Purpose:
//    1) To create a form that provides a user with the ability to add work experience.

// How it works:
//    1) The AddExperience function takes in addExperience action and the history prop.
//    2) The AddExperience function calls a useState hook and sets properties of company, title, location,
// from, to, and description to an empty string, and sets current to false. The useState is deconstructed to
// an object called formData and function called setFormData.
//    3) The AddExperience function calls another useState hook passing in false and deconstructs a boolean
// called toDateDisabled and a function named toggleDisabled off of the useState.
//    4) The following constants are deconstructed off of the formData object: company, title, location,
// from, to, current, and description.
//    5) A onChange function is defined passing in e (the event object) that returns setFormData calling it
// with the following parameters: the entire state of formData and the Key-Value pair e.target.name: e.target.value
// inside of an object.
//    6) The AddExperience function returns a Fragment that contains a h1 tag saying Add An Experience, a p tag
// saying Add any developer/programming positions that you have had in the past, a small tag saying * = required field,
// a form tag that contains inputs for title, company, location, from, current, to, and a textarea for description.
// Also, a Link fragment that will take a user to the dashboard route. Lastly, an input tag with the type of
// submit that once clicked will trigger the onSubmit property on form.
//   7) When the form is submitted, the onSubmit property calls an anonymous function that passes in e,
// preventsDefault, and executes the addExperience action with the parameters formData and history.
//   8) The addExperience action is defined as a required function in AddExperience.propTypes.

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    from: "",
    to: "",
    current: false,
    description: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 class="large text-primary">Add An Experience</h1>
      <p class="lead">
        <i class="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form
        class="form"
        onSubmit={(e) => {
          e.preventDefault();
          addExperience(formData, history);
        }}
      >
        <div class="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div class="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
            Current Job
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
            placeholder="Job Description"
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

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
