import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";
// Redux
import { Provider } from "react-redux";
import store from "./store";
// Auth
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";

import "./App.css";

//TODO Purpose:
//TODO    1) To be the main focal point of the application.
//TODO    2) To handle all the routing of the pages by deciding which routes should load what components.
//TODO    3) To decide which routes will be public and which routes will be private, meaning need valid
//TODO login credentials.
//TODO    4) To make a token found in localStorage become a default token through setAuthToken.

// How it works:
//    1) Calls an If-Else statement and checks for a valid value of localStorage.token, if the value
// is valid then the setAuthToken function is called passing in localStorage.token as a parameter.
//?    2) The function App calls a useEffect hook that makes a dispatch request to the store object. 
//? The dispatch action is called with the loadUser action as its parameter. The useEffect hook uses 
//? no dependencies. 
//    3) The function App returns a Provider fragment with a prop named store set to the store object. 
// Inside that Provider fragment, a Router fragment contains a Fragment and inside that Fragment first 
// is a Navbar fragment. Followed by a Route fragment with props exact path pointing to the root location 
// of the application and the prop component set to Landing, loading the Landing component on "/" visit. 
// The Route Fragment loading the Landing component is followed by a section that acts as the web pages
// container. Inside this section are an Alert and a Switch fragment. 
//?    4) The Switch fragment contains: a Route fragment where a visit to "/register" loads the Register 
//? component, a Route Fragment where a visit to "/login" loads the Login component, a Route fragment where
//? a visit to "/profiles" loads the Profiles component, a Route fragment where a visit to "/profile/:id" 
//? loads the Profile component.
//    5) The Switch fragment also contains and uses PrivateRoute fragments, which functionality we defined in 
// components/routing/PrivateRoute.js, such as, a PrivateRoute fragment where a visit to "/dashboard" loads 
// the Dashboard component, a PrivateRoute fragment where a visit to "/create-profile" loads the CreateProfile
// component, a PrivateRoute fragment where a visit to "/edit-profile" loads the EditProfile component, a 
// PrivateRoute fragment where a visit to "/add-experience" loads the AddExperience component, a PrivateRoute
// fragment where a visit to "/add-education" loads the AddEducation component, a PrivateRoute fragment
// where a visit to "/posts" loads the Posts component, and a PrivateRoute fragment where a visit to "posts/:id"
// loads the Post component. 

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:id" component={Profile} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute
                exact
                path="/create-profile"
                component={CreateProfile}
              />
              <PrivateRoute
                exact
                path="/edit-profile"
                component={EditProfile}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={AddExperience}
              />
              <PrivateRoute
                exact
                path="/add-education"
                component={AddEducation}
              />
              <PrivateRoute exact path="/posts" component={Posts} />
              <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
