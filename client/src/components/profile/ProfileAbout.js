import React, { Fragment } from "react";
import PropTypes from "prop-types";

// Purpose:
//    1) To display the user's name, bio, and skills.

// How it works:
//    1) The ProfileAbout function takes in bio, skills, and user that is deconstructed off of the profile
// state. name is further deconstructed off of user.
//    2) The ProfileAbout function returns a div containing a Fragment with an h2 tag set to the value of user's
// first name (using the trim method and splitting it on the first occurence of a space to get only the first name)
// and a p tag that contains the bio of that user.
//    3) In a div a JSX function contains a map function attached to the skills array that takes in a single instance,
// skill, and index. The map function returns a div, with the property key set to index, and contains skill value.
//    4) The profile state is set to a required object in ProfileAbout.propTypes.

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    //   <!-- About -->
    <div className="profile-about bg-light p-2">
      {bio && (
        <Fragment>
          <h2 className="text-primary">{name.trim().split(" ")[0]}'s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {skills.map((skill, index) => (
          <div key={index} className="p-1">
            <i className="fas fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
