import {
    TASK_LIST_REQUEST, TASK_LIST_FAILURE, TASK_LIST_SUCCESS,
    TASK_DETAIL_REQUEST, TASK_DETAIL_FAILURE, TASK_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const taskListReducer = function(state = [], action = {}) {
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


export const taskDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case TASK_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case TASK_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case TASK_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
