import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    ONGOING_ORDER_LIST_REQUEST, ONGOING_ORDER_LIST_FAILURE, ONGOING_ORDER_LIST_SUCCESS,
    ONGOING_ORDER_DETAIL_REQUEST, ONGOING_ORDER_DETAIL_FAILURE, ONGOING_ORDER_DETAIL_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_ONGOING_ORDER_LIST_API_ENDPOINT,
    WORKERY_ONGOING_ORDER_DETAIL_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_TRANSFER_OPERATION_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_UNASSIGN_ASSOCIATE_OPERATION_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_CLOSE_OPERATION_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_REOPEN_OPERATION_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_POSTPONE_OPERATION_API_ENDPOINT,
    WORKERY_ONGOING_ORDER_RETRIEVE_UPDATE_API_ENDPOINT,
    // WORKERY_ONGOING_ORDER_FINANCIAL_UPDATE_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullOngoingOrderList(offset=1, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setOngoingOrderListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_ONGOING_ORDER_LIST_API_ENDPOINT+"?offset="+offset+"&limit="+limit;
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
                setOngoingOrderListSuccess(data)
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

                console.log("pullOngoingOrderList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setOngoingOrderListFailure({
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
//                                RETRIEVE                                    //
////////////////////////////////////////////////////////////////////////////////

export function pullOngoingOrderDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setOngoingOrderDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_ONGOING_ORDER_DETAIL_API_ENDPOINT+id+"/";

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let order = camelizeKeys(responseData);

            // Extra.
            order['isAPIRequestRunning'] = false;
            order['errors'] = {};

            console.log("pullOngoingOrderDetail | Success:", order); // For debugging purposes.

            // Update the global state of the application to store our
            // user order for the application.
            store.dispatch(
                setOngoingOrderDetailSuccess(order)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(order);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullOngoingOrderDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setOngoingOrderDetailFailure({
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

export function putOngoingOrderDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setOngoingOrderDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_ONGOING_ORDER_RETRIEVE_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setOngoingOrderDetailSuccess(device)
            );

            // Run our success callback function.
            onSuccessCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putOngoingOrderDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setOngoingOrderDetailFailure({
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

        }).then( () => {
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setOngoingOrderListRequest = () => ({
    type: ONGOING_ORDER_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setOngoingOrderListFailure = (info) => ({
    type: ONGOING_ORDER_LIST_FAILURE,
    payload: info,
});


export const setOngoingOrderListSuccess = (info) => ({
    type: ONGOING_ORDER_LIST_SUCCESS,
    payload: info,
});


export const setOngoingOrderDetailRequest = () => ({
    type: ONGOING_ORDER_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setOngoingOrderDetailSuccess = orderDetail => ({
    type: ONGOING_ORDER_DETAIL_SUCCESS,
    payload: orderDetail,
});


export const setOngoingOrderDetailFailure = orderDetail => ({
    type: ONGOING_ORDER_DETAIL_FAILURE,
    payload: orderDetail,
});
