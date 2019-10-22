import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminInvoiceCreateStep3Component from "../../../../components/financials/admin/create/adminInvoiceCreateStep3Component";
import { pullOrderDetail } from "../../../../actions/orderActions";
import { validateInvoiceSectionThirdInput } from "../../../../validators/orderValidator";
import {
    localStorageGetIntegerItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem, localStorageGetFloatItem, localStorageGetBooleanOrNullItem, localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../../actions/staffActions';


class AdminInvoiceCreateStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Get the number of days this invoice quote is valid for and if nothing
        // was set then we need to set it to be 30 days.
        var invoiceQuoteDays = localStorageGetIntegerItem("workery-create-invoice-invoiceQuoteDays");
        if (invoiceQuoteDays === undefined || invoiceQuoteDays === null || invoiceQuoteDays === "" || isNaN(invoiceQuoteDays)) {
            invoiceQuoteDays = 30;
            localStorage.setItem("workery-create-invoice-invoiceQuoteDays", invoiceQuoteDays);
        }

        var line01Notes = localStorage.getItem("workery-create-invoice-line01Notes");
        if (line01Notes === undefined || line01Notes === null || line01Notes === "") {
            line01Notes = "Work completed as per quote";
            localStorage.setItem("workery-create-invoice-line01Notes", line01Notes);
        }

        this.state = {
            orderId: parseInt(id),
            invoiceQuoteDays: invoiceQuoteDays,
            invoiceQuoteDate: localStorageGetDateItem("workery-create-invoice-invoiceQuoteDate"),
            invoiceCustomersApproval: localStorage.getItem("workery-create-invoice-invoiceCustomersApproval"),
            line01Notes: line01Notes,
            line02Notes: localStorage.getItem("workery-create-invoice-line02Notes"),
            paymentDate: localStorageGetDateItem("workery-create-invoice-paymentDate"),
            cash: localStorageGetBooleanOrNullItem("workery-create-invoice-cash"),
            cheque: localStorageGetBooleanOrNullItem("workery-create-invoice-cheque"),
            debit: localStorageGetBooleanOrNullItem("workery-create-invoice-debit"),
            credit:localStorageGetBooleanOrNullItem("workery-create-invoice-credit"),
            other: localStorageGetBooleanOrNullItem("workery-create-invoice-other"),
            clientSignature: localStorage.getItem("workery-create-invoice-clientSignature"),
            associateSignDate: localStorageGetDateItem("workery-create-invoice-associateSignDate"),
            associateSignature: localStorage.getItem("workery-create-invoice-associateSignature"),
            errors: {},
            isLoading: false
        }

        this.onCheckboxChange = this.onCheckboxChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onInvoiceQuoteDateChange = this.onInvoiceQuoteDateChange.bind(this);
        this.onPaymentDateChange = this.onPaymentDateChange.bind(this);
        this.onAssociateSignDateChange = this.onAssociateSignDateChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onSuccessOrderCallback = this.onSuccessOrderCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullOrderDetail(this.state.orderId, this.onSuccessOrderCallback, this.onFailureCallback);
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

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
        localStorage.setItem('workery-create-invoice-'+[e.target.name], e.target.value);
    }

    onInvoiceQuoteDateChange(dateObj) {
        this.setState({
            invoiceQuoteDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-invoice-invoiceQuoteDate', dateObj);
    }

    onPaymentDateChange(dateObj) {
        this.setState({
            paymentDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-invoice-paymentDate', dateObj);
    }

    onAssociateSignDateChange(dateObj) {
        this.setState({
            associateSignDate: dateObj,
        })
        localStorageSetObjectOrArrayItem('workery-create-invoice-associateSignDate', dateObj);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-invoice-"+[e.target.name];
        const storageLabelKey =  "workery-create-invoice-"+[e.target.name].toString()+"-label";
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

    onCheckboxChange(e) {
        this.setState({
            [e.target.name]: e.target.checked,
        });
        localStorage.setItem('workery-create-invoice-'+[e.target.name], e.target.checked);
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState(
            { [e.target.name]: parseFloat(amount), }, ()=>{
                localStorage.setItem('workery-create-invoice-'+[e.target.name], parseFloat(amount) );
            }
        );
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform staff-side validation.
        const { errors, isValid } = validateInvoiceSectionThirdInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/financial/"+this.state.orderId+"/invoice/create/step-4");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            this.onFailureCallback(errors);
        }
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            orderId, errors, isLoading, invoiceQuoteDays, invoiceQuoteDate, invoiceCustomersApproval, line01Notes, line02Notes, paymentDate,
            cash, cheque, debit, credit, other,
            clientSignature, associateSignDate, associateSignature
        } = this.state;
        return (
            <AdminInvoiceCreateStep3Component
                orderId={orderId}
                order={this.props.orderDetail}
                invoiceQuoteDays={invoiceQuoteDays}
                invoiceQuoteDate={invoiceQuoteDate}
                invoiceCustomersApproval={invoiceCustomersApproval}
                line01Notes={line01Notes}
                line02Notes={line02Notes}
                onAmountChange={this.onAmountChange}
                paymentDate={paymentDate}
                cash={cash}
                cheque={cheque}
                debit={debit}
                credit={credit}
                other={other}
                clientSignature={clientSignature}
                associateSignDate={associateSignDate}
                associateSignature={associateSignature}
                errors={errors}
                isLoading={isLoading}
                onTextChange={this.onTextChange}
                onRadioChange={this.onRadioChange}
                onSelectChange={this.onSelectChange}
                onInvoiceQuoteDateChange={this.onInvoiceQuoteDateChange}
                onPaymentDateChange={this.onPaymentDateChange}
                onAssociateSignDateChange={this.onAssociateSignDateChange}
                onRadioChange={this.onRadioChange}
                onCheckboxChange={this.onCheckboxChange}
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
        putStaffContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessCallback, onFailureCallback))
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
)(AdminInvoiceCreateStep3Container);
