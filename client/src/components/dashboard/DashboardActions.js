import React from "react";
import { Link } from "react-router-dom";

// Purpose:
//    1) To provide links to the appropriate routes to edit profile, add experience, or add education.

// How it works:
//    1) Takes in no parameters and returns a div of Link tags. Link is a function that we import from
// react-router-dom. (Not much else to say?)
//    2) Here is some docs on Link if you are unsure of how it works: https://reactrouter.com/web/api/Link

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
