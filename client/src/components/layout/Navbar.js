import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

//TODO Purpose:
//TODO    1) To provide navigation to the user on every page of the site.
//TODO    2) To provide the ability for the user to logout of their account.

// How it works:
//    1) The Navbar function takes in isAuthenticated state and loading from the deconstructed
// auth state, and logout action as a parameter.
//?    2) A constant named authLinks is created as a JSX component that returns an unordered list with
//? li tags that contain links to the profiles, posts, and dashboard pages. The Link function from
//? react-router-dom is used for this. Lastly, there is a li tag with a 'a' tag that contains an onClick
//? property that is assigned and will call the logout action.
//    3) A constant named guestLinks is created a JSX component that returns an unordered list with
// li tags that contain links to the profiles, register, and login pages.
//?    4) The Navbar function returns a nav tag that contains an h1 tag that has a Link to the root route.
//? JSX is used to check to see if the page is not loading and then returns a Fragment with a ternary
// operator that will check isAuthenticated and load in authLinks on true or the guestLinks on false.
//    5) The logout action and auth state is defined in Navbar.propTypes. The logout action is defined
// as a required function, and the auth state is defined as a required object.
//?    6) mapStateToProps defines the auth state using state.auth

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/posts">Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />
          <span className="hide-sm">Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt"></i>{" "}
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="f!#"></i> DevConnector
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
