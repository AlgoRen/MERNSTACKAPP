const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const { remove } = require("../../models/Profile");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//TODO Purpose:
//TODO    1) To handle POST request to "/api/posts" that comes from the post action file.
//TODO    2) To handle GET request to "/api/posts" that comes from the post action file.
//TODO    3) To handle GET request to "/api/posts/:id" that comes from the post action file.
//TODO    4) To handle DELETE request to "/api/posts/:id" that comes from the post action file.
//TODO    5) To handle PUT request to "/api/posts/like/:id" that comes from the post action file.
//TODO    6) To handle PUT request to "/api/posts/unlike/:id" that comes from the post action file.
//TODO    7) To handle POST request to "/api/posts/comment/:id" that comes from the post action file.
//TODO    8) To handle DELETE request to "/api/posts/comment/:id/:commentId" that comes from the post action file.

// How it works:
//    1) The POST method is attached to the router instance, also known as a mini-app, that passes in the route
// "/", an array containing auth and another array, and an async callback function that passes in req and res objects.
// The second parameter, which is an array containing auth and an array that has a check function that takes in
// the string "text" and the string "Text is required" as parameters and attaches the methods not and isEmpty. The 
// auth middleware validates that the logged-in user has the proper authentication to make a post and the array
// containing the check function followed by not and isEmpty method makes sure that there is text in the text field.
// The third parameter is an async callback function that takes in req and res as parameters. Inside of the async 
// callback function a constant called errors is set to the result of the function validationResult being run with 
// the req object as a parameter. An if statement checks the truth value of the constant errors not being empty, 
// meaning errors do exist. The if statement then returns a status 400 and a JSON object containing the array 
// of errors. 
//?    2) The async function loads a try-catch statement. 
//    3) The try block creates a constant with the name user and assigns the result of an await call, with the 
// use of mongoose to query the database, using the findById method on the User model. The findById method takes in 
// the parameter req.user.id attaches the select method and passes in "-password" to omit the password field.
// A constant with the name newPost is created and assigned to a new Post object that contains the values: text set 
// to req.body.text, name set to user.name, avatar set to user.avatar, user set to req.user.id. A constant with the 
// name post is assigned to the result of an await call of the save method ran on the newPost object. The result of 
// post is then passed in as a parameter into res.json that will send it to the action that made the request. The catch 
// block takes in error, as err, and passes in the error message into console.error. A status of 500 is sent via 
// res.status and attaches the message "Server Error" using the send method.
//?    4) The GET method is attached to the router instance, passes in the route "/", auth middleware, and an async
//? callback function. The async function takes in req and res as parameters. Inside the async function, a try-catch
//? statement is called. The try block creates a constant with the name posts and assigns the result of an await
//? call, to query the database, using the find method on the Post model. The find method takes in no parameters.
//? A sort method takes in an object containing the property date with the value -1; this is done to order the 
//? results by descending order as a parameter and is attached to the empty find method. The result of posts 
//? is then passed in as a parameter into res.json that will send it to the action that made the request. The catch 
//? block takes in error, as err, and passes in the error message into console.error. A status of 500 is sent via 
//? res.status and attaches the message "Server Error" using the send method.
//    5) The GET method is attached to the router instance, passes in the route "/:id", auth middleware, and a
// async callback function. The async function takes in req and res as parameters. Inside the async function a
// try-catch statement is called. The try block creates a constant with the name post and assigns the result 
// of an await call to query the database using the findById method on the Post model. The findById method takes
// in the parameter req.params.id. An if statement checks to see if the constant post has a falsey value. If so, 
// the if statement then returns a status 404 and attaches the message "Post not found" using the json method.
// The result of post is then passed in as a parameter into res.json that will send it to the action that made the 
// request. The catch block takes in error, err, and passes in the error message into console.error. 
// An if statement checks err.kind for a value that strictly equals the string "ObjectId" if the condition is
// met then the if statement returns a status 404 and attaches the message "Post not found" using the json method.
// If the if statement condition is not met, then the status of 500 is sent via res.status and attaches the message 
// "Server Error" using the send method.
//?    6) The DELETE method is attached to the router instance, passes in the route "/:id", auth middleware, and a
//? async callback function. The async function takes in req and res as parameters. Inside the async function a
//? try-catch statement is called. The try block creates a constant with the name post and assigns the result of
//? an await call to query the database using the findById method on the Post model. The findById method takes 
//? in the parameter req.params.id. A sort method takes in an object containing the property date with the value -1 
//? as a parameter and is attached to the findById method. An if statement checks to see if the constant post has 
//? a falsey value. If so, the if statement then returns a status 404 and attaches the message "Post not found" 
//? using the json method. An if statement checks to see if the value of post.user after the toString method is
//? ran on it does NOT equal the value of req.user.id. If this condition is met, the if statement then returns a 
//? status 401 and attaches the message "User not authorized" using the json method. An await call awaits the 
//? response from the save method that runs on post, which uses mongoose to remove the selected document from
//? the post collection. A message of "Post removed" is sent with res.json. The catch block takes in error, as err, 
//? and passes in the error message into console.error. An if statement checks err.kind for a value that strictly 
//? equals the string "ObjectId" if the condition is met, then the if statement returns a status 404 and attaches 
//? the message "Post not found" using the json method. If the if statement condition is not met, the status of 
//? 500 is sent via res.status and attaches the message "Server Error" using the send method.
//    7) The PUT method is attached to the router instance, passes in the route "/like/:id", auth middleware,
// and an async callback function. The async function takes in req and res as parameters. Inside the async function
// a try-catch statement is called. The try block creates a constant with the name post and assigns the result
// of an await call to query the database, using the findById method on the Post model. The findById method takes
// in the parameter req.params.id. An if statement checks the length of the result of a filter method ran on 
// post.likes is greater than 0. The filter method takes in a single instance, like, runs the toString method
// on likes.user checking to see if it is strictly equal to req.user.id, if so, the filter method will be returned
// with an array length of 1. The if statement returns a status 400 and attaches the message "Post already liked" 
// using the json method. The unshift method is called on post.likes. The unshift method takes in an object
// containing the property user set to req.user.id as a parameter, which adds the object to the front of the
// likes array. An await call awaits the response from the save method that runs on post, which uses mongoose 
// to update the document in the post collection. A res.json is called with post.likes as its parameter. The 
// catch block takes in error, as err, and passes in the error message into console.error. A status of 500 is 
// sent via res.status and attaches the message "Server Error" using the send method.
//?    8) The PUT method is attached to the router instance, passes in the route "/unlike/:id", auth middleware,
//? and an async callback function. The async function takes in req and res as parameters. Inside the async function
//? a try-catch statement is called. The try block creates a constant with the name post and assigns the result
//? of an await call to query the database using the findById method on the Post model. The findById method takes
//? in the parameter req.params.id. An if statement checks to see if the length of the result of a filter method ran on 
//? post.likes is strictly equal to 0. The filter method takes in a single instance, like, runs the toString method
//? on likes.user checking to see if it is strictly equal to req.user.id, if there are no conditions that match, the 
//? filter method will be returned with an array length of 0. The if statement returns a status 400 and attaches the 
//? message "Post has not yet been liked" using the json method. A constant with the name removeIndex is assigned to
//? the result of the map method followed by the result of the indexOf method that is attached to post.likes. First,
//? the map method takes in a single instance, like, and runs the toString method on like.user returning the post.likes 
//? array with the user property in string form, which allows for indexOf method to search through the new array
//? looking for the value that equals req.user.id, returns that index position, and stores it in the removeIndex constant.
//? The splice method is called on post.likes. The splice method takes in the parameters removeIndex and 1, respectively,
//? which removes that like from the array. An await call awaits the response from the save method that runs on post, 
//? which uses mongoose to update the document in the post collection. A res.json is called with post.likes as its parameter. 
//? The catch block takes in error, as err, and passes in the error message into console.error. A status of 500 is 
//? sent via res.status and attaches the message "Server Error" using the send method.
//    9) The POST method is attached to the router instance, passes in the route "/comment/:id", an array containing 
// auth and another array, and an async callback function that passes in the objects req and res. The second parameter, 
// which is an array containing auth and an array that has a check function that takes in the string "text" and the 
// string "Text is required" as parameters and attaches the methods not and isEmpty. The third parameter is an async 
// callback function that takes in req and res as parameters. Inside of the async callback function, a constant called 
// errors are set to the result of the function validationResult being run with the req object as a parameter. An if 
// statement checks the truth value of the constant errors not being empty, meaning errors do exist. The if statement 
// then returns a status 400 and a JSON object containing the array of errors. The async function loads a try-catch statement.
// The try block creates a constant with the name user and assigns the result of an await call, with the use of mongoose 
// to query the database, using the findById method on the User model. The findById method takes in the parameter 
// req.user.id, attaches the select method, and passes in "-password" to omit the password field. The try block creates a 
// constant with the name post and assigns the result of an await call to query the database using the findById method 
// on the Post model. The findById method takes in the parameter req.params.id. A constant with the name newComment is 
// created and assigned to an object that contains the values: text set to req.body.text, name set to user.name, 
// avatar set to user.avatar, user set to req.user.id. The unshift method is called on post.comments. The unshift method 
// takes in an object newComment as a parameter, which adds the object to the front of the comments array. An await call 
// awaits the response from the save method that runs on post, which uses mongoose to update the document in the post collection. 
// A res.json is called with post.comments as its parameter. The catch block takes in error, as err, and passes in the error 
// message into console.error. A status of 500 is sent via res.status and attaches the message "Server Error" using the send method.
//?    10) The DELETE method is attached to the router instance, passes in the route "/comment/:id/:comment_id", auth middleware,
//? and an async callback function. The async function takes in req and res as parameters. Inside the async function, a try-catch 
//? statement is called. The try block creates a constant with the name post and assigns the result of an await call to query 
//? the database, using the findById method on the Post model. The findById method takes in the parameter req.params.id. An if 
//? statement checks to see if the constant post has a falsey value. If so, the if statement then returns a status 404 and attaches 
//? the message "Post not found" using the json method. An if statement checks to see if the value of post.user after the toString 
//? method is run on it does NOT equal the value of req.user.id. If this condition is met, the if statement then returns a status 401 
//? and attaches the message "User not authorized" using the json method. A constant with the name removeIndex is assigned to
//? the result of the map method followed by the result of the indexOf method that is attached to post.comments. First,
//? the map method takes in a single instance, comment, and runs the toString method on comment.user returning the post.comments 
//? array with the user property in string form, which allows for indexOf method to search through the new array looking for the value 
//? that equals req.user.id returns that index position and stores it in the removeIndex constant. The splice method is called on 
//? post.comments. The splice method takes in the parameters removeIndex and 1, respectively, which removes that comment from the array. 
//? An await call awaits the response from the save method that runs on post, using mongoose to update the document in the post collection.
//? A res.json is called with post.comments as its parameter. The catch block takes in error, as err, and passes in the error message into 
//? console.error. A status of 500 is sent via res.status and attaches the message "Server Error" using the send method.

// @route   POST API/posts
// @desc    Create a post
// @access  Private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // * Getting user profile minus password by getting the login token stored in req object. *
      const user = await User.findById(req.user.id).select("-password");
      // * Creating a new post object with the following object. *
      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      // * Waiting for new post to be made before saving it. *
      const post = await newPost.save();

      // Sending back user post as a response.
      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET API/posts
// @desc    Get all posts
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET API/posts/:id
// @desc    Get post by ID
// @access  Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE API/posts/:id
// @desc    Delete a post
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).sort({ date: -1 });

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // * Check user *
    // Using to string method to match req.user type
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT API/posts/like/:id
// @desc    Like a post
// @access  Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // * Check if the post has already been liked. *
    // Filtering through likes of a post to see if the user
    // who liked the post matches a user who has already
    // liked that post. If so we are returning a 400 response.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT API/posts/unlike/:id
// @desc    Unlike a post
// @access  Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // * Check if the post has not already been liked. *
    // Filtering through likes of a post to see if the user
    // who liked the post matches a user who has already
    // liked that post. If so we are returning a 400 response.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not yet been liked" });
    }

    // * Get remove index *
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST API/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // * Getting user profile minus password by getting the login token stored in req object. *
      const user = await User.findById(req.user.id).select("-password");
      // * Getting user post stored in params.id
      const post = await Post.findById(req.params.id);
      // * Creating a new comment object with the following object. *
      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      // * Adding new comment to array of comments. *
      post.comments.unshift(newComment);
      // * Saving post with the added comment. *
      await post.save();

      // Sending back the comment as a response.
      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE API/posts/comment/:id/:comment_id
// @desc    Delete a comment on a post
// @access  Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // Find post in database using params.
    const post = await Post.findById(req.params.id);

    // * Pull out comment *
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    // * Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // * Check user *
    // Checking to see if request to delete is by the same user that is logged in.
    // req.user.id is storing the logged in user.
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // * Get remove index *
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
