import {
    CLIENT_COMMENT_LIST_REQUEST, CLIENT_COMMENT_LIST_FAILURE, CLIENT_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const clientCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CLIENT_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CLIENT_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CLIENT_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
