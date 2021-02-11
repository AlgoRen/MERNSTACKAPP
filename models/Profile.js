const mongoose = require('mongoose');

//TODO Purpose:
//TODO    1) To define a MongoDB collection for Profile data.

// How it works:
//    1) Creates a new Schema object and assigns it to the constant PostSchema.
//?    2) The new Schema object includes the property user that is defined as an object with the property type
//? set to Schema.Types.ObjectId and a ref property set to the string "user". 
//    3) A new Schema object is created for company, website, location, status, skills, bio, and githubusername
// all defined as an object with a type property set to String, for the exception of the skills object where the
// type property is set to an array of String (String contained in array brackets) and a required property 
// set to the boolean true.
//?    4) The new Schema object includes the property experience that is defined as an array with an object 
//? containing: the properties title and company are defined as an object with the property type set to String and 
//? required set to the boolean true, the property location is defined as an object with the property type set to
//? String, the property from is defined as an object with the property type set to Date and the property required
//? set to the boolean true, the property to is defined as an object with the property type set to Date, the property
//? current is defined as an object with the property type set to Date and default set to the boolean false, the 
//? property description is defined as an object with the property type set to String.
//    5) The new Schema object includes the property education that is defined as an array with an object
// containing: the properties school, degree, and fieldofstudy are defined as an object with the property type
// set to String and required set to the boolean true, the property location is defined as an object with the 
// property type set to String, the property from is defined as an object with the property type set to Date and
// the property required set to the boolean true, the property to is defined as an object with the property type
// set to Date, the property current is defined as an object with the property type set to Date and default set 
// to the boolean false, the property description is defined as an object with the property type set to String. 
//?    6) The new Schema object includes the property social that is defined as an object containing: the properties
//? youtube, twitter, facebook, linkedin, instagram are defined as an object with the property type set to String.
//    7) The new Schema object includes the property date that is defined as an object with the property type
// set to Date and the property default set to Date.now.  

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String
    },
    skills: {
        type: [String], // An array of strings
        required: true
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [
        {
            title: {
                type: String,
                required: true
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    education: [
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                required: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: { 
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);