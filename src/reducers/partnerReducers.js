import { PARTNER_LIST_REQUEST, PARTNER_LIST_FAILURE, PARTNER_LIST_SUCCESS } from '../constants/actionTypes';


const partnerListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case PARTNER_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case PARTNER_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case PARTNER_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default partnerListReducer;
