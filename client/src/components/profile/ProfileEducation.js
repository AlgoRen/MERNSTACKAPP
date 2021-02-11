import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

//TODO Purpose:
//TODO    1) To display education-related information of a user, such as the school, degree,
//TODO field of study, the dates between they earned their degree, and a description of
//TODO that education.

// How it works:
//    1) The ProfileEducation function takes in school, degree, fieldofstudy, current, to, from,
// and description that is deconstructed off of the education prop.
//?    2) The ProfileEducation function returns a div containing a h3 tag with the school name and
//? p tags containing the degree, fieldofstudy, and description that pertain to that education.
//    3) The Moment fragment is used to format the from date as YYYY/MM/DD and a ternary operator is
// used to check if there is a truth value in to; if not, it will return " Now" else it will return
// a Moment fragment with YYYY/MM/DD for to.
//?    4) The education prop is defined as a required object in ProfileEducation.propTypes.

const ProfileEducation = ({
  education: { school, degree, fieldofstudy, current, to, from, description },
}) => (
  <div>
    <h3 className="text-dark">{school}</h3>
    <p>
      <Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
      {!to ? " Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
    </p>
    <p>
      <strong>Degree: </strong> {degree}
    </p>
    <p>
      <strong>Field of Study: </strong> {fieldofstudy}
    </p>
    <p>
      <strong>Description: </strong> {description}
    </p>
  </div>
);

ProfileEducation.propTypes = {
  education: PropTypes.object.isRequired,
};

export default ProfileEducation;
