import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import { getProfiles } from "../../actions/profile";

// Purpose:
//    1) To display all the registered users with a profile.

// How it works:
//    1) The Profiles function takes in getProfiles action, profile and loading that is deconstructed off
// of the profile state.
//    2) The Profiles function calls a useEffect hook that calls the getProfiles action using getProfiles as
// its dependency.
//    3) The Profiles function returns a Fragment that will check loading and if true will return the Spinner
// fragment or will return another Fragment.
//    4) The Fragment returned if loading is false contains a h1 tag saying Developers, a p tag saying Browse and
// connect with developers, and a div.
//    5) The div uses JSX to check if profiles.length is greater than 0. If true then it will return the result
// of profiles.map that takes in a single instance, profile, returning a component called ProfileItem and setting
// its props key to profile._id and profile to profile. Else, if not true, it wil return an h4 tag saying No profiles
// found...
//    6) The getProfiles action is set as a required function and the profile state is set as a required object.
//    7) mapStateToProps defines profile using state.profile.

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fab fa-connectdevelop"></i> Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
