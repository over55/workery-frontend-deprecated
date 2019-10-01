import React, { Component } from 'react';
import { connect } from 'react-redux';

import InvoiceRetrieveComponent from "../../../components/financials/retrieve/invoiceRetrieveComponent";
import { pullOrderInvoice } from "../../../actions/orderActions";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';


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
