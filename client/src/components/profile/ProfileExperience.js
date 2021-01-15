import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

// Purpose:
//    1) To display experience related information, such as the company, title, location,
// the dates between they worked at the company, and a description of that education.

// How it works:
//    1) The ProfileEexperience function takes in company, title, location, current, to, from,
// and description that is deconstructed off of the experience prop.
//    2) The ProfileExperience function returns a div containing an h3 tag with the company name and
// p tags containing the title and description that pertain to that experience.
//    3) The Moment fragment is used to format the from date as YYYY/MM/DD, and a ternary operator is
// used to check if there is a truth value in to, if not it will return " Now" else it will return
// a Moment fragment with YYYY/MM/DD for to.
//    4) The experience prop is defined as a required object in ProfileExperience.propTypes.

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{company}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Position: </strong> {title}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
};

export default ProfileExperience;
