const mongoose = require('mongoose');

//TODO Purpose:
//TODO    1) To define a MongoDB collection for User data.

// How it works:
//    1) Creates a new Schema object and assigns it to the constant UserSchema.
//?    2) The new Schema object includes the property name that is defined as an object with the property type
//? set to String and a required property set to the boolean true.
//    3) The new Schema object includes the property email that is defined as an object with the property type
// set to String, required property set to the boolean true, and unique property set to the boolean true.
//?    4) The new Schema object includes the property password that is defined as an object with the property type
//? set to String and a required property set to the boolean true.
//    5) The new Schema object includes the property avatar that is defined as an object with the property type set
// to String.
//?    6) The new Schema object includes the property date that is defined as an object with the property type
//? set to Date and the property default set to Date.now. 

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema)