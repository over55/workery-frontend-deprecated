import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociateDownloadInvoicePDFOperationComponent from "../../../../components/financials/associate/operations/associateDownloadInvoicePDFOperationComponent";
import { getSubdomain } from "../../../../helpers/urlUtility";
import { WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_URL } from '../../../../constants/api';
import { getAPIBaseURL } from '../../../../helpers/urlUtility';
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../../../../helpers/jwtUtility';


class AssociateDownloadInvoicePDFOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            orderId: parseInt(id),
            isLoading: false,
            errors: [],
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onSuccessPDFDownloadCallback = this.onSuccessPDFDownloadCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        // window.close();

        // IMPORTANT: THIS IS THE ONLY WAY WE CAN GET THE ACCESS TOKEN.
        const accessToken = getAccessTokenFromLocalStorage();

        // Generate our app's Axios instance.
        // Create a new Axios instance which will be sending and receiving in
        // blob (binary data) format. Special thanks to the following URL:
        // https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
        const customAxios = axios.create({
            baseURL: getAPIBaseURL(),
            headers: {
                'Authorization': "JWT " + accessToken,
                'Content-Type': 'application/octet-stream;',
                'Accept': 'application/octet-stream',
            },
            responseType: 'blob', // important
        })

        // Attach our Axios "refesh token" interceptor.
        attachAxiosRefreshTokenHandler(customAxios);

        const aURL = WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_URL.replace("XXX", this.state.orderId);

        customAxios.get(aURL).then( (successResponse) => { // SUCCESS
            this.onSuccessPDFDownloadCallback(successResponse);
        }).catch( (exception) => { // ERROR
            if (exception.response) {
                const responseData = exception.response.data; // <=--- NOTE: https://github.com/axios/axios/issues/960
                console.log("pullOrderInvoice | error:", responseData); // For debuggin purposes only.
            }
        }).then( () => { // FINALLY
            // Do nothing.
        });
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessPDFDownloadCallback(successResponse) {
        /**
         *  The following code was taken from the following URL:
         *  https://gist.github.com/javilobo8/097c30a233786be52070986d8cdb1743
         */
        const url = window.URL.createObjectURL(new Blob([successResponse.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();

        /**
         *  The following code will close this current tab.
         */
        window.close();
    }

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:", response);
        this.props.setFlashMessage("success", "Word order has been successfully cloned.");
        this.props.history.push("/financial/"+response.cloneId+"");
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
        this.setState({errors: errors,});

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { orderId, errors, isLoading } = this.state;
        return (
            <AssociateDownloadInvoicePDFOperationComponent
                orderId={orderId}
                errors={errors}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {

    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateDownloadInvoicePDFOperationContainer);
