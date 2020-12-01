import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div class="dash-buttons">
      <Link href="/edit-profile." class="btn btn-light">
        <i class="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link href="/add-experience" class="btn btn-light">
        <i class="fab fa-black-tie text-primary"></i> Add Experience
      </Link>
      <Link href="/add-education" class="btn btn-light">
        <i class="fas fa-graduation-cap text-primary"></i> Add Education
      </Link>
    </div>
  );
};

export default DashboardActions;
