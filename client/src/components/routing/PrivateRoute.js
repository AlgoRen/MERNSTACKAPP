import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//TODO Purpose:
//TODO    1) To turn a regular route into a private route by requiring authentication.

// How it works:
//    1) The PrivateRoute function takes in Component desctuctured off of componenet, isAuthenticated and
// loading deconstructed off of the auth state, and any other props that are found using ...rest.
//?    2) The PrivateRoute function returns a Route passing in ...rest as a prop and a render prop.
//    3) The render prop uses JSX to call an anonymous function that passes in props as a parameter and
// and returns the result of an ternacy conditional that checks to see if isAuthenticated and loading both
// have false values. If they do then a Redirect componenet is returned with a to attribute set to "/login",
// which will take the user to the login page. Else, if not true that both isAuthenticated and loading have
// false values then a component with the name Componenet will be returned with all passed in props using
// ...props.
//?    4) The auth state is defined as a required object in PrivateRoute.propTypes.
//    5) mapStateToProps defines auth using state.auth.

// Creating private route component. Will redirect to login page for protected pages.
// * Passing in the component of the loaded route, auth state, and any other props that
// * is currently being sent by that route.
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
