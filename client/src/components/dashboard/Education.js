import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteEducation } from "../../actions/profile";

// Purpose:
//    1) To return a table containing the user's education credentials.
//    2) To provide the ability to delete specific education credentials.

// How it works:
//    1) The Education function takes in education and the deleteEducation action as parameters.
//    2) A constant name educations is created to store the results of a map function.
//    3) The map function takes in a parameter edu as the single item of each value in the education
// array. The map creates a key by assigning edu._id to tr tag.
//    4) Table data is added with edu.school and edu.degree.
//    5) A Moment fragment is brought in using a YYYY/MM/DD format to format the edu.from and the edu.to
// values. If edu.to is null based on a ternary operator check, then a sting of " Now" is returned instead.
//    6) Lastly, for education.map function, a table data with a button that contains an onClick property
// that executes an anonymous function that calls deleteEducation passing in edu._id as a parameter.
//    7) The Education function returns a Fragment with a header of Education Credentials table HTML structuring
// containing the table head of School, Degree, and Years. The table body is const educations passed in as JSX.
//    8) The education state and deleteEducation action are defined in Education.propTypes. The educations
// state is defined as a required array. The deleteEducation action is defined as a required function.

const Education = ({ education, deleteEducation }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> —{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={() => deleteEducation(edu._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
  deleteEducation: PropTypes.func.isRequired,
};

export default connect(null, { deleteEducation })(Education);
