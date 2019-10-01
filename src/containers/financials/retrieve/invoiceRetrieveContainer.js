import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceRetrieveComponent from "../../../components/financials/retrieve/invoiceRetrieveComponent";
import { pullOrderInvoice } from "../../../actions/orderActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { getSubdomain } from "../../../helpers/urlUtility";
import { WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_ENDPOINT } from '../../../constants/api';


class InvoiceRetrieveContainer extends Component {
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
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onDownloadInvoicePDFClick = this.onDownloadInvoicePDFClick.bind(this);
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

        // DEVELOPERS NOTE:
        // Because we have a multi-tenant architecture, we need to make calls
        // to the specific tenant for the CSV download API to work.
        const schema = getSubdomain();

        // Generate our URL.
        const url = process.env.REACT_APP_API_PROTOCOL + "://" + schema + "." + process.env.REACT_APP_API_DOMAIN + "/" + WORKERY_ORDER_INVOICE_DOWNLOAD_PDF_API_ENDPOINT.replace("XXX", this.state.id);
        console.log(url);

        // The following code will open up a new browser tab and load up the
        // URL that you inputted.
        var win = window.open(url, '_blank');
        win.focus();

        // Add minor delay and then run to remove the button ``disable`` state
        // so the user is able to click the download button again.
        setTimeout(() => {
            this.setState({ isLoading: false, errors: [], })
        }, 100); // 0.10 seconds.
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const invoice = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <InvoiceRetrieveComponent
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
)(InvoiceRetrieveContainer);
