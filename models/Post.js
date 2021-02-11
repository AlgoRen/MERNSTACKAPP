const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//TODO Purpose:
//TODO    1) To define a MongoDB collection for Post data.

// How it works:
//    1) Creates a new Schema object and assigns it to the constant PostSchema.
//?    2) The new Schema object includes the property user that is defined as an object with the property type
//? set to Schema.Types.ObjectId and a ref property set to the string "user". 
//    3) The new Schema object includes the property text that is defined as an object with the property type set 
// to String and the property required set to the boolean true. 
//?    4) The new Schema object includes the property name that is defined as an object with the property type set 
//? to String.
//    5) The new Schema object includes the property avatar that is defined as an object with the property type set
// to String.
//?    6) The new Schema object includes the property likes that is defined as an array with an object containing 
//? the property user, which is then defined as an object with the property type set to Schema.Types.ObjectId and ref 
//? property set to the string "user". 
//    7) The new Schema object includes the property comments that is defined as an array with an object
// containing: user, which is then defined as an object with the property type set to Schema.Types.ObjectId
// and ref property set to the string "user", text which is defined as an object with the property type set to 
// String and the property required set to the boolean true, name which is defined as an object with a property
// type set to String, avatar which is defined as an object with property type set to String, and date which is 
// defined as an object with property type set to Date and the property default set to Date.now.
//?    8) The new Schema object includes the property date that is defined as an object with the property type
//? set to Date and the property default set to Date.now. 

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  text: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model("post", PostSchema);
