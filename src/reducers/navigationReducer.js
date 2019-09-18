import { NAVIGATION_REQUEST, NAVIGATION_FAILURE, NAVIGATION_SUCCESS } from '../constants/actionTypes';


const navigationReducer = function(state = [], action = {}) {
    switch (action.type) {
        case NAVIGATION_REQUEST:
            return Object.assign({}, state, action.payload);

        case NAVIGATION_FAILURE:
            return Object.assign({}, state, action.payload);

        case NAVIGATION_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default navigationReducer;
