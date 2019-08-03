import { SERVICE_FEE_LIST_REQUEST, SERVICE_FEE_LIST_FAILURE, SERVICE_FEE_LIST_SUCCESS } from '../constants/actionTypes';


const serviceFeeListReducer = function(state = [], action = {}) {
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

export default serviceFeeListReducer;
