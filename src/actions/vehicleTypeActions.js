import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    VEHICLE_TYPE_LIST_REQUEST, VEHICLE_TYPE_LIST_FAILURE, VEHICLE_TYPE_LIST_SUCCESS,
    VEHICLE_TYPE_DETAIL_REQUEST, VEHICLE_TYPE_DETAIL_FAILURE, VEHICLE_TYPE_DETAIL_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_VEHICLE_TYPE_LIST_API_ENDPOINT, WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullVehicleTypeList(offset=0, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setVehicleTypeListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_VEHICLE_TYPE_LIST_API_ENDPOINT+"?offset="+offset+"&limit="+limit;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;

            console.log(responseData); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['offset'] = offset;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setVehicleTypeListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullVehicleTypeList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setVehicleTypeListFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                 CREATE                                     //
////////////////////////////////////////////////////////////////////////////////

export function postVehicleTypeDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setVehicleTypeDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_VEHICLE_TYPE_LIST_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;

            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setVehicleTypeDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postVehicleTypeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setVehicleTypeDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function pullVehicleTypeDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setVehicleTypeDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT+id+"/";

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("pullVehicleTypeDetail | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setVehicleTypeDetailSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullVehicleTypeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setVehicleTypeDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                UPDATE                                      //
////////////////////////////////////////////////////////////////////////////////

export function putVehicleTypeDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setVehicleTypeDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.put(WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT+postData.id+"/", decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setVehicleTypeDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putVehicleTypeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setVehicleTypeDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (failedCallback) {
                    failedCallback(errors);
                }
            }

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                 DELETE                                     //
////////////////////////////////////////////////////////////////////////////////

export function deleteVehicleTypeDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setVehicleTypeDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_VEHICLE_TYPE_DETAIL_API_ENDPOINT+id+"/";

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("deleteVehicleTypeDetail | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setVehicleTypeDetailSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("deleteVehicleTypeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setVehicleTypeDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // DEVELOPERS NOTE:
                // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // OBJECT WE GOT FROM THE API.
                if (onFailureCallback) {
                    onFailureCallback(errors);
                }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setVehicleTypeListRequest = () => ({
    type: VEHICLE_TYPE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setVehicleTypeListFailure = (info) => ({
    type: VEHICLE_TYPE_LIST_FAILURE,
    payload: info,
});


export const setVehicleTypeListSuccess = (info) => ({
    type: VEHICLE_TYPE_LIST_SUCCESS,
    payload: info,
});


export const setVehicleTypeDetailRequest = () => ({
    type: VEHICLE_TYPE_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setVehicleTypeDetailSuccess = vehicleTypeDetail => ({
    type: VEHICLE_TYPE_DETAIL_SUCCESS,
    payload: vehicleTypeDetail,
});


export const setVehicleTypeDetailFailure = vehicleTypeDetail => ({
    type: VEHICLE_TYPE_DETAIL_FAILURE,
    payload: vehicleTypeDetail,
});


////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getVehicleTypeReactSelectOptions(vehicleTypeList=[], selectName="vehicleType") {
    const vehicleTypeOptions = [];
    const isNotProductionsEmpty = isEmpty(vehicleTypeList) === false;
    if (isNotProductionsEmpty) {
        const results = vehicleTypeList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let vehicleType = results[i];
                vehicleTypeOptions.push({
                    selectName: selectName,
                    value: vehicleType.id,
                    label: vehicleType.text
                });
                // console.log(vehicleType);
            }
        }
    }
    return vehicleTypeOptions;
}



/**
 * Utlity function takes an array of `VehicleType` primary keys and the `VehicleTypes` results
 * from the API and returns the HTML dropdown selections which will be consumed
 * by the GUI powered by `react-select`.
 */
export function getPickedVehicleTypeReactSelectOptions(vehicleTypePKsArray, vehicleTypeList=[], selectName="vehicleType") {
    const vehicleTypeOptions = [];
    const isAPIResponseNotEmpty = isEmpty(vehicleTypeList) === false;
    const isPKsArrayNotEmpty = isEmpty(vehicleTypePKsArray) === false;
    if (isAPIResponseNotEmpty && isPKsArrayNotEmpty) {
        const results = vehicleTypeList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < vehicleTypePKsArray.length; i++) {
                let vehicleTypePK = vehicleTypePKsArray[i];

                for (let j = 0; j < results.length; j++) {
                    let vehicleType = results[j];

                    if (vehicleType.id === vehicleTypePK) {
                        vehicleTypeOptions.push({
                            selectName: selectName,
                            value: vehicleType.id,
                            label: vehicleType.text
                        });
                        // console.log(vehicleType);
                    } // end IF

                } //end FOR

            } // end FOR

        } // end IF
    }
    return vehicleTypeOptions;
}
