import {
    CLIENT_FILE_LIST_REQUEST, CLIENT_FILE_LIST_FAILURE, CLIENT_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const clientFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CLIENT_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CLIENT_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CLIENT_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
