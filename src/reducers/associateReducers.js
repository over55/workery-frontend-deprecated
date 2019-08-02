import { ASSOCIATE_LIST_REQUEST, ASSOCIATE_LIST_FAILURE, ASSOCIATE_LIST_SUCCESS } from '../constants/actionTypes';


const associateListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case ASSOCIATE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case ASSOCIATE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default associateListReducer;
