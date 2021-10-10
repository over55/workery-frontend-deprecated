import {
    PRIVATE_FILE_LIST_REQUEST, PRIVATE_FILE_LIST_FAILURE, PRIVATE_FILE_LIST_SUCCESS,
    PRIVATE_FILE_DETAIL_REQUEST, PRIVATE_FILE_DETAIL_FAILURE, PRIVATE_FILE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const privateFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRIVATE_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const privateFileDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PRIVATE_FILE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case PRIVATE_FILE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
