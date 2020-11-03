import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Creating Alert component
// ** Checking to see if they are alert.  **
// ** If there is an alert than map through and return JSX.
// ** Passing along the alert message and styling with alertType.
const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div key={alert.id} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
