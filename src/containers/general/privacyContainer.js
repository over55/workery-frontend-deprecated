import React, { Component } from 'react';
import { camelizeKeys } from 'humps';
import axios from 'axios';

import PrivacyComponent from "../../components/general/privacyComponent";


class PrivacyContainer extends Component {

    constructor(props) {
        super(props);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onGetAPICall = this.onGetAPICall.bind(this);
        this.onPostAPICall = this.onPostAPICall.bind(this);
    }

    componentDidMount() {
        // Start the page at the top of the page.
        window.scrollTo(0, 0);

        this.onGetAPICall();
        this.onPostAPICall();
    }


    onGetAPICall() {

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            // baseURL: getAPIBaseURL(),
            headers: {
                // 'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/json;',
                'Accept': 'application/json',
            },
            // responseType: 'arraybuffer'
        })

        const aURL = process.env.REACT_APP_API_HOST+'/version';

        customAxios.get(aURL).then( (successResponse) => {
            let data = camelizeKeys(successResponse.data);

            // console.log("postLogin | successResponse:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => {
            if (exception.response) {
                let errors = camelizeKeys(exception.response.data);
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onPostAPICall() {

        // Create a new Axios instance using our oAuth 2.0 bearer token
        // and various other headers.
        const customAxios = axios.create({
            // baseURL: getAPIBaseURL(),
            headers: {
                // 'Authorization': "Bearer " + accessToken.token,
                'Content-Type': 'application/json;',
                'Accept': 'application/json',
            },
            // responseType: 'arraybuffer'
        })

        var buffer = {
            'name': "Frank Herbert"
        };

        const aURL = process.env.REACT_APP_API_HOST+'/hello';

        customAxios.post(aURL, buffer).then( (successResponse) => {
            let data = camelizeKeys(successResponse.data);

            console.log("SUCC:", data); // For debugging purposes.

            // Extra.
            data['isAPIRequestRunning'] = false;
            data['errors'] = {};
            this.onSuccessfulSubmissionCallback(data);

        }).catch( (exception) => {
            console.log(exception);
            if (exception.response) {
                let errors = camelizeKeys(exception.response.data);
                this.onFailedSubmissionCallback(errors);
            }

        }).then( () => {
            // Do nothing.
        });
    }

    onSuccessfulSubmissionCallback(data) {
        console.log(data);
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
    }

    render() {
        // Return our GUI.
        return (
            <PrivacyComponent />
        );
    }
}

export default PrivacyContainer;
