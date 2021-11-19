import axios from 'axios';
import store from '../store';
import { camelizeKeys, decamelize, decamelizeKeys } from 'humps';
import isEmpty from 'lodash/isEmpty';

import {
    STAFF_LIST_REQUEST, STAFF_LIST_FAILURE, STAFF_LIST_SUCCESS,
    STAFF_DETAIL_REQUEST, STAFF_DETAIL_FAILURE, STAFF_DETAIL_SUCCESS
} from '../constants/actionTypes';
import {
    WORKERY_STAFF_LIST_API_ENDPOINT,
    WORKERY_STAFF_DETAIL_API_ENDPOINT,
    WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_ACCOUNT_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_ARCHIVE_API_ENDPOINT,
    WORKERY_STAFF_CHANGE_ROLE_OPERATION_API_ENDPOINT,
    WORKERY_STAFF_CHANGE_PASSWORD_OPERATION_API_ENDPOINT,
    WORKERY_STAFF_AVATAR_CREATE_OR_UPDATE_API_ENDPOINT,
    WORKERY_STAFF_PERMANENTLY_DELETE_OPERATION_API_ENDPOINT
} from '../constants/api';
import getCustomAxios from '../helpers/customAxios';


////////////////////////////////////////////////////////////////////////////////
//                                 LIST                                       //
////////////////////////////////////////////////////////////////////////////////

export function pullStaffList(offset=0, limit=10, filtersMap=new Map(), onSuccessCallback=null, onFailureCallback=null) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffListRequest()
        );

        console.log(offset, limit, filtersMap, onSuccessCallback, onFailureCallback);

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Generate the URL from the map.
        // Note: Learn about `Map` iteration via https://hackernoon.com/what-you-should-know-about-es6-maps-dc66af6b9a1e
        let aURL = WORKERY_STAFF_LIST_API_ENDPOINT+"?offset="+offset+"&limit="+limit;
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
                setStaffListSuccess(data)
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

                console.log("pullStaffList | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffListFailure({
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

export function postStaffDetail(postData, successCallback, failedCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_LIST_API_ENDPOINT, decamelizedData).then( (successResponse) => {
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
                setStaffDetailSuccess(device)
            );
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function pullStaffDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to fetch latest user details.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        const aURL = WORKERY_STAFF_DETAIL_API_ENDPOINT+id;

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            const responseData = successResponse.data;
            // console.log(successResult); // For debugging purposes.

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            console.log("pullStaffDetail | Success:", staff); // For debugging purposes.

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("pullStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function putStaffDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_DETAIL_API_ENDPOINT+data.id, decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData =  exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({ isAPIRequestRunning: false, errors: errors, })
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

export function putStaffContactDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_CONTACT_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({ isAPIRequestRunning: false, errors: errors, })
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

export function putStaffAddressDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_ADDRESS_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({ isAPIRequestRunning: false, errors: errors, })
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

export function putStaffAccountDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_ACCOUNT_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({ isAPIRequestRunning: false, errors: errors, })
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

export function putStaffMetricsDetail(data, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(data);

        // Perform our API submission.
        customAxios.put(WORKERY_STAFF_METRICS_UPDATE_API_ENDPOINT.replace("XXX", data.id), decamelizedData).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({ isAPIRequestRunning: false, errors: errors, })
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
//                                OPERATIONS                                  //
////////////////////////////////////////////////////////////////////////////////

export function putStaffChangeRoleOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_CHANGE_ROLE_OPERATION_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = successResponse.data;

            let client = camelizeKeys(responseData);

            // Extra.
            client['isAPIRequestRunning'] = false;
            client['errors'] = {};

            // Update the global state of the application to store our
            // user client for the application.
            store.dispatch(
                setStaffDetailSuccess(client)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(client);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffChangeRoleOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function putStaffChangePasswordOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_CHANGE_PASSWORD_OPERATION_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = successResponse.data;

            let client = camelizeKeys(responseData);

            // Extra.
            client['isAPIRequestRunning'] = false;
            client['errors'] = {};

            // Update the global state of the application to store our
            // user client for the application.
            store.dispatch(
                setStaffDetailSuccess(client)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(client);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffChangePasswordOperation | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function postStaffAvatarCreateOrUpdate(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {

        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_AVATAR_CREATE_OR_UPDATE_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = successResponse.data;

            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postStaffResidentialUpgradeDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export function deleteStaffDetail(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.delete(WORKERY_STAFF_DETAIL_API_ENDPOINT+id).then( (successResponse) => {
            const responseData = successResponse.data;
            let staff = camelizeKeys(responseData);

            // Extra.
            staff['isAPIRequestRunning'] = false;
            staff['errors'] = {};

            // Update the global state of the application to store our
            // user staff for the application.
            store.dispatch(
                setStaffDetailSuccess(staff)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(staff);
            }

        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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
//                                  DELETE                                    //
////////////////////////////////////////////////////////////////////////////////


export function postArchiveUnarchiveOperation(postData, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // The following code will convert the `camelized` data into `snake case`
        // data so our API endpoint will be able to read it.
        let decamelizedData = decamelizeKeys(postData);

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_ARCHIVE_API_ENDPOINT, decamelizedData).then( (successResponse) => {
            // Decode our MessagePack (Buffer) into JS Object.
            const responseData = successResponse.data;

            let client = camelizeKeys(responseData);

            // Extra.
            client['isAPIRequestRunning'] = false;
            client['errors'] = {};

            // Update the global state of the application to store our
            // user client for the application.
            store.dispatch(
                setStaffDetailSuccess(client)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(client);
            }
        }).catch( (exception) => {
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("postStaffDeactivationDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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


export function postPermaDeleteOperation(id, onSuccessCallback, onFailureCallback) {
    return dispatch => {
        // Change the global state to attempting to log in.
        store.dispatch(
            setStaffDetailRequest()
        );

        // Generate our app's Axios instance.
        const customAxios = getCustomAxios();

        // Perform our API submission.
        customAxios.post(WORKERY_STAFF_PERMANENTLY_DELETE_OPERATION_API_ENDPOINT, { "staff_id": id }).then( (successResponse) => {
            let client = {
                isAPIRequestRunning: false,
                errors: {},
            };

            // Update the global state of the application to store our
            // user client for the application.
            store.dispatch(
                setStaffDetailSuccess(client)
            );

            // DEVELOPERS NOTE:
            // IF A CALLBACK FUNCTION WAS SET THEN WE WILL RETURN THE JSON
            // OBJECT WE GOT FROM THE API.
            if (onSuccessCallback) {
                onSuccessCallback(client);
            }

        }).catch( (exception) => {
            if (exception.response) {
                // Decode our MessagePack (Buffer) into JS Object.
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960

                let errors = camelizeKeys(responseData);

                console.log("putStaffDetail | error:", errors); // For debuggin purposes only.

                // Send our failure to the redux.
                store.dispatch(
                    setStaffDetailFailure({
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

export const setStaffListRequest = () => ({
    type: STAFF_LIST_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        offset: 0,
        errors: {}
    },
});


export const setStaffListFailure = (info) => ({
    type: STAFF_LIST_FAILURE,
    payload: info,
});


export const setStaffListSuccess = (info) => ({
    type: STAFF_LIST_SUCCESS,
    payload: info,
});


export const setStaffDetailRequest = () => ({
    type: STAFF_DETAIL_REQUEST,
    payload: {
        isAPIRequestRunning: true,
        errors: {}
    },
});


export const setStaffDetailSuccess = staffDetail => ({
    type: STAFF_DETAIL_SUCCESS,
    payload: staffDetail,
});


export const setStaffDetailFailure = staffDetail => ({
    type: STAFF_DETAIL_FAILURE,
    payload: staffDetail,
});



////////////////////////////////////////////////////////////////////////////////
//                                 UTILITY                                    //
////////////////////////////////////////////////////////////////////////////////

/**
 * Utility function takes the API data and converts it to HTML dropdown
 * options which will be consumed by the `react-select` library elements.
 */
export function getStaffReactSelectOptions(staffList=[], selectName="staff") {
    const staffOptions = [];
    const isNotProductionsEmpty = isEmpty(staffList) === false;
    if (isNotProductionsEmpty) {
        const results = staffList.results;
        const isResultsNotEmpty = isEmpty(results) === false;
        if (isResultsNotEmpty) {
            for (let i = 0; i < results.length; i++) {
                let staff = results[i];
                staffOptions.push({
                    selectName: selectName,
                    value: staff.id,
                    label: staff.fullName
                });
                // console.log(staff);
            }
        }
    }
    return staffOptions;
}
