import { INSURANCE_REQUIREMENT_LIST_REQUEST, INSURANCE_REQUIREMENT_LIST_FAILURE, INSURANCE_REQUIREMENT_LIST_SUCCESS } from '../constants/actionTypes';


const insuranceRequirementListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSURANCE_REQUIREMENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSURANCE_REQUIREMENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSURANCE_REQUIREMENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default insuranceRequirementListReducer;
