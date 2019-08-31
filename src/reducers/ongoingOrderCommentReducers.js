import {
    ONGOING_ORDER_COMMENT_LIST_REQUEST, ONGOING_ORDER_COMMENT_LIST_FAILURE, ONGOING_ORDER_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const ongoingOrderCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ONGOING_ORDER_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
