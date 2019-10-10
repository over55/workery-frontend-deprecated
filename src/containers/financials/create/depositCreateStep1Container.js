import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import DepositCreateComponent from "../../../components/financials/create/depositCreateStep1Component";
import { pullOrderDetail } from "../../../actions/orderActions";
import { validateDepositInput } from "../../../validators/depositValidator";
import {
    localStorageGetIntegerItem, localStorageGetFloatItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem } from '../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../actions/staffActions';


class DepositCreateStep1Container extends Component {
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
            paidTo: localStorageGetIntegerItem("workery-create-deposit-paidTo"),
            paidFor: localStorageGetIntegerItem("workery-create-deposit-paidFor"),
            amount: localStorageGetFloatItem("workery-create-deposit-amount"),
            errors: {},
            isLoading: false
        }

        this.getPostData = this.getPostData.bind(this);
        this.onPaidAtChange = this.onPaidAtChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onClick = this.onClick.bind(this);
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
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(staff) {
        this.props.history.push("/deposit/"+this.state.id+"/full");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

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
        localStorageSetObjectOrArrayItem('workery-create-deposit-paidAt', dateObj);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-deposit-"+[e.target.name];
        const storageLabelKey =  "workery-create-deposit-"+[e.target.name].toString()+"-label";
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

        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState(
            { [e.target.name]: parseFloat(amount), }, ()=>{
                localStorage.setItem('workery-create-deposit-'+[e.target.name], parseFloat(amount) );
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
            this.props.history.push("/financial/"+this.state.orderId+"/deposit/create/step-2");

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
            orderId, errors, invoiceId, paidAt, depositMethod, paidTo, paidFor, amount
        } = this.state;
        return (
            <DepositCreateComponent
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
        putStaffContactDetail: (data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessfulSubmissionCallback, onFailedSubmissionCallback))
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
)(DepositCreateStep1Container);
