import { ORDER_LIST_REQUEST, ORDER_LIST_FAILURE, ORDER_LIST_SUCCESS } from '../constants/actionTypes';


const orderListReducer = function(state = [], action = {}) {
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

export default orderListReducer;
