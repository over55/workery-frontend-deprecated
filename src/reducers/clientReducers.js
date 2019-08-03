import { CLIENT_LIST_REQUEST, CLIENT_LIST_FAILURE, CLIENT_LIST_SUCCESS } from '../constants/actionTypes';


const clientListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CLIENT_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case CLIENT_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case CLIENT_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default clientListReducer;
