import {
    DEACTIVATED_CLIENT_LIST_REQUEST, DEACTIVATED_CLIENT_LIST_FAILURE, DEACTIVATED_CLIENT_LIST_SUCCESS
} from '../constants/actionTypes';


const deactivatedClientListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DEACTIVATED_CLIENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case DEACTIVATED_CLIENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case DEACTIVATED_CLIENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default deactivatedClientListReducer;
