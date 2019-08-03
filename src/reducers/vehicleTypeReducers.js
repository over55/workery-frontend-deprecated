import { VEHICLE_TYPE_LIST_REQUEST, VEHICLE_TYPE_LIST_FAILURE, VEHICLE_TYPE_LIST_SUCCESS } from '../constants/actionTypes';


const vehicleTypeListReducer = function(state = [], action = {}) {
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

export default vehicleTypeListReducer;
