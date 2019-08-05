import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';
import msgpack from 'msgpack-lite';

import {
    CLIENT_LIST_REQUEST, CLIENT_LIST_FAILURE, CLIENT_LIST_SUCCESS,
    CLIENT_DETAIL_REQUEST, CLIENT_DETAIL_FAILURE, CLIENT_DETAIL_SUCCESS
} from '../constants/actionTypes';
import { WORKERY_CLIENT_LIST_API_ENDPOINT, WORKERY_CLIENT_DETAIL_API_ENDPOINT } from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullClientList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setClientListRequest()
        );

        console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_CLIENT_LIST_API_ENDPOINT+"?page="+page+"&page_size="+sizePerPage;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            console.log(responseData); // For debugging purposes.

            let data = camelizeKeys(responseData);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setClientListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullClientList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setClientListFailure({
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

export function postClientDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setClientDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.post(WORKERY_CLIENT_LIST_API_ENDPOINT, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));

            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setClientDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("postClientDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setClientDetailFailure({
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

export function pullClientDetail(user, slug) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setClientDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_CLIENT_DETAIL_API_ENDPOINT+slug;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("pullClientDetail | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setClientDetailSuccess(profile)
            );

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("pullClientDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setClientDetailFailure({
                        isAPIRequestRunning: false,
                        errors: errors
                    })
                );

                // // DEVELOPERS NOTE:
                // // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
                // // OBJECT WE GOT FROM THE API.
                // if (failedCallback) {
                //     failedCallback(errors);
                // }
            }

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                UPDATE                                      //
////////////////////////////////////////////////////////////////////////////////

export function putClientDetail(user, data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setClientDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Encode from JS Object to MessagePack (Buffer)
        var buffer = msgpack.encode(decamelizedData);

        // Perform our API submission.
        customAxios.put(WORKERY_CLIENT_DETAIL_API_ENDPOINT+data.slug, buffer).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = msgpack.decode(Buffer(successResponse.data));
            let device = camelizeKeys(responseData);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setClientDetailSuccess(device)
            );

            // Run our success callback function.
            successCallback(device);

        }).catch( (exception) => {
            if (exception.response) {
                const responseBinaryData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = msgpack.decode(Buffer(responseBinaryData));

                let errors = camelizeKeys(responseData);

                console.log("putClientDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setClientDetailFailure({
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
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setClientListRequest = () => ({
    type: CLIENT_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setClientListFailure = (info) => ({
    type: CLIENT_LIST_FAILURE,
    payload: info,
});


export const setClientListSuccess = (info) => ({
    type: CLIENT_LIST_SUCCESS,
    payload: info,
});


export const setClientDetailRequest = () => ({
    type: CLIENT_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setClientDetailSuccess = clientDetail => ({
    type: CLIENT_DETAIL_SUCCESS,
    payload: clientDetail,
});


export const setClientDetailFailure = clientDetail => ({
    type: CLIENT_DETAIL_FAILURE,
    payload: clientDetail,
});
