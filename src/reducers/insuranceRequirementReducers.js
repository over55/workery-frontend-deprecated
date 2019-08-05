import {
    INSURANCE_REQUIREMENT_LIST_REQUEST, INSURANCE_REQUIREMENT_LIST_FAILURE, INSURANCE_REQUIREMENT_LIST_SUCCESS,
    INSURANCE_REQUIREMENT_DETAIL_REQUEST, INSURANCE_REQUIREMENT_DETAIL_FAILURE, INSURANCE_REQUIREMENT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const insuranceRequirementListReducer = function(state = [], action = {}) {
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


export const insuranceRequirementDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case INSURANCE_REQUIREMENT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case INSURANCE_REQUIREMENT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case INSURANCE_REQUIREMENT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
