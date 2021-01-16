import React, { Fragment, useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile, getCurrentProfile } from "../../actions/profile";

// Purpose:
//     1) To create a form that allows a user to edit an existing profile.

// How it works:
//     1) The EditProfile function takes in profile and loading that are deconstructed off of the profile
// state, createProfile and getCurrentProfile actions, and the history prop.
//     2) The EditProfile function calls a useState hook passing in false and deconstructs a boolean
// called toDateDisabled and a function named toggleDisabled off of the useState.
//     3) The EditProfile function calls a useState hook that calls the getCurrentProfile action that updates
// the profile state. We then call setFormData to set the formData. If the following state is loading or the
// property on the profile object does not exist we are then setting the property to an empty string,
// else we are setting the property to what we find on the profile state. The useState hook has loading
// and getCurrentProfile as dependencies.
//     4) The following constants are deconstructed off of the formData object: company, website, location,
// status, skills, githubusername, bio, twitter, facebook, linkedin, youtube, instagram.
//     5) A onChange function is defined passing in e (the event object) that returns setFormData calling it
// with the following parameters: the entire state of formData and the Key-Value pair e.target.name: e.target.value
// inside of an object.
//     6) The EditProfile function returns a Fragment that contains h1 tag saying Edit Your Profile, a p tag
// saying Let's get some information to make your profile stand out, a small tag saying * = required field, and
// a form tag.
//     7) The form tag contains a select tag that has the following options: * Select Professional Status (shown
// by default), Developer, Junior Developer, Senior Developer, Manager, Student or Learning, Instructor or Teacher,
// Intern, Other. The value attribute of the select tag is set to the status constant. The onChange attribute of
// the select tag is set to an anonymous function that passes in e and calls the onChange function.
//     8) The form tag contains a div tag that contains inputs for company, website, location, skills, githubusername,
// bio. All inputs have an onChange attribute that calls the onChange function; with the website input having its
// value set to the urlToRender function passing in website as a parameter. Underneath the inputs is a button tag
// with an onClick attribute assigned to an anonymous function that calls a function called toggleSocialInputs and
// passing in !displaySocialInputs (meaning whatever the opposite value of the current state of displaySocialInputs),
// effectively making it into a toggle button for showing or hiding the social media input fields.
//     9) A JSX element checks displaySocialInputs, and if it contains a truth value, it will return a Fragment containing
// input fields for twitter, facebook, youtube, linkedin, instagram. All of their values are set to constants with
// the same as their name attribute and onChange attributes are set to anonymous functions that call onChange function.
// Also, a Link fragment that will take a user to the dashboard route. Lastly, an input tag with the type of
// submit that once clicked will trigger the onSubmit property on the form.
//     10) The createProfile and getCurrentProfile actions are defined as a required function in EditProfile.propTypes.
// The profile state is defined as required object. mapStateToProps defines profile using state.profile and auth using
// state.auth.

const urlToRender = (link) => {
  if (!link.match(/^[a-zA-Z]+:\/\//)) {
    return "//" + link;
  }
  return link;
};

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: "",
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    // Filling the form with the current data.
    //* If it is loading or the property on the profile object doesn't exist
    //* we are then setting the property to an empty string,
    //* else we are setting the property to what we find on the profile state.
    setFormData({
      company: loading || !profile.company ? "" : profile.company,
      website: loading || !profile.website ? "" : profile.website,
      location: loading || !profile.location ? "" : profile.location,
      status: loading || !profile.status ? "" : profile.status,
      skills: loading || !profile.skills ? "" : profile.skills.join(","),
      githubusername:
        loading || !profile.githubusername ? "" : profile.githubusername,
      bio: loading || !profile.bio ? "" : profile.bio,
      twitter: loading || !profile.social ? "" : profile.social.twitter,
      facebook: loading || !profile.social ? "" : profile.social.facebook,
      linkedin: loading || !profile.social ? "" : profile.social.linkedin,
      youtube: loading || !profile.social ? "" : profile.social.youtube,
      instagram: loading || !profile.social ? "" : profile.social.instagram,
    });
  }, [loading, getCurrentProfile]); // Depends on loading state to decide when to useEffect.
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Edit Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user">
          {" "}
          Let's get some information to make your profile stand out
        </i>
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={(e) => onChange(e)}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={urlToRender(website)}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => onChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={(e) => onChange(e)}
              />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
