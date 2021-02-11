import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

//TODO Purpose:
//TODO    1) To display a snippet of a single user's profile and provide a link to view their profile in full detail.

// How it works:
//    1) The ProfileItem function takes in user, status, company, location, skills, that is deconstructed off of
// the profile prop. The user object is deconstructed further to _id, name, avatar.
//?    2) The ProfileItem function returns a div containing an image with the src attribute assigned to the
//? value of avatar, h2 tag with the value of name inside, p tag with the value of status and a JSX
//? expression that checks for a truth value of company; if true, then displays the value of company
//? in a span tag. A p tag using a JSX expression that checks for a truth value of location, if true, then
//? displays the value of location in a span tag.
//    3) The Link fragment provides a link to the users profile by linking to `/profile/:_id` where
// :_id equals the value of _id brought in from the deconstructed state of profile.user.
//?    4) A ul tag contains a JSX expression that uses the slice method on the skills array to return the
//? first four skills from the array. Once we have this new array we map through it using the map method
//? passing in a single instance, skill, and index. The map returns an li tag with the attribute key set
//? to the passed in index value and inside containing the value of the single instance, skill.
//    5) The profile prop is defined as a required object in ProfileItem.propTypes.

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className="profile bg-light">
      <img src={avatar} alt="" className="round-img" />
      <div>
        <h2>{name}</h2>
        <p>
          {status} {company && <span> at {company}</span>}
        </p>
        <p className="my-1">{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className="btn btn-primary">
          View Profile
        </Link>
      </div>
      <ul>
        {/* Returning the first four skills from the array, we use the index parameter as the key. */}
        {skills.slice(0, 4).map((skill, index) => (
          <li key={index} className="text-primary">
            <i className="fas fa-check"></i> {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
