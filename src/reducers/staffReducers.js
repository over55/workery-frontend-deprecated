import { STAFF_LIST_REQUEST, STAFF_LIST_FAILURE, STAFF_LIST_SUCCESS } from '../constants/actionTypes';


const staffListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case STAFF_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case STAFF_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case STAFF_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default staffListReducer;
