import {
    SKILL_SET_LIST_REQUEST, SKILL_SET_LIST_FAILURE, SKILL_SET_LIST_SUCCESS,
    SKILL_SET_DETAIL_REQUEST, SKILL_SET_DETAIL_FAILURE, SKILL_SET_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const skillSetListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SKILL_SET_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case SKILL_SET_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case SKILL_SET_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const skillSetDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case SKILL_SET_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case SKILL_SET_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case SKILL_SET_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
