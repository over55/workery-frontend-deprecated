import {
    ORDER_FILE_LIST_REQUEST, ORDER_FILE_LIST_FAILURE, ORDER_FILE_LIST_SUCCESS,
} from '../constants/actionTypes';


export const orderFileListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ORDER_FILE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ORDER_FILE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ORDER_FILE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
