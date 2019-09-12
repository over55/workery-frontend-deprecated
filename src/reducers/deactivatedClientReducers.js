import {
    ARCHIVED_CLIENT_LIST_REQUEST, ARCHIVED_CLIENT_LIST_FAILURE, ARCHIVED_CLIENT_LIST_SUCCESS
} from '../constants/actionTypes';


const deactivatedClientListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ARCHIVED_CLIENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ARCHIVED_CLIENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ARCHIVED_CLIENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default deactivatedClientListReducer;
