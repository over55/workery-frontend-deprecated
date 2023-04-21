import getCustomAxios from "../Helpers/customAxios";
import { camelizeKeys } from 'humps';
import {
    WORKERY_TENANT_LIST_API_URL,
    WORKERY_TENANT_DETAIL_API_URL
} from "../Constants/API";

export function getOrganizationListAPI(onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(WORKERY_TENANT_LIST_API_URL).then((successResponse) => {
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

export function getOrganizationDetailAPI(sessionID, onSuccessCallback, onErrorCallback, onDoneCallback) {
    const axios = getCustomAxios();
    axios.get(WORKERY_TENANT_DETAIL_API_URL.replace("{id}", sessionID)).then((successResponse) => {
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
