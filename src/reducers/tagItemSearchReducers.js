import {
    TAG_ITEM_SEARCH_LIST_REQUEST,
    TAG_ITEM_SEARCH_LIST_FAILURE,
    TAG_ITEM_SEARCH_LIST_SUCCESS
} from '../constants/actionTypes';


export const tagItemSearchListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TAG_ITEM_SEARCH_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TAG_ITEM_SEARCH_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TAG_ITEM_SEARCH_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
