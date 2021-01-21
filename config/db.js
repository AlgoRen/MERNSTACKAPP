const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

// Purpose:
//    1) To connect to a MongoDB database

// How it works:
//    1) A constant called connectDB is used with the async middleware taking in no parameters.
//    2) The function runs a try-catch. In the try block, we await mongoose to connect using the connect
// method on the mongoose package. In the connect method, we pass in the db constant that holds our mongoURI key
// that we store in a JSON object within a file in the config folder. Note, you will not see one in the repo
// as it best practice to never expose any of your database or GitHub secrets/tokens in your repo, so mine are
// hidden via .gitignore, and I suggest that you do the same. The connect method also takes in an object that sets
// a series of options to the following boolean values, these are what I needed to set for the application to work
// for me, but depending on your mongoose, routing, and port settings, you may or may not need to change these. 
//    3) In the catch block, we console.error the error message and do a process.exit passing in 1. 
// P.S, Anyone, know why we pass in 1?

const connectDB = async () => {
    try {
        await mongoose.connect(db, 
            { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
            }
        );

        console.log('MongoDB Connected...');
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = connectDB;