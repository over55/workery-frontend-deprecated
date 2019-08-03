import { SKILL_SET_LIST_REQUEST, SKILL_SET_LIST_FAILURE, SKILL_SET_LIST_SUCCESS } from '../constants/actionTypes';


const skillSetListReducer = function(state = [], action = {}) {
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

export default skillSetListReducer;
