import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

//TODO Purpose:
//TODO    1) To load the React application as a fragment.
//TODO    2) To render the React application and attach it to the div with the Id of the root in the 
//TODO index.html file within the public directory. 
//TODO    3) To run reportWebVitals.

// How it works:
//    1) The render method is called on the ReactDOM package. The render method takes in the fragment
// React.StrictMode and within it our imported App function as a fragment.
//?    2) The React.StrictMode fragment element is then supplied/ attached to the div element with an id of
//? root that acts as the React applications container. Our website is now a working React application 
//? that now only updates the appropriate container node's children versus the entire node on every state change.
//    3) Calls the function reportWebVitals.

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
