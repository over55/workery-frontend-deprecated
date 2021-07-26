import axios from 'axios';
import msgpack from 'msgpack-lite';

import { getAPIBaseURL } from '../helpers/urlUtility';
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../helpers/jwtUtility';


/**
 *  Function returns a custom `Axios` instance tailered to the `Mikaponics`
 *  API web-service for authenticated users.
 *
 *  Features:
 *  (1) Inform API to expect request encoded with `MessagePack` format.
 *  (2) Inform API we expect responses to be in `MessagePack` format.
 *  (3) Attach authorization bearer token.
 *  (4) Integrate automatic refresh token when token expires.
 */
export default function getCustomAxios() {
    // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
    const accessToken = getAccessTokenFromLocalStorage();

    // Create a new Axios instance using our oAuth 2.0 bearer token
    // and various other headers.
    const customAxios = axios.create({
        baseURL: getAPIBaseURL(),
        headers: {
            'Authorization': "JWT " + accessToken,
            'Content-Type': 'application/json;',
            'Accept': 'application/json',
        },
    });

    // Attach our Axios "refesh token" interceptor.
    attachAxiosRefreshTokenHandler(customAxios);

    // Return our custom Axios instance for our application.
    return customAxios;
}
