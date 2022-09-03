import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';

import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { WORKERY_LOGIN_API_URL } from "../constants/api"
import { setAccessTokenInLocalStorage, setRefreshTokenInLocalStorage, clearAllAccessAndRefreshTokensFromLocalStorage } from '../helpers/jwtUtility';
import { getAPIBaseURL } from '../helpers/urlUtility';
import getCustomAxios from '../helpers/customAxios';


export const setLoginRequest = () => ({
    type: LOGIN_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setLoginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload: payload,
});


export const setLoginFailure = payload => ({
    type: LOGIN_FAILURE,
    payload: payload,
});


export function postLogin(email, password, successCallback=null, failedCallback=null) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLoginRequest()
        );

        // DEVELOPERS NOTE:
        // WHEN ATTEMPTING TO LOGIN, WE NEED TO CLEAR ANY PREVIOUS SESSION TOKENS.
        clearAllAccessAndRefreshTokensFromLocalStorage();

        var data = {
            'email': email,
            'password': password,
        };

        axios.post(WORKERY_LOGIN_API_URL, data).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = successResponse.data;

            // Snake-case from API to camel-case for React.
            let profile = camelizeKeys(responseData);

            // For debugging purposes only.
            console.log(profile);

            // Extra.
            profile['isAPIRequestRunning'] = false;
            profile['errors'] = {};

            // SAVE OUR CREDENTIALS IN PERSISTENT STORAGE. THIS IS AN IMPORTANT
            // STEP BECAUSE OUR TOKEN UTILITY HELPER NEEDS THIS.
            setAccessTokenInLocalStorage(profile.accessToken);
            setRefreshTokenInLocalStorage(profile.refreshToken);

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLoginSuccess(profile)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (successCallback) {
                successCallback(profile);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setLoginFailure({
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

export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
        isAPIRequestRunning: false,
        data: {},
        errors: {}
    },
});


export function postLogout() {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutSuccess()
        );
    }
}
