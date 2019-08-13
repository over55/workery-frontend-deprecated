import {
    ORDER_COMMENT_LIST_REQUEST, ORDER_COMMENT_LIST_FAILURE, ORDER_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const orderCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ORDER_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ORDER_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ORDER_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
