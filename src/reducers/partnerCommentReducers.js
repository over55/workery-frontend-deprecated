import {
    PARTNER_COMMENT_LIST_REQUEST, PARTNER_COMMENT_LIST_FAILURE, PARTNER_COMMENT_LIST_SUCCESS,
} from '../constants/actionTypes';


export const partnerCommentListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PARTNER_COMMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PARTNER_COMMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PARTNER_COMMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
