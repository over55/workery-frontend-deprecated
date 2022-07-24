import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelizeKeys } from 'humps';

import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILURE } from "../constants/actionTypes";
import {
    WORKERY_PROFILE_API_URL,
    WORKERY_ACTIVATE_API_URL
} from "../constants/api";
import {
    getAccessTokenFromLocalStorage,
    setAccessTokenInLocalStorage,
    setRefreshTokenInLocalStorage,
    attachAxiosRefreshTokenHandler
} from '../helpers/jwtUtility';
import { getAPIBaseURL } from '../helpers/urlUtility';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                  REDUUX                                    //
////////////////////////////////////////////////////////////////////////////////

export const setProfileRequest = () => ({
    type: PROFILE_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setProfileSuccess = profile => ({
    type: PROFILE_SUCCESS,
    payload: profile,
});


export const setProfileFailure = profile => ({
    type: PROFILE_FAILURE,
    payload: profile,
});

////////////////////////////////////////////////////////////////////////////////
//                             STAFF / ASSOCIATE                              //
////////////////////////////////////////////////////////////////////////////////

export function pullProfile(successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setProfileRequest()
        );

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        // Run our Axios post.
        customAxios.get(WORKERY_PROFILE_API_URL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // console.log(profile); // For debugging purposes.

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProfileFailure({
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
//                                  STAFF                                     //
////////////////////////////////////////////////////////////////////////////////

export function postProfile(data, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProfileRequest()
        );

        const accessToken = getAccessTokenFromLocalStorage();

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // // Attach our Axios "refesh token" interceptor.
        // attachAxiosRefreshTokenHandler(customAxios);

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.post(WORKERY_PROFILE_API_URL, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
            // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
            setAccessTokenInLocalStorage(profile.accessToken);
            setRefreshTokenInLocalStorage(profile.refreshToken);

            // Update the global state of the application to store our
            // user device for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

            // Run our success callback function.
            successCallback(profile);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProfileFailure({
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

export function postActivateProfile(accessCode, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setProfileRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Custom dict.
        var data = {
            'pr_access_code': accessCode  // Set to `snake-case` for API server.
        };

        customAxios.post(WORKERY_ACTIVATE_API_URL, data).then( (successResponse) => {
            const responseData = successResponse.data;

            let profile = camelizeKeys(responseData);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setProfileSuccess(profile)
            );

            successCallback(profile);

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setProfileFailure({
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
