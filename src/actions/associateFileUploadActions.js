import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    ASSOCIATE_FILE_LIST_REQUEST, ASSOCIATE_FILE_LIST_FAILURE, ASSOCIATE_FILE_LIST_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_ASSOCIATE_FILE_LIST_API_ENDPOINT,
    WORKERY_ASSOCIATE_FILE_DETAIL_API_ENDPOINT,
    WORKERY_ASSOCIATE_FILE_ARCHIVE_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullAssociateFileUploadList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAssociateFileUploadListRequest()
        );

        console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_ASSOCIATE_FILE_LIST_API_ENDPOINT+"?page="+page+"&page_size="+sizePerPage;
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
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setAssociateFileUploadListSuccess(data)
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

                console.log("pullAssociateFileUploadList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateFileUploadListFailure({
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

export function postAssociateFileUpload(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setAssociateFileUploadListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_ASSOCIATE_FILE_LIST_API_ENDPOINT, decamelizedData).then( (successResponse) => {
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
                setAssociateFileUploadListSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postAssociateFileUploadList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateFileUploadListFailure({
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

export function deleteAssociateFileUpload(id, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setAssociateFileUploadListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_ASSOCIATE_FILE_ARCHIVE_API_ENDPOINT.replace("XXX", id);

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("deleteAssociateFileUpload | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setAssociateFileUploadListSuccess(profile)
            );

            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("deleteAssociateFileUpload | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setAssociateFileUploadListFailure({
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

        }).then( () => { // FINALLY
            // Do nothing.
        });

    }
}

////////////////////////////////////////////////////////////////////////////////
//                                REDUX ACTIONS                               //
////////////////////////////////////////////////////////////////////////////////

export const setAssociateFileUploadListRequest = () => ({
    type: ASSOCIATE_FILE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setAssociateFileUploadListFailure = (info) => ({
    type: ASSOCIATE_FILE_LIST_FAILURE,
    payload: info,
});


export const setAssociateFileUploadListSuccess = (info) => ({
    type: ASSOCIATE_FILE_LIST_SUCCESS,
    payload: info,
});

////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getAssociateFileUploadReactSelectOptions(associateFileList=[], selectName="associateFile") {
    const associateFileOptions = [];
    const isNotProductionsEmpty = isEmpty(associateFileList) === false;
    if (isNotProductionsEmpty) {
        const results = associateFileList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let associateFile = results[i];
                associateFileOptions.push({
                    selectName: selectName,
                    value: associateFile.id,
                    label: associateFile.text
                });
                // console.log(associateFile);
            }
        }
    }
    return associateFileOptions;
}
