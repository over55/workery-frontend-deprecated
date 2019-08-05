import {
    CLIENT_LIST_REQUEST, CLIENT_LIST_FAILURE, CLIENT_LIST_SUCCESS,
    CLIENT_DETAIL_REQUEST, CLIENT_DETAIL_FAILURE, CLIENT_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const clientListReducer = function(state = [], action = {}) {
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


export const clientDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case CLIENT_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case CLIENT_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case CLIENT_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
