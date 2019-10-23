import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssociatePaymentDeleteComponent from "../../../../components/financials/associate/delete/associatePaymentDeleteComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { deleteDepositDetail } from "../../../../actions/depositActions";


class AssociatePaymentDeleteContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            paymentId: parseInt(id),
            isLoading: false,
            errors: [],
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onClick = this.onClick.bind(this);
        this.getPostData = this.getPostData.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.orderId = this.props.orderDetail.id;

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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | Fetched:", response);
        this.props.setFlashMessage("success", "Word order has been successfully cloned.");
        this.props.history.push("/company-financial/"+this.props.orderDetail.id+"/deposits");
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);

        this.setState({
            errors: errors,
            isLoading: false
        });

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

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ isLoading: true, errors: [], }, ()=>{
            this.props.deleteDepositDetail(
                this.props.orderDetail.id,
                this.state.paymentId,
                this.onSuccessCallback,
                this.onFailureCallback,
            );
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { paymentId, errors, isLoading, reason, reasonOther } = this.state;
        return (
            <AssociatePaymentDeleteComponent
                order={this.props.orderDetail}
                paymentId={paymentId}
                errors={errors}
                isLoading={isLoading}
                reason={reason}
                reasonOther={reasonOther}
                onClick={this.onClick}
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        deleteDepositDetail: (orderId, paymentId, onSuccessCallback, onFailureCallback) => {
            dispatch(
                deleteDepositDetail(orderId, paymentId, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssociatePaymentDeleteContainer);
