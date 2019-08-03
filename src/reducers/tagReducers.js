import { TAG_LIST_REQUEST, TAG_LIST_FAILURE, TAG_LIST_SUCCESS } from '../constants/actionTypes';


const tagListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TAG_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TAG_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TAG_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default tagListReducer;
