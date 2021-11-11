import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    PARTNER_LIST_REQUEST, PARTNER_LIST_FAILURE, PARTNER_LIST_SUCCESS,
    PARTNER_DETAIL_REQUEST, PARTNER_DETAIL_FAILURE, PARTNER_DETAIL_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_PARTNER_LIST_API_ENDPOINT,
    WORKERY_PARTNER_DETAIL_API_ENDPOINT,
    WORKERY_PARTNER_ADDRESS_UPDATE_API_ENDPOINT,
    WORKERY_PARTNER_CONTACT_UPDATE_API_ENDPOINT,
    WORKERY_PARTNER_METRICS_UPDATE_API_ENDPOINT,
    WORKERY_PARTNER_AVATAR_CREATE_OR_UPDATE_API_ENDPOINT,
    WORKERY_PARTNER_PERMANENTLY_DELETE_UPGRADE_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullPartnerList(offset=1, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setPartnerListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_PARTNER_LIST_API_ENDPOINT+"?offset="+offset+"&limit="+limit;
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
                setPartnerListSuccess(data)
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

                console.log("pullPartnerList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerListFailure({
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

export function postPartnerDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_PARTNER_LIST_API_ENDPOINT, decamelizedData).then( (successResponse) => {
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
                setPartnerDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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

export function pullPartnerDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_PARTNER_DETAIL_API_ENDPOINT+id;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let partner = camelizeKeys(responseData);

            // Extra.
            partner['isAPIRequestRunning'] = false;
            partner['errors'] = {};

            console.log("pullPartnerDetail | Success:", partner); // For debugging purposes.

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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

export function putPartnerContactDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_PARTNER_CONTACT_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let partner = camelizeKeys(responseData);

            // Extra.
            partner['isAPIRequestRunning'] = false;
            partner['errors'] = {};

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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


export function putPartnerAddressDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_PARTNER_ADDRESS_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let partner = camelizeKeys(responseData);

            // Extra.
            partner['isAPIRequestRunning'] = false;
            partner['errors'] = {};

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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


export function putPartnerMetricsDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_PARTNER_METRICS_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let partner = camelizeKeys(responseData);

            // Extra.
            partner['isAPIRequestRunning'] = false;
            partner['errors'] = {};

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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
//                                   DELETE                                   //
////////////////////////////////////////////////////////////////////////////////


export function deletePartnerDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.post(WORKERY_PARTNER_PERMANENTLY_DELETE_UPGRADE_API_ENDPOINT, { "partner_id": id }).then( (successResponse) => {
            let partner = {
                isAPIRequestRunning: false,
                errors: {},
            };

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }

        }).catch( (exception) => {
            if (exception.response) {
                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putPartnerDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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
//                                  OPERATIONS                                //
////////////////////////////////////////////////////////////////////////////////

export function postPartnerAvatarCreateOrUpdate(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setPartnerDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_PARTNER_AVATAR_CREATE_OR_UPDATE_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;

            let partner = camelizeKeys(responseData);

            // Extra.
            partner['isAPIRequestRunning'] = false;
            partner['errors'] = {};

            // Update the global state of the application to store our
            // user partner for the application.
            store.dispatch(
                setPartnerDetailSuccess(partner)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(partner);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postPartnerResidentialUpgradeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setPartnerDetailFailure({
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

export const setPartnerListRequest = () => ({
    type: PARTNER_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setPartnerListFailure = (info) => ({
    type: PARTNER_LIST_FAILURE,
    payload: info,
});


export const setPartnerListSuccess = (info) => ({
    type: PARTNER_LIST_SUCCESS,
    payload: info,
});


export const setPartnerDetailRequest = () => ({
    type: PARTNER_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setPartnerDetailSuccess = partnerDetail => ({
    type: PARTNER_DETAIL_SUCCESS,
    payload: partnerDetail,
});


export const setPartnerDetailFailure = partnerDetail => ({
    type: PARTNER_DETAIL_FAILURE,
    payload: partnerDetail,
});



////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getPartnerReactSelectOptions(partnerList=[], selectName="partner") {
    const partnerOptions = [];
    const isNotProductionsEmpty = isEmpty(partnerList) === false;
    if (isNotProductionsEmpty) {
        const results = partnerList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let partner = results[i];
                partnerOptions.push({
                    selectName: selectName,
                    value: partner.id,
                    label: partner.fullName
                });
                // console.log(partner);
            }
        }
    }
    return partnerOptions;
}
