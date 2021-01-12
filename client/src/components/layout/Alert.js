import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Creating Alert component
// ** Checking to see if they are alert.  **
// ** If there is an alert, than map through and return JSX.
// ** Passing along the alert message and styling with alertType.

// Purpose:
//    1) To create divs for the alerts state.
//    2) To display the alert message and adding the appropriate className to style the alert.

// How it works:
//    1) The Alert function takes in alerts as a parameter.
//    2) Checks to see if the alerts array is NOT equal to null or NOT empty.
//    3) If both conditions pass, a map function is called on the alerts array.
//    4) The alerts.map takes in alert as the single instance of the array and returns a div with a key
// attribute with the value of alert.id and a className attribute with the value of `alert alert-${alert.alertType}`
// where alertType is being passed in from the alert state.
//    5) In the single instance of the map function, the alert message is stored inside via alert.msg with JSX.
//    6) The alerts state is defined in Alert.propTypes as a required array.
//    7) mapStateToProps defines alerts using state.alert

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

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
