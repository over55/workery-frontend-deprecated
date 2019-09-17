import axios from 'axios';
import store from '../store';
import { camelizeKeys } from 'humps';
import msgpack from 'msgpack-lite';

import { LOGOUT_REQUEST, LOGOUT_FAILURE, LOGOUT_SUCCESS } from "../constants/actionTypes"
import { WORKERY_LOGOUT_API_ENDPOINT } from "../constants/api"
import { getAPIBaseURL } from '../helpers/urlUtility';


export const setLogoutRequest = () => ({
    type: LOGOUT_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setLogoutSuccess = () => ({
    type: LOGOUT_SUCCESS,
    payload: {
        isAPIRequestRunning: false,
        data: {},
        errors: {}
    },
});


export function attemptLogout() {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutSuccess()
        );
    }
}


export const setLogoutFailure = payload => ({
    type: LOGOUT_FAILURE,
    payload: payload,
});


export function postLogout(user, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setLogoutRequest()
        );

        // Create our oAuth 2.0 authenticated API header to use with our
        // submission.
        const config = {
            baseURL: getAPIBaseURL(),
            headers: {
                'Authorization': "JWT " + user.token,
                'Content-Type': 'application/json;',
                'Accept': 'application/json',
            },
        };

        const cred = {
            token: user.token
        };

        axios.post(WORKERY_LOGOUT_API_ENDPOINT, cred, config).then( (successResponse) => {
            const responseData = successResponse.data;

            // Update the global state of the application to store our
            // user profile for the application.
            store.dispatch(
                setLogoutSuccess()
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback({});
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                // Send our failure to the redux.
                store.dispatch(
                    setLogoutFailure({
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
