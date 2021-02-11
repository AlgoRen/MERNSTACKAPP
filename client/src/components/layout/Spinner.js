import React, { Fragment } from "react";
import spinner from "./spinner-gif.gif";

//TODO Purpose:
//TODO    1) To have an image that will display when the page is loading/getting data to return
//TODO to the page. It may also display if an error has occureded somewhere in the application and
//TODO cannot return the appropriate data needed for the component.

// How it works:
//    1) The Spinner function takes in no parameters.
//?    2) The Spinner function returns a fragment that contains an image tag.
//    3) The image tag uses a JSX variable to import the src img using the imported spinner image.
//?    4) Inline styles are applied via the style property, and the alt property defines an alt tag.

const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ width: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
