const express = require("express");
const request = require("request");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Post = require("../../models/Post");

// * Messing around *
// ? With Tags
// TODO: Should delete later.
// ! Better Comments GG.

// Purpose:
//    1) To handle GET request to "/api/profile/me" that comes from the profile action file.
//    2) To handle POST request to "/api/profile" that comes from the profile action file.
//    3) To handle GET request to "/api/profile" that comes from the profile action file.
//    4) To handle GET request to "/api/profile/user/:user_id" that comes from the profile action file.
//    5) To handle DELETE request to "/api/profile" that comes from the profile action file.
//    6) To handle PUT request to "/api/profile/experience" that comes from the profile action file.
//    7) To handle DELETE request to "/api/profile/experience/:exp_id" that comes from the profile action file.
//    8) To handle PUT request to "/api/profile/education" that comes from the profile action file.
//    9) To handle DELETE request to "/api/profile/education/:exp_id" that comes from the profile action file.
//    10) To handle GET request to "/api/profile/github/:username" that comes from the profile action file.

// How it works:
//    1) The GET method is attached to the router instance, also known as a mini-app, that passes in the route
// "/", an array containing auth and another array, and an async function that passes in req and res objects.
// The second parameter is the auth middleware. The third parameter is an async callback function that takes in
// req and res as parameters. The async callback function loads a try-catch statement. The try block creates a
// constant with the name profile that assigns the result of an await call, with the use of mongoose to query
// the database, using the findOne method on the Profile model. The findOne method takes in an object with the
// property user set to req.user.id. A populate method is then attached to the end of the findOne method. The 
// populate method takes in a string of "user" and an array with the strings "name" and "avatar", respectively.
// An if statement checks to see if the constant profile has a falsey value. If so, the if statement then returns 
// a status 400 and attaches the message "There is no profile for this user" using the json method. The result of 
// profile is then passed in as a parameter into res.json that will send it to the action that made the request. 
// The catch block takes in error, as err, and passes in the error message into console.error. A status of 500 is 
// sent via res.status and attaches the message "Server Error" using the send method.
//  2) The POST method is attached to the router instance, passes in the route "/", an array containing auth and
// another array, and a callback function that passes in the objects req and res. The second parameter which is
// an array containing auth and an array that has two check functions, one that takes in the string "status" and
// the string "Status is required", the second takes in the string "skills" and "Skills is required", as parameters
// and attaches the methods not and isEmpty. The third parameter is an async callback function that takes in req and 
// res as parameters. Inside of the async callback function, a constant called errors are set to the result of the 
// function validationResult being run with the req object as a parameter. An if statement checks the truth value of 
// the constant errors not being empty, meaning errors do exist. The if statement then returns a status 400 and a 
// JSON object containing the array of errors. The following constants are then deconstructed off of the req.body 
// object: company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instragram, 
// linkedin. Next, we build an object by setting the constant profileFields to an empty object. We set profileFields.user
// to the value of req.user.id. We use an if statement to check company, website, location, bio, status, and 
// githubusername for a truth value, if true, we set the value of them to a property on profileFields of the same name.
// An if statement checks skills, if true, then profileFields.skills is set to the result of the split method being run
// on the skills array followed by a map method that takes in a single instance, skill, and calls the trim method on
// the skill item. The results of the split and map methods are returned as a new array assigned to profileFields.skills. 
// Next, we build an object by setting profileFields.social to an empty object. We use an if statement to check 
// youtube, twitter, facebook, instagram, and linkedin for a truth value, if true, we set the value of them to a property
// on profileFields.social of the same. The async callback function loads a try-catch statement. The try block creates
// a variable called profile that assigns the result of an await call using the findOne method on the Profile model.
// The findOne method takes in an object with the property user set to req.user.id. If the route is being used to 
// update a profile an if statement checks profile for a truth value; if true, the profile variable is reassigned to 
// the result of an await call using the findOneAndUpdate method on the Profile model. The findOneAndUpdate method 
// takes in three objects. The first object contains a property called user set to req.user.id. The second object
// contains a property called $set set to profileFields. The third object contains a property called new set to new.
// The if statement, then returns res.json with the result of profile as a parameter. If the route is being used to
// create a profile, then profile is reassigned to a new Profile instance that takes in profileFields as a parameter.
// An await call awaits the response from the save method that runs on profile, which uses mongoose to update the document 
// in the profile collection. A res.json is called with profile as its parameter. The catch block takes in error, as err, 
// and passes in the error message into console.error. A status of 500 is sent via res.status and attaches the message 
// "Server Error" using the send method.
//    3) The GET method is attached to the router instance, passes in the route "/", and an async callback function.
// The async callback function loads a try-catch statement. The try block creates a constant with the name profilse that 
// assigns the result of an await call, using the find method on the Profile model. The find method takes in no parameters, 
// returning all data found. A populate method is then attached to the end of the find method. The populate method takes 
// in a string of "user" and an array with the strings "name" and "avatar", respectively. A res.json is called with profiles 
// as its parameter. The catch block takes in error, as err, and passes in the error message into console.error. A status 
// of 500 is sent via res.status and attaches the message "Server Error" using the send method.
//    4) The GET method is attached to the router instance, passes in the route "/user/:user_id", and an async callback 
// function. The async callback function loads a try-catch statement. The try block creates a constant with the name 
// profile that assigns the result of an await call using the findOne method on the Profile model. The findOne method 
// takes in an object with the property user set to req.params.user_id. A populate method is then attached to the end of 
// the findOne method. The populate method takes in a string of "user" and an array with the strings "name" and "avatar", 
// respectively. An if statement checks to see if the constant profile has a falsey value. If so, the if statement then 
// returns a status 400 and attaches the message "There is no profile for this user" using the json method. The result of 
// profile is then passed in as a parameter into res.json that will send it to the action that made the request. The catch 
// block takes in error, err, and passes in the error message into console.error. An if statement checks err.kind for a 
// value that strictly equals the string "ObjectId" if the condition is met, then the if statement returns a status 400 
// and attaches the message "Profile not found" using the json method. If the if statement condition is not met, 
// then the status of 500 is sent via res.status and attaches the message "Server Error" using the send method.
//    5) The DELETE method is attached to the router instance, passes in the route "/", auth middleware, and an async
// callback function. The async callback function loads a try-catch statement. An await call awaits the response 
// from the deleteMany method that runs on Post, which uses mongoose to delete the document in the post collection. 
// The deleteMany method takes in an object with the property user set to req.user.id. An await call awaits the response
// from the findOneAndRemoveOne method that runs on Profile, which uses mongoose to delete the document in the profile 
// collection. The findOneAndRemoveOne method takes in an object with the property user set to req.user.id. An await 
// call awaits the response from findOneAndRemoveOne method that runs on User, which uses mongoose to delete the document 
// in the user collection. The findOneAndRemoveOne method takes in an object with the property _id set to req.user.id. 
// After these three await calls are fulfilled the posts, profile, and user information pertaining to that user will be 
// deleted out of these databases, and the user's account was successfully deleted. A res.json is called with a msg of 
// "User deleted.". The catch block takes in error, as err, and passes in the error message into console.error. 
// A status of 500 is sent via res.status and attaches the message "Server Error" using the send method.
//    6) The PUT method is attached to the router instance, passes in the route "/experience", an array containing auth
// and another array, and an async callback function. The second parameter which is an array containing auth and an 
// array that has three check functions, one that takes in the strings "title" and "Title is required", the second
// takes in the strings "company" and "Company is required", and the third takes in the strings "from" and 
// "From date is required" as parameters and attaches the methods not and isEmpty. The third parameter is an async callback 
// function that takes in req and res as parameters. Inside of the async callback function, a constant called errors are 
// set to the result of the function validationResult being run with the req object as a parameter. An if statement checks 
// the truth value of the constant errors not being empty, meaning errors do exist. The if statement then returns a status 
// 400 and a JSON object containing the array of errors. The following constants are then deconstructed off of the req.body 
// object: title, company, location, from, to, current, description. A constant with the name newExp is set to an object with
// properties: title, company, location, from, to, current, description. Inside the async function, a try-catch statement is 
// called. The try block creates a constant with the name profile and assigns the result of an await call to query the database, 
// using the findOne method on the Profile model. The findById method takes in the parameter req.user.id. The unshift method is 
// called on profile.experience. The unshift method takes in an object newExp as a parameter, which adds the object to the 
// front of the profile.experience array. An await call awaits the response from the save method that runs on profile, which 
// uses mongoose to update the document in the profile collection. A res.json is called with profile as its parameter. The catch 
// block takes in error, as err, and passes in the error message into console.error. A status of 500 is sent via res.status 
// and attaches the message "Server Error" using the send method.
//    7) The DELETE method is attached to the router instance, passes in the route "/experience/:exp_id", auth middleware,
// and an async callback function. The try block creates a constant with the name profile and assigns the result of an await 
// call to query the database using the findOne method on the Profile model. The findOne method takes in an object with a
// property called user set to req.user.id as a parameter. A constant with the name removeIndex is assigned to
// the result of the map method followed by the result of the indexOf method that is attached to profile.experience. First,
// the map method takes in a single instance, item, and returns item.id, which allows for indexOf method to search through the 
// new array looking for the value that equals req.params.exp_id, returns that index position, and stores it in the removeIndex 
// constant. The splice method is called on profile.experience. The splice method takes in the parameters removeIndex and 1, 
// respectively, which removes that experience from the array. An await call awaits the response from the save method that runs 
// on profile, which uses mongoose to delete the document in the profile collection. A res.json is called with profile as its 
// parameter. The catch block takes in error, as err, and passes in the error message into console.error. A status of 500 is 
// sent via res.status and attaches the message "Server Error" using the send method.
//    8) The PUT method is attached to the router instance, passes in the route "/education", an array containing auth and
// another array, and an async callback function. The second parameter which is an array containing auth and an array that 
// has four check functions, one that takes in the strings "school" and "School is required", the second takes in the strings 
// "degree" and "Degree is required", the third takes in the strings "fieldofstudy" and "Field of study is required", and the 
// fourth takes in the strings "from" and "From date is required" as parameters and attaches the methods not and isEmpty.
// The third parameter is an async callback function that takes in req and res as parameters. Inside of the async callback function, 
// a constant called errors are set to the result of the function validationResult being run with the req object as a parameter. 
// An if statement checks the truth value of the constant errors not being empty, meaning errors do exist. The if statement then 
// returns a status 400 and a JSON object containing the array of errors. The following constants are then deconstructed off of the 
// req.body object: school, degree, fieldofstudy, from, to, current, description. A constant with the name newExp is set to an object 
// with properties: school, degree, fieldofstudy, from, to, current, description. Inside the async function a try-catch statement is 
// called. The try block creates a constant with the name profile and assigns the result of an await call to query the database, 
// using the findOne method on the Profile model. The findById method takes in the parameter req.user.id. The unshift method is 
// called on profile.education. The unshift method takes in an object newExp as a parameter, which adds the object to the 
// front of the profile.education array. An await call awaits the response from the save method that runs on profile, which uses 
// mongoose to update the document in the profile collection. A res.json is called with profile as its parameter. The catch 
// block takes in error, as err, and passes in the error message into console.error. A status of 500 is sent via res.status 
// and attaches the message "Server Error" using the send method.
//    9) The DELETE method is attached to the router instance, passes in the route "/education/:edu_id", auth middleware,
// and an async callback function. The try block creates a constant with the name profile and assigns the result of an await 
// call to query the database using the findOne method on the Profile model. The findOne method takes in an object with a
// property called user set to req.user.id as a parameter. A constant with the name removeIndex is assigned to
// the result of the map method followed by the result of the indexOf method that is attached to profile.education. First,
// the map method takes in a single instance, item, and returns item.id, which allows for indexOf method to search through the 
// new array looking for the value that equals req.params.edu_id, returns that index position, and stores it in the removeIndex 
// constant. The splice method is called on profile.education. The splice method takes in the parameters removeIndex and 1, 
// respectively, which removes that education from the array. An await call awaits the response from the save method that runs 
// on profile, which uses mongoose to delete the document in the profile collection. A res.json is called with profile as its 
// parameter. The catch block takes in error, as err, and passes in the error message into console.error. A status of 500 is 
// sent via res.status and attaches the message "Server Error" using the send method.
//    10) The GET method is attached to the router instance, passes in the route "/github/:username" and a callback function
// with req and res as parameters. The callback function loads a try-catch statement. The try block creates a constant with the
// name options and sets it to an object containing three properties. The first property is called uri and is set to an encodeURI
// function that takes in the GitHub API path for getting repos as a string, that includes the req.params.username within the string,
// using template literal. The second property is called method and is set to the string "GET". The third property is called headers
// and is set to an object containing the property "user-agent" with the value "node.js" and the property Authorization set to
// `token ${config.get("githubToken")}`, the get method being called on the config object within the template literal uses the 
// the string "githubToken" being passed into the get method to select the value of that JSON property within our hidden config file.
// The request module is called passing in the constant options and a callback function. The request module is used to make a API 
// request to the GitHub API so we can get the repos belonging to that username. The callback function takes in error, res, and body
// as parameters. In the callback function, an if statement checks for an error; if there is an error, it console.error the error.
// An if statement checks response.statusCode for a value that does NOT equal 200, if true, then the if statement returns a status 
// of 404 with res.status and the message "No Github profile found." with an attached json method. Lastly, res.json is called with
// JSON.parse(body) as its parameter that parses the returned body before sending it to the action that called the api request.

// @route   GET API/profile/me
// @desc    Get current users profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    //* Creating profile object:
    //* By searching DB for a profile that belongs to user's id.
    //* Populating our new profile object with the name and avatar,
    //* found from referencing the user document.
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate("user", ["name", "avatar"]); // Returning the name and
    // avatar from user document.

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
    // The user's profile data will now be accessible at api/me
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST API/profile/
// @desc    Create or Update user profile
// @access  Private
router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are errors.
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body;

    // * Build profile object *
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // * Build social object *
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET API/profile/
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET API/profile/user/:user_id
// @desc    Get profile by ID
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) return res.status(400).json({ msg: "Profile not found." });

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "Profile not found." });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE API/profile/user/:user_id
// @desc    Delete profile, user & posts
// @access  Private
router.delete("/", auth, async (req, res) => {
  try {
    // * Remove users posts *
    await Post.deleteMany({ user: req.user.id });
    // * Remove profile *
    await Profile.findOneAndRemove({ user: req.user.id });
    // * Remove user *
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: "User deleted." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT API/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  "/experience",
  [
    auth,
    [
      check("title", "Title is required").not().isEmpty(),
      check("company", "Company is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    // * Dealing with MongoDB *
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE API/profile/experience/:exp_id
// @desc    Delete experience from profile
// @access  Private
router.delete("/experience/:exp_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // * Get remove index *
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT API/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  "/education",
  [
    auth,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    // * Dealing with MongoDB *
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE API/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete("/education/:edu_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // * Get remove index *
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    profile.education.splice(removeIndex, 1);

    await profile.save();

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET API/profile/github/:username
// @desc    Get user repos from Github
// @access  Public
router.get("/github/:username", (req, res) => {
  console.log(req.params.username, " in api/profile");
  try {
    const options = {
      uri: encodeURI(
        `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
      ),
      method: "GET",
      headers: {
        "user-agent": "node.js",
        Authorization: `token ${config.get("githubToken")}`,
      },
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: "No Github profile found." });
      }
      res.json(JSON.parse(body));
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
