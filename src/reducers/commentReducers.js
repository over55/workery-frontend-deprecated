import {
    COMMENT_LIST_REQUEST, COMMENT_LIST_FAILURE, COMMENT_LIST_SUCCESS
} from '../constants/actionTypes';


export const commentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
