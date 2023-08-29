import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys, decamelizeKeys, decamelize } from 'humps';
import { DateTime } from "luxon";

import {
    WORKERY_CLIENTS_API_ENDPOINT,
    WORKERY_CLIENT_API_ENDPOINT,
    WORKERY_CLIENT_CREATE_COMMENT_OPERATION_API_ENDPOINT,
    // WORKERY_CLIENTS_SELECT_OPTIONS_API_ENDPOINT
} from "../Constants/API";


export function getClientListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // The following code will generate the query parameters for the url based on the map.
    let aURL = WORKERY_CLIENTS_API_ENDPOINT;
    filtersMap.forEach(
        (value, key) => {
            let decamelizedkey = decamelize(key)
            if (aURL.indexOf('?') > -1) {
                aURL += "&"+decamelizedkey+"="+value;
            } else {
                aURL += "?"+decamelizedkey+"="+value;
            }
        }
    )

    axios.get(aURL).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Bugfixes.
        // console.log("getClientListAPI | pre-fix | results:", data);
        if (data.results !== undefined && data.results !== null && data.results.length > 0) {
            data.results.forEach(
                (item, index) => {
                    item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
                    // console.log(item, index);
                }
            )
        }
        // console.log("getClientListAPI | post-fix | results:", data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postClientCreateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // BUGFIX
    decamelizedData.how_did_you_hear_about_us_id = data.howDidYouHearAboutUsID;
    delete decamelizedData.how_did_you_hear_about_us_i_d;

    // Run the API POST call.
    axios.post(WORKERY_CLIENTS_API_ENDPOINT, decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function getClientDetailAPI(organizationID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(WORKERY_CLIENT_API_ENDPOINT.replace("{id}", organizationID)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        let data = camelizeKeys(responseData);

        // BUGFIX
        data.howDidYouHearAboutUsID = data.howDidYouHearAboutUsId;

        // For debugging purposeso pnly.
        console.log(data);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function putClientUpdateAPI(data, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();

    // To Snake-case for API from camel-case in React.
    let decamelizedData = decamelizeKeys(data);

    // BUGFIX
    decamelizedData.how_did_you_hear_about_us_id = data.howDidYouHearAboutUsID;
    delete decamelizedData.how_did_you_hear_about_us_i_d;
    decamelizedData.id = data.id;
    delete decamelizedData.i_d;

    axios.put(WORKERY_CLIENT_API_ENDPOINT.replace("{id}", decamelizedData.id), decamelizedData).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function deleteClientAPI(id, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.delete(WORKERY_CLIENT_API_ENDPOINT.replace("{id}", id)).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

export function postClientCreateCommentOperationAPI(customerID, content, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    const data = {
        customer_id: customerID,
        content: content,
    };
    axios.post(WORKERY_CLIENT_CREATE_COMMENT_OPERATION_API_ENDPOINT, data).then((successResponse) => {
        const responseData = successResponse.data;

        // Snake-case from API to camel-case for React.
        const data = camelizeKeys(responseData);

        // Return the callback data.
        onSuccessCallback(data);
    }).catch( (exception) => {
        let errors = camelizeKeys(exception);
        onErrorCallback(errors);
    }).then(onDoneCallback);
}

// export function getClientSelectOptionListAPI(filtersMap=new Map(), onSuccessCallback, onErrorCallback, onDoneCallback) {
//     const axios = getCustomAxios();
//
//     // The following code will generate the query parameters for the url based on the map.
//     let aURL = WORKERY_CLIENTS_SELECT_OPTIONS_API_ENDPOINT;
//     filtersMap.forEach(
//         (value, key) => {
//             let decamelizedkey = decamelize(key)
//             if (aURL.indexOf('?') > -1) {
//                 aURL += "&"+decamelizedkey+"="+value;
//             } else {
//                 aURL += "?"+decamelizedkey+"="+value;
//             }
//         }
//     )
//
//     axios.get(aURL).then((successResponse) => {
//         const responseData = successResponse.data;
//
//         // Snake-case from API to camel-case for React.
//         const data = camelizeKeys(responseData);
//
//         // Bugfixes.
//         console.log("getClientSelectOptionListAPI | pre-fix | results:", data);
//         if (data.results !== undefined && data.results !== null && data.results.length > 0) {
//             data.results.forEach(
//                 (item, index) => {
//                     item.createdAt = DateTime.fromISO(item.createdAt).toLocaleString(DateTime.DATETIME_MED);
//                     console.log(item, index);
//                 }
//             )
//         }
//         console.log("getClientSelectOptionListAPI | post-fix | results:", data);
//
//         // Return the callback data.
//         onSuccessCallback(data);
//     }).catch( (exception) => {
//         let errors = camelizeKeys(exception);
//         onErrorCallback(errors);
//     }).then(onDoneCallback);
// }
//
