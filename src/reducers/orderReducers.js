import {
    ORDER_LIST_REQUEST, ORDER_LIST_FAILURE, ORDER_LIST_SUCCESS,
    ORDER_DETAIL_REQUEST, ORDER_DETAIL_FAILURE, ORDER_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const orderListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ORDER_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ORDER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const orderDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ORDER_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ORDER_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
