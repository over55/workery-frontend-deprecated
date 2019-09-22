import {
    ASSOCIATE_FILE_LIST_REQUEST, ASSOCIATE_FILE_LIST_FAILURE, ASSOCIATE_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const associateFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ASSOCIATE_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
