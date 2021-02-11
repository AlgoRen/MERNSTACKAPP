import axios from 'axios';

//TODO Purpose:
//TODO    1) To receive a token and set it as a default token using axios.defaults
//TODO    2) To delete a token that is set in axios.defaults if no token is found.

// How it works:
//    1) The function setAuthToken passes in token as a parameter.
//?    2) The function setAuthToken calls a if else statement that uses token as its conditional.
//? If token has a valid value then it will be set to axions.defaults.headers.common['x-auth-token]
//? so it can be accessed on any page of the application. Else, if the token does not have a valid 
//? value then a delete action is called on axios.defaults.headers.common['x-auth-token] to delete it.

const setAuthToken = token => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken