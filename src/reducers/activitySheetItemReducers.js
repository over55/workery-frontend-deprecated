import {
    ACTIVITY_SHEET_LIST_REQUEST, ACTIVITY_SHEET_LIST_FAILURE, ACTIVITY_SHEET_LIST_SUCCESS,
    ACTIVITY_SHEET_DETAIL_REQUEST, ACTIVITY_SHEET_DETAIL_FAILURE, ACTIVITY_SHEET_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const activitySheetItemListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ACTIVITY_SHEET_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ACTIVITY_SHEET_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ACTIVITY_SHEET_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const activitySheetItemDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ACTIVITY_SHEET_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ACTIVITY_SHEET_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ACTIVITY_SHEET_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
