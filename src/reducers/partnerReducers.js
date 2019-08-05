import {
    PARTNER_LIST_REQUEST, PARTNER_LIST_FAILURE, PARTNER_LIST_SUCCESS,
    PARTNER_DETAIL_REQUEST, PARTNER_DETAIL_FAILURE, PARTNER_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const partnerListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PARTNER_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PARTNER_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PARTNER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const partnerDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PARTNER_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case PARTNER_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case PARTNER_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
