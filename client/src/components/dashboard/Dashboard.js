import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteAccount, getCurrentProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";

// Purpose:
//    1) To provide a page for the user to be directed to on login, a overview of a user's profile information,
// and to host the DashboardActions component.
//    2) To provide a place where the user can delete their account.

// How it works:
//    1) The Dashboard function takes in deleteAccount, getCurrentProfile, user that is deconstructed
// off of auth, profile and loading that is deconstructed off of profile as parameters.
//    2) deleteAccount and getCurrentProfile are both gotten from the actions/profile folder.
//    3) A useEffect hook is called that executes the getCurrentProfile action and uses the getCurrentProfile
// state as its dependency.
//    4) The Dashboard function returns the <Spinner /> componenent if both loading and profile are equal to
// null. Else it returns a fragment.
//    5) The Fragment contains a h1 tag with the page title, a p tag that uses the user param to check if
// one exists and to display the user's name.
//    6) A ternary operator will load either a Fragment with the DashboardActions, Experience, and Education
// components. Along with a delete account button that will execute the deleteAccount action on the
// triggering of onClick. If the profile state object is not null, else it will return a Fragment
// with a button that will redirect the user to the /create-profile page.
//    7) The getCurrentProfile action, auth state, profile state, deleteAccount action are defined in
// Dashboard.propTypes. The getCurrentProfile and deleteAccount actions are defined as required functions.
// The auth state and profile state are defined as required objects.
//    8) auth and profile is defined in the object creating function mapStateToProps by passing in the state
// object with the ability of connect from react-redux package.
// auth is set to state.auth and profile is set to state.profile

const Dashboard = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  // Using a ternary operator to load a spinner graphic while waiting for
  // loading to return back false and the profile to be loaded in
  // before running the JSX within the Dashboard component.
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        {/* user && user.name is being used to ensure user has been loaded before 
        putting the user's name.*/}
        <i className="fas fa-user"> Welcome, {user && user.name}.</i>
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <button className="btn btn-danger" onClick={() => deleteAccount()}>
              <i className="fas fa-user-minus"></i> Delete My Account
            </button>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
