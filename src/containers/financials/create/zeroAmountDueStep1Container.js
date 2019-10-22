import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ZeroAmountDueStep1Component from "../../../components/financials/create/zeroAmountDueStep1Component";
import { pullOrderDetail } from "../../../actions/orderActions";
import { validateDepositInput } from "../../../validators/depositValidator";
import {
    localStorageGetIntegerItem, localStorageGetFloatItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem } from '../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../actions/staffActions';
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class ZeroAmountDueStep1Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        const paidAt = localStorageGetDateItem("workery-create-zero-amount-deposit-paidAt")
        const paidTo = localStorageGetIntegerItem("workery-create-zero-amount-deposit-paidTo")
        const amount = localStorageGetFloatItem("workery-create-zero-amount-deposit-amount");
        const invoiceAmountDue = localStorageGetFloatItem("workery-create-zero-amount-deposit-invoiceAmountDue");

        // Update the state.
        this.state = {
            orderId: parseInt(id),
            paidAt: paidAt,
            depositMethod: localStorageGetIntegerItem("workery-create-zero-amount-deposit-depositMethod"),
            paidTo: paidTo,
            paidFor: localStorageGetIntegerItem("workery-create-zero-amount-deposit-paidFor"),
            paidForLabel: localStorageGetIntegerItem("workery-create-zero-amount-deposit-paidFor-label"),
            amount: amount,
            invoiceAmountDue: invoiceAmountDue,
            errors: {},
            isLoading: false
        }

        // Enable functions.
        this.getPostData = this.getPostData.bind(this);
        this.onPaidAtChange = this.onPaidAtChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

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
        this.props.pullOrderDetail(this.state.orderId, this.onSuccessCallback, this.onFailureCallback);
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
        console.log(response);
        this.setState({ isLoading: false, })
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onPaidAtChange(dateObj) {
        this.setState({
            paidAt: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-zero-amount-deposit-paidAt', dateObj);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-zero-amount-deposit-"+[e.target.name];
        const storageLabelKey =  "workery-create-zero-amount-deposit-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // The purpose of this code is to fetch the amount due and subtract
        // it from the amount being paid in hopes to communicate to the user
        // that they have zeroed the results.
        let invoiceAmountDue = parseFloat(this.props.orderDetail.invoiceAmountDue);
        let amount = parseFloat(e.target.value.replace("$","").replace(",", ""));
        if (isNaN(amount)) {
            amount = 0;
        }
        invoiceAmountDue -= amount;

        // Update the state with our amount change and our calculated amount.
        this.setState(
            {
                [e.target.name]: amount,
                invoiceAmountDue: invoiceAmountDue,
            }, ()=>{
                localStorage.setItem('workery-create-zero-amount-deposit-'+[e.target.name], parseFloat(amount) );
            }
        );
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateDepositInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/financial/"+this.state.orderId+"/zero-amount-due/create/step-2");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.setState({ errors: errors, });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            orderId, errors, invoiceId, paidAt, depositMethod, paidTo, paidFor, amount, invoiceAmountDue
        } = this.state;
        return (
            <ZeroAmountDueStep1Component
                orderId={orderId}
                order={this.props.orderDetail}
                paidAt={paidAt}
                depositMethod={depositMethod}
                paidTo={paidTo}
                paidFor={paidFor}
                amount={amount}
                errors={errors}
                onRadioChange={this.onRadioChange}
                onPaidAtChange={this.onPaidAtChange}
                onAmountChange={this.onAmountChange}
                onClick={this.onClick}
                invoiceAmountDue={invoiceAmountDue}
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
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ZeroAmountDueStep1Container);
