import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteExperience } from "../../actions/profile";

// Purpose:
//    1) To return a table containing the user's experience credentials.
//    2) To provide the ability to delete specific experience credentials.

// How it works:
//    1) The Experience function takes in experience state and the deleteExperiences action as parameters.
//    2) A constant name experiences is created to store the results of a map function.
//    3) The map function takes in a parameter edu as the single item of each value in the experience
// array. The map creates a key by assigning exp._id to tr tag.
//    4) Table data is added with exp.school and exp.degree.
//    5) A Moment fragment is brought in using a YYYY/MM/DD format to format the exp.from and the exp.to
// values. If exp.to is null based on a ternary operator check then a sting of " Now" is returned instead.
//    6) Lastly, for experience.map function, a table data with a button that contains an onClick property
// that executes an anonymous function that calls deleteExperiences passing in exp._id as a parameter.
//    7) The Experience function returns a Fragment with a header of Experience Credentials table HTML structuring
// containing the table head of Title and Years. The table body is const experiences passed in as JSX.
//    8) The experience state and deleteExperiences action are defined in Education.propTypes. The experiences
// state is defined as a required array. The deleteExperiences action is defined as a required function.

const Experience = ({ experience, deleteExperience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> —{" "}
        {exp.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{exp.from}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteExperience(exp._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
  deleteExperience: PropTypes.func.isRequired,
};

export default connect(null, { deleteExperience })(Experience);
