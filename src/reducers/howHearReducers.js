import { HOW_HEAR_LIST_REQUEST, HOW_HEAR_LIST_FAILURE, HOW_HEAR_LIST_SUCCESS } from '../constants/actionTypes';


const howHearListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case HOW_HEAR_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case HOW_HEAR_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default howHearListReducer;
