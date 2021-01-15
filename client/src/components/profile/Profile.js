import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithub from "./ProfileGithub";
import { getProfileById } from "../../actions/profile";

// Purpose:
//    1) To display buttons that allow a user to navigate to pages to view all profiles and edit profile.
//    2) To display a user's entire profile by bringing in the ProfileTop, ProfileAbout, ProfileExperience,
// ProfileEducation, and ProfileGithub fragments.
//
// How it works:
//    1) The Profile function takes in a getProfileById action, brought in from actions/profile. The Profile
// function takes in profile, loading, and error state that is deconstructed off of profile, the auth state,
// along with match and githubusername.
//    2) In the Profile function a useEffect hook is called with an anonymous function that will execute the
// getProfileById action with match.params.id as a parameter, using getProfileById and match.params.id as
// its dependencies.
//    3) The Profile function returns a Fragment containing either a fragment named Spinner or another
// Fragment. If the profile state equals null or loading equals a truth value, the Profile function will
// return Spinner, else it will return another Fragment.
//    4) The fragment Profile function will return if profile does NOT equal null and loading state contains
// a false value is the following: A Link fragment that takes a user to the route /profiles, a Link fragment
// that takes a user to the /edit-profile route, ProfileTop, ProfileAbout, ProfileExperience, ProfileEducation,
// and ProfileGithub fragments.
//    5) For the Link fragment that will take a user to the /edit-profile route, the following has to happen.
// First, the auth.isAuthenticated state needs to bet set to a truth value. Two, the auth.loading state needs
// to equal false. Three, auth.user._id needs to equal profile.user._id, only when all three of these conditions
// are met will a user be shown the Edit Profile button.
//    6) The ProfileTop and ProfileAbout fragments have props named profile that is set to the profile state.
//    7) For both of the fragments containing ProfileExperience and ProfileEducation to be displayed
// the length of their array must be greater than 0. This array is found with profile.experience.length or
// profile.education.length.
//    8) Both ProfileExperience and ProfileEducation fragments are returned via a map function on the arrays
// of profile.experience and profile.education. The map function takes in a single instance, experience, and
// returns the fragment of ProfileExperience with the props key with the value of experience._id and experience
// with the value of experience. The map function takes in a single instance, education, and returns the
// fragment of ProfileEducation with the props key with the value of education._id and education with the
// value of education.
//    9) The ProfileGithub component will be returned if profile.githubusername state is equal to a truth value.
// The ProfileGithub component takes in a prop of username with the value of profile.githubusername.
//    10) The getProfileById action is defined as required function, the profile and auth state is defined as
// a required object in Profile.propTypes. mapStateToProps defines profile using state.profile and auth using
// state.auth.

const Profile = ({
  getProfileById,
  profile: { profile, loading, error },
  auth,
  match,
  githubusername,
}) => {
  useEffect(() => {
    // Get's the user's profile ID from the url using match.params
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);
  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {" "}
          Taco salad lives here
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <Link to="/edit-profile" className="btn btn-dark">
                Edit Profile
              </Link>
            )}
          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experience</h2>
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>
            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}{" "}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
