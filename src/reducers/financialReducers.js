import { FINANCIAL_LIST_REQUEST, FINANCIAL_LIST_FAILURE, FINANCIAL_LIST_SUCCESS } from '../constants/actionTypes';


const financialListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case FINANCIAL_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case FINANCIAL_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case FINANCIAL_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default financialListReducer;
