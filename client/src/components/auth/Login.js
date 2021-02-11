import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

//TODO Purpose:
//TODO    1) To prompt a user to login with their email and password and sending the information to the backend
//TODO for validation.
//TODO    2) To check to see if the user is already logged in by checking their authetnication and if they are
//TODO redirecting them to the dashboard page.

// How it works:
//    1) The Login function takes in a login action from actions/auth and isAuthenticated state via
// mapStateToProps.
//?    2) The Login function uses useState to create a formData object setting the email and password
//? properties to empty strings.
//    3) An onChange function is created that will call setFormData in order to call useState to update
// the formData object with the new values.
//?    4) An onSubmit function is created that will call the login action with the parameters email and
//? password that was deconstructed off of the formData object.
//    5) An if statement will check if the isAuthenticated stateToProp contains a truth value. If it does
// it will return a react-router component called Redirect that will redirect the user to the dashboard page.
//?    6) If there is no truth value for isAuthenticated then the Login function will return a Fragment
//? that contains the necessary form and input html needed to describe what data needs to be entered and where.
//    7) On both the email and password input tags is a value and onChange Key-Value pair. The key of the
// onChange Key-Value pair is assigned to either the email or password value Key-Value pair gotten from the
// formData object, and is updated by the onChange function that is updating the formData state by calling
// the setFormData function. The setFormData function fills the object with the current formData by the spread
// operator and gets the key by calling e.target.name and assigning its value by getting e.target.value.
// Now we have formData state having the same data that is being typed in by our user.
//?    8) Finally, on the form tag a onSubmit key is set to a function that calls the function onSubmit,
//? asynchorously, and preventing event default, so it can call the login action with the Key-Values of email
//? and password.
//    9) The login action and isAuthenticated props are defined in Login.propTypes. The login action is
// defined as a required function. The isAuthenticated is defined as a boolean.
//?    10) isAuthenticated is defined in the object creating function mapStateToProps by passing in the state
//? object with the ability of connect from react-redux packpage.
//? isAuthenticated is set to state.auth.isAuthenticated

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  // * Creating onChange event to update formData object. *
  // Using [e.target.name] to select the value of name attribute
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into your account
      </p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
