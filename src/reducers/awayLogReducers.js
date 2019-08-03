import { AWAY_LOG_LIST_REQUEST, AWAY_LOG_LIST_FAILURE, AWAY_LOG_LIST_SUCCESS } from '../constants/actionTypes';


const awayLogListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case AWAY_LOG_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case AWAY_LOG_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case AWAY_LOG_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default awayLogListReducer;
