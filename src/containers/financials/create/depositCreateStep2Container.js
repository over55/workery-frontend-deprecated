import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import DepositCreateStep2Component from "../../../components/financials/create/depositCreateStep2Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { postDepositDetail } from "../../../actions/depositActions";
import {
    localStorageGetIntegerItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem, localStorageGetFloatItem, localStorageGetBooleanItem, localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../actions/staffActions';


class DepositCreateStep2Container extends Component {
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
            orderId: parseInt(id),
            paidAt: localStorageGetDateItem("workery-create-deposit-paidAt"),
            depositMethod: localStorageGetIntegerItem("workery-create-deposit-depositMethod"),
            depositMethodLabel: localStorage.getItem("workery-create-deposit-depositMethod-label"),
            paidTo: localStorageGetIntegerItem("workery-create-deposit-paidTo"),
            paidToLabel: localStorage.getItem("workery-create-deposit-paidTo-label"),
            paidFor: localStorageGetIntegerItem("workery-create-deposit-paidFor"),
            paidForLabel: localStorage.getItem("workery-create-deposit-paidFor-label"),
            amount: localStorageGetFloatItem("workery-create-deposit-amount"),
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onSuccessOrderCallback = this.onSuccessOrderCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        const paidAtMoment = moment(this.state.paidAt);
        postData.paidAt = paidAtMoment.format("YYYY-MM-DD");

        postData.order = this.state.orderId;

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

    onFailureCallback(errors) {
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessCallback(response) {
        localStorageRemoveItemsContaining("workery-create-deposit-");
        this.props.setFlashMessage("success", "Deposit has been successfully created.");
        this.props.history.push("/financial/"+this.state.orderId+"/deposits");
    }

    onSuccessOrderCallback(response) {
        var { clientSignature, associateSignature } = this.state;
        if (clientSignature === undefined || clientSignature === null || clientSignature === "") {
            this.setState({
                clientSignature: response['customerFullName'],
            });
        }
        if (associateSignature === undefined || associateSignature === null || associateSignature === "") {
            this.setState({
                associateSignature: response['associateFullName'],
            });
        }
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({
            isLoading: true, errors: {}
        }, ()=>{
            this.props.postDepositDetail(
                this.getPostData(),
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
        const {
            orderId, errors, isLoading, invoiceId, paidAt, depositMethod, depositMethodLabel, paidTo, paidToLabel, paidFor, paidForLabel, amount
        } = this.state;
        return (
            <DepositCreateStep2Component
                orderId={orderId}
                order={this.props.orderDetail}
                paidAt={paidAt}
                depositMethod={depositMethod}
                depositMethodLabel={depositMethodLabel}
                paidTo={paidTo}
                paidToLabel={paidToLabel}
                paidFor={paidFor}
                paidForLabel={paidForLabel}
                amount={amount}
                errors={errors}
                isLoading={isLoading}
                onRadioChange={this.onRadioChange}
                onPaidAtChange={this.onPaidAtChange}
                onAmountChange={this.onAmountChange}
                onClick={this.onClick}
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
        putStaffContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessCallback, onFailureCallback))
        },
        postDepositDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postDepositDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositCreateStep2Container);
