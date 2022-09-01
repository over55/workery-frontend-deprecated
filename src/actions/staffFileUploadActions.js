import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    STAFF_FILE_LIST_REQUEST, STAFF_FILE_LIST_FAILURE, STAFF_FILE_LIST_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_STAFF_FILE_LIST_API_URL,
    WORKERY_STAFF_FILE_DETAIL_API_URL,
    WORKERY_STAFF_FILE_ARCHIVE_API_URL
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullStaffFileUploadList(page=1, sizePerPage=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffFileUploadListRequest()
        );

        console.log(page, sizePerPage, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_STAFF_FILE_LIST_API_URL+"?page="+page+"&page_size="+sizePerPage;
        filtersMap.forEach(
            (value, key) => {
                let decamelizedkey = decamelize(key)
                aURL += "&"+decamelizedkey+"="+value;
            }
        )

        // Make the API call.
        customAxios.get(aURL).then( (successResponse) => { // SUCCESS

            let data = camelizeKeys(successResponse.data);

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            data['page'] = page;

            // console.log(data); // For debugging purposes.

            // Update the global state of the application to store our
            // user data for the application.
            store.dispatch(
                setStaffFileUploadListSuccess(data)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(data);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                let errors = camelizeKeys(exception.response.data);

                console.log("pullStaffFileUploadList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffFileUploadListFailure({
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

export function postStaffFileUpload(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffFileUploadListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_FILE_LIST_API_URL, decamelizedData).then( (successResponse) => {
            let device = camelizeKeys(successResponse.data);

            // Extra.
            device['isAPIRequestRunning'] = false;
            device['errors'] = {};

            // Run our success callback function.
            successCallback(device);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setStaffFileUploadListSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                let errors = camelizeKeys(exception.response.data);

                console.log("postStaffFileUploadList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffFileUploadListFailure({
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

export function deleteStaffFileUpload(id, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffFileUploadListRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_STAFF_FILE_ARCHIVE_API_URL.replace("XXX", id);

        customAxios.delete(aURL).then( (successResponse) => { // SUCCESS
            let profile = camelizeKeys(successResponse.data);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            console.log("deleteStaffFileUpload | Success:", profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setStaffFileUploadListSuccess(profile)
            );

            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                let errors = camelizeKeys(exception.response.data);

                console.log("deleteStaffFileUpload | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffFileUploadListFailure({
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

export const setStaffFileUploadListRequest = () => ({
    type: STAFF_FILE_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        page: 1,
        errors: {}
    },
});


export const setStaffFileUploadListFailure = (info) => ({
    type: STAFF_FILE_LIST_FAILURE,
    payload: info,
});


export const setStaffFileUploadListSuccess = (info) => ({
    type: STAFF_FILE_LIST_SUCCESS,
    payload: info,
});

////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getStaffFileUploadReactSelectOptions(staffFileList=[], selectName="staffFile") {
    const staffFileOptions = [];
    const isNotProductionsEmpty = isEmpty(staffFileList) === false;
    if (isNotProductionsEmpty) {
        const results = staffFileList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let staffFile = results[i];
                staffFileOptions.push({
                    selectName: selectName,
                    value: staffFile.id,
                    label: staffFile.text
                });
                // console.log(staffFile);
            }
        }
    }
    return staffFileOptions;
}
