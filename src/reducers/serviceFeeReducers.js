import {
    SERVICE_FEE_LIST_REQUEST, SERVICE_FEE_LIST_FAILURE, SERVICE_FEE_LIST_SUCCESS,
    SERVICE_FEE_DETAIL_REQUEST, SERVICE_FEE_DETAIL_FAILURE, SERVICE_FEE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const serviceFeeListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SERVICE_FEE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case SERVICE_FEE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case SERVICE_FEE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const serviceFeeDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SERVICE_FEE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case SERVICE_FEE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case SERVICE_FEE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
