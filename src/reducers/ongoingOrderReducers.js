import {
    ONGOING_ORDER_LIST_REQUEST, ONGOING_ORDER_LIST_FAILURE, ONGOING_ORDER_LIST_SUCCESS,
    ONGOING_ORDER_DETAIL_REQUEST, ONGOING_ORDER_DETAIL_FAILURE, ONGOING_ORDER_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const ongoingOrderListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ONGOING_ORDER_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const ongoingOrderDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ONGOING_ORDER_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case ONGOING_ORDER_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
