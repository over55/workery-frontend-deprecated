import {
    VEHICLE_TYPE_LIST_REQUEST, VEHICLE_TYPE_LIST_FAILURE, VEHICLE_TYPE_LIST_SUCCESS,
    VEHICLE_TYPE_DETAIL_REQUEST, VEHICLE_TYPE_DETAIL_FAILURE, VEHICLE_TYPE_DETAIL_SUCCESS
} from '../constants/actionTypes';


export const vehicleTypeListReducer = function(state = [], action = {}) {
    switch (action.type) {
        case VEHICLE_TYPE_LIST_REQUEST:
            return Object.assign({}, state, action.payload);

        case VEHICLE_TYPE_LIST_FAILURE:
            return Object.assign({}, state, action.payload);

        case VEHICLE_TYPE_LIST_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}


export const vehicleTypeDetailReducer = function(state = [], action = {}) {
    switch (action.type) {
        case VEHICLE_TYPE_DETAIL_REQUEST:
            return Object.assign({}, state, action.payload);

        case VEHICLE_TYPE_DETAIL_FAILURE:
            return Object.assign({}, state, action.payload);

        case VEHICLE_TYPE_DETAIL_SUCCESS:
            return Object.assign({}, state, action.payload);

        default:
            return state;
    }
}
