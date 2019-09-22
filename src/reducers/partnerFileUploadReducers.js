import {
    PARTNER_FILE_LIST_REQUEST, PARTNER_FILE_LIST_FAILURE, PARTNER_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const partnerFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PARTNER_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PARTNER_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PARTNER_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
