import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// Purpose:
//    1) To have a page first time visitors can get information about what the website is for.
//    2) To have prompts for a user to register or login.

// How it works:
//    1) The Landing function takes in isAuthenticated as a parameter.
//    2) If the isAuthenticated state contains a truth value, then a Redirect component is returned
// that takes the user to the /dashboard route.
//    3) The Landing function returns a section that displays the site name, a description of what
// the site does, and buttons that link the user to the register and login page using the Link component.
//    4) The isAuthenticated state is defined in Landing.propTypes as a boolean.
//    5) mapStateToProps defines isAuthenticated state using state.auth.isAuthenticated

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create a developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
