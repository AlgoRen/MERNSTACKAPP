import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

// Purpose:
//    1) To prompt the user to register with an name, email, password, and cofirm the password they entered.
// Sending the information to the backend for validation.
//    2) To check to see if the user is already logged in by checking their authetnication and if they are
// redirecting them to the dashboard page.

// How it works:
//    1) The Register function takes in a setAlert and register action from actions/alert and actions/auth,
// respectively. The Register function also takes in isAuthenticated state via mapStateToProps.
//    2) The Register function uses useState to create a formData object setting the name, email, password,
// and password2 (used as password confirmation) properties to empty strings.
//    3) An onChange function is created that will call setFormData in order to call useState to update
// the formData object with the new values.
//    4) An onSubmit function is created that will call a setAlert action with the message
// "Passwords do not match" IF password and password2 do NOT match. Else the register action will be called
// with the parameters name, email, and password that was deconstructed off of the formData object
// IF password and password2 match.
//    5) An if statement will check if the isAuthenticated stateToProp contains a truth value. If it does
// it will return a react-router component called Redirect that will redirect the user to the dashboard page.
//    6) If there is no truth value for isAuthenticated then the Register function will return a Fragment
// that contains the necessary form and input html needed to describe what data needs to be entered and where.
//    7) On name, email, password, and password2 input tags is a value and onChange Key-Value pair.
// The key of the onChange Key-Value pair is assigned to the appropiate value Key-Value gotten from the formData
// object that is updated by the onChange function that is updating the formData state by calling the
// setFormData function. The setFormData function fills the object with the current formData by the spread
// operator and gets the key by calling e.target.name and assigning its value by getting e.target.value.
// Now we have formData state having the same data that is being typed in by our user.
//    8) Finally, on the form tag a onSubmit key is set to a function that calls the function onSubmit,
// asynchorously, and preventing event default, so it can call the register action with the Key-Values of
// name, email, and password.
//    9) The register action, the setAlert action, and isAuthenticated props are defined in Register.propTypes.
// The register and setAlert actions is defined as a required function. The isAuthenticated is defined as a boolean.
//    10) isAuthenticated is defined in the object creating function mapStateToProps by passing in the state
// object with the ability of connect from react-redux packpage.
// isAuthenticated is set to state.auth.isAuthenticated

const Register = ({ setAlert, register, isAuthenticated }) => {
  // Destructuring off of props.

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  // * Creating onChange event to update formData object. *
  // Using [e.target.name] to select the value assigned to
  // the name property and set it equal to that
  // target's value property value.
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
