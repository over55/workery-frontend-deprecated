import {
    STAFF_FILE_LIST_REQUEST, STAFF_FILE_LIST_FAILURE, STAFF_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const staffFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case STAFF_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case STAFF_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case STAFF_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
