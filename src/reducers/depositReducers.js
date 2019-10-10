import {
    DEPOSIT_LIST_REQUEST, DEPOSIT_LIST_FAILURE, DEPOSIT_LIST_SUCCESS,
    DEPOSIT_DETAIL_REQUEST, DEPOSIT_DETAIL_FAILURE, DEPOSIT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const depositListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DEPOSIT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case DEPOSIT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case DEPOSIT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const depositDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case DEPOSIT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case DEPOSIT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case DEPOSIT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
