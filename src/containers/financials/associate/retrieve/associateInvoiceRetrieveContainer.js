import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import AssociateInvoiceRetrieveComponent from "../../../../components/financials/associate/retrieve/associateInvoiceRetrieveComponent";
import { pullOrderInvoice } from "../../../../actions/orderActions";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { getSubdomain } from "../../../../helpers/urlUtility";
import { WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_ENDPOINT } from '../../../../constants/api';
import { getAPIBaseURL } from '../../../../helpers/urlUtility';
import { getAccessTokenFromLocalStorage, attachAxiosRefreshTokenHandler } from '../../../../helpers/jwtUtility';


class AssociateInvoiceRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: parseInt(id),
            isLoading: false,
            invoice: {}
        }

        // Update functions.
        this.onSuccessPDFDownloadCallback = this.onSuccessPDFDownloadCallback.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onDownloadInvoicePDFClick = this.onDownloadInvoicePDFClick.bind(this);
        this.performDownloadPDF = this.performDownloadPDF.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOrderInvoice(this.state.id, this.onSuccessCallback, this.onFailureCallback);
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessPDFDownloadCallback(successResponse) {
        this.setState({ isLoading: false, })

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
    }

    /**
     *  The following function will request from the server our PDF invoice
     *  file and receive the data from the API web service.
     */
    performDownloadPDF() {
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

        const aURL = WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_ENDPOINT.replace("XXX", this.state.id);

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

    onSuccessCallback(response) {
        // console.log(response);
        this.setState({ isLoading: false, })
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onDownloadInvoicePDFClick(e) {
        e.preventDefault();

        // Disable the button so the user cannot double click and download
        // the file multiple times.
        this.setState({ isLoading: true, })

        // Make a request to our API web-service.
        this.performDownloadPDF();
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const invoice = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <AssociateInvoiceRetrieveComponent
                id={this.state.id}
                isLoading={this.state.isLoading}
                invoice={invoice}
                flashMessage={this.props.flashMessage}
                onDownloadInvoicePDFClick={this.onDownloadInvoicePDFClick}
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
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOrderInvoice: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderInvoice(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociateInvoiceRetrieveContainer);
