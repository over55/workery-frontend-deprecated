import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import OrderTransferStep5Component from "../../../../components/orders/operations/transfer/orderTransferStep5Component";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateTransferInput } from "../../../../validators/orderValidator";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    BASIC_STREET_TYPE_CHOICES,
    STREET_DIRECTION_CHOICES
} from '../../../../constants/api';
import { pullAssociateList, getAssociateReactSelectOptions } from "../../../../actions/associateActions";
import { pullClientList, getClientReactSelectOptions } from "../../../../actions/clientActions";
import { postOrderTransfer } from "../../../../actions/orderActions";



class OrderTransferOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            client: localStorage.getItem("workery-transfer-order-clientId"),
            clientGivenName: localStorage.getItem("workery-transfer-order-clientGivenName"),
            clientLastName: localStorage.getItem("workery-transfer-order-clientLastName"),
            associate: localStorage.getItem("workery-transfer-order-associateId"),
            associateGivenName: localStorage.getItem("workery-transfer-order-associateGivenName"),
            associateLastName: localStorage.getItem("workery-transfer-order-associateLastName"),
            reason: "Transfered work order.",
            errors: {},
            isLoading: false,
            id: parseInt(id),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onSubmitClick = this.onSubmitClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.job = this.state.id;
        postData.customer = this.state.client;

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: false, })
        this.props.setFlashMessage("success", "Order has been successfully transfered.");
        this.props.history.push("/order/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

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

    onSubmitClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateTransferInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors: [] }, ()=>{
                this.props.postOrderTransfer(
                    this.getPostData(),
                    this.onSuccessfulSubmissionCallback,
                    this.onFailedSubmissionCallback
                )
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailedSubmissionCallback(errors);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            associate, associateGivenName, associateLastName,
            client, clientGivenName, clientLastName,
            reason, errors, id, isLoading
        } = this.state;
        const order = this.props.orderDetail ? this.props.orderDetail : {};
        return (
            <OrderTransferStep5Component
                id={id}
                order={order}
                client={client}
                clientGivenName={clientGivenName}
                clientLastName={clientLastName}
                associate={associate}
                associateGivenName={associateGivenName}
                associateLastName={associateLastName}
                reason={reason}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onSubmitClick={this.onSubmitClick}
                orderDetail={this.props.orderDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullAssociateList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        pullClientList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        postOrderTransfer: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postOrderTransfer(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderTransferOperationContainer);
