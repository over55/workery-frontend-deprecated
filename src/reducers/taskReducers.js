import { TASK_LIST_REQUEST, TASK_LIST_FAILURE, TASK_LIST_SUCCESS } from '../constants/actionTypes';


const taskListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}

export default taskListReducer;
