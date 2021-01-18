import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Purpose:
//    1) To handle alert related actions and return the appropriate state. 

// How it works: 
//    1) The intialState constant is set to an empty array.
//    2) An export default function is made that passes in state, that is given the value
// of intialState, and action as a parameter. 
//    3) The action parameter is deconstructed to type and payload. 
//    4) A switch case is called that checks type.
//    5) If the type that is passed into the switch case is equal to SET_ALERT then a 
// array containing the all of state array and the payload constant. 
//    6) If the type that is passed into the switch case is equal to REMOVE_ALERT then a
// filter method is called on state. The filter method passes in a single instance, alert,
// and returns the values where alert.id does NOT equal the payload. The result of state.filter
// is then returned.
//    7) If the type that is passed into the switch case is equal to any other condition then a
// default case is called that returns the state array. 

const initialState = [];

export default function(state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case SET_ALERT:
            return [...state, payload];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}