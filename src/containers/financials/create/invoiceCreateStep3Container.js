import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import InvoiceCreateStep3Component from "../../../components/financials/create/invoiceCreateStep3Component";
import { pullOrderDetail } from "../../../actions/orderActions";
import { validateInvoiceSectionThirdInput } from "../../../validators/orderValidator";
import {
    localStorageGetIntegerItem, localStorageGetDateItem, localStorageSetObjectOrArrayItem, localStorageGetFloatItem, localStorageGetBooleanItem, localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../actions/staffActions';


class InvoiceCreateStep3Container extends Component {
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
        }

        this.state = {
            // LINE 01
            line01Quantity: localStorageGetIntegerItem("workery-create-invoice-line01Quantity"),
            line01Description: localStorage.getItem("workery-create-invoice-line01Description"),
            line01UnitPrice: localStorageGetFloatItem("workery-create-invoice-line01UnitPrice"),
            line01Amount: localStorageGetFloatItem("workery-create-invoice-line01Amount"),
            // LINE 02
            line02Quantity: localStorageGetIntegerItem("workery-create-invoice-line02Quantity"),
            line02Description: localStorage.getItem("workery-create-invoice-line02Description"),
            line02UnitPrice: localStorageGetFloatItem("workery-create-invoice-line02UnitPrice"),
            line02Amount: localStorageGetFloatItem("workery-create-invoice-line02Amount"),
            // LINE 03
            line03Quantity: localStorageGetIntegerItem("workery-create-invoice-line03Quantity"),
            line03Description: localStorage.getItem("workery-create-invoice-line03Description"),
            line03UnitPrice: localStorageGetFloatItem("workery-create-invoice-line03UnitPrice"),
            line03Amount: localStorageGetFloatItem("workery-create-invoice-line03Amount"),
            // LINE 04
            line04Quantity: localStorageGetIntegerItem("workery-create-invoice-line04Quantity"),
            line04Description: localStorage.getItem("workery-create-invoice-line04Description"),
            line04UnitPrice: localStorageGetFloatItem("workery-create-invoice-line04UnitPrice"),
            line04Amount: localStorageGetFloatItem("workery-create-invoice-line04Amount"),
            // LINE 05
            line05Quantity: localStorageGetIntegerItem("workery-create-invoice-line05Quantity"),
            line05Description: localStorage.getItem("workery-create-invoice-line05Description"),
            line05UnitPrice: localStorageGetFloatItem("workery-create-invoice-line05UnitPrice"),
            line05Amount: localStorageGetFloatItem("workery-create-invoice-line05Amount"),
            // LINE 06
            line06Quantity: localStorageGetIntegerItem("workery-create-invoice-line06Quantity"),
            line06Description: localStorage.getItem("workery-create-invoice-line06Description"),
            line06UnitPrice: localStorageGetFloatItem("workery-create-invoice-line06UnitPrice"),
            line06Amount: localStorageGetFloatItem("workery-create-invoice-line06Amount"),
            // LINE 07
            line07Quantity: localStorageGetIntegerItem("workery-create-invoice-line07Quantity"),
            line07Description: localStorage.getItem("workery-create-invoice-line07Description"),
            line07UnitPrice: localStorageGetFloatItem("workery-create-invoice-line07UnitPrice"),
            line07Amount: localStorageGetFloatItem("workery-create-invoice-line07Amount"),
            // LINE 08
            line08Quantity: localStorageGetIntegerItem("workery-create-invoice-line08Quantity"),
            line08Description: localStorage.getItem("workery-create-invoice-line08Description"),
            line08UnitPrice: localStorageGetFloatItem("workery-create-invoice-line08UnitPrice"),
            line08Amount: localStorageGetFloatItem("workery-create-invoice-line08Amount"),
            // LINE 09
            line09Quantity: localStorageGetIntegerItem("workery-create-invoice-line09Quantity"),
            line09Description: localStorage.getItem("workery-create-invoice-line09Description"),
            line09UnitPrice: localStorageGetFloatItem("workery-create-invoice-line09UnitPrice"),
            line09Amount: localStorageGetFloatItem("workery-create-invoice-line09Amount"),
            // LINE 10
            line10Quantity: localStorageGetIntegerItem("workery-create-invoice-line10Quantity"),
            line10Description: localStorage.getItem("workery-create-invoice-line10Description"),
            line10UnitPrice: localStorageGetFloatItem("workery-create-invoice-line10UnitPrice"),
            line10Amount: localStorageGetFloatItem("workery-create-invoice-line10Amount"),
            // LINE 11
            line11Quantity: localStorageGetIntegerItem("workery-create-invoice-line11Quantity"),
            line11Description: localStorage.getItem("workery-create-invoice-line11Description"),
            line11UnitPrice: localStorageGetFloatItem("workery-create-invoice-line11UnitPrice"),
            line11Amount: localStorageGetFloatItem("workery-create-invoice-line11Amount"),
            // LINE 12
            line12Quantity: localStorageGetIntegerItem("workery-create-invoice-line12Quantity"),
            line12Description: localStorage.getItem("workery-create-invoice-line12Description"),
            line12UnitPrice: localStorageGetFloatItem("workery-create-invoice-line12UnitPrice"),
            line12Amount: localStorageGetFloatItem("workery-create-invoice-line12Amount"),
            // LINE 13
            line13Quantity: localStorageGetIntegerItem("workery-create-invoice-line13Quantity"),
            line13Description: localStorage.getItem("workery-create-invoice-line13Description"),
            line13UnitPrice: localStorageGetFloatItem("workery-create-invoice-line13UnitPrice"),
            line13Amount: localStorageGetFloatItem("workery-create-invoice-line13Amount"),
            // LINE 14
            line14Quantity: localStorageGetIntegerItem("workery-create-invoice-line14Quantity"),
            line14Description: localStorage.getItem("workery-create-invoice-line14Description"),
            line14UnitPrice: localStorageGetFloatItem("workery-create-invoice-line14UnitPrice"),
            line14Amount: localStorageGetFloatItem("workery-create-invoice-line14Amount"),
            // LINE 15
            line15Quantity: localStorageGetIntegerItem("workery-create-invoice-line15Quantity"),
            line15Description: localStorage.getItem("workery-create-invoice-line15Description"),
            line15UnitPrice: localStorageGetFloatItem("workery-create-invoice-line15UnitPrice"),
            line15Amount: localStorageGetFloatItem("workery-create-invoice-line15Amount"),
            // Everything else.
            orderId: parseInt(id),
            invoiceId: localStorageGetIntegerItem("workery-create-invoice-invoiceId"),
            invoiceDate: localStorageGetDateItem("workery-create-invoice-invoiceDate"),
            invoiceQuoteDays: invoiceQuoteDays,
            invoiceQuoteDate: localStorageGetDateItem("workery-create-invoice-invoiceQuoteDate"),
            invoiceCustomersApproval: localStorage.getItem("workery-create-invoice-invoiceCustomersApproval"),
            line01Notes: localStorage.getItem("workery-create-invoice-line01Notes"),
            line02Notes: localStorage.getItem("workery-create-invoice-line02Notes"),
            paymentAmount: localStorageGetFloatItem("workery-create-invoice-paymentAmount"),
            paymentDate: localStorageGetDateItem("workery-create-invoice-paymentDate"),
            cash: localStorageGetBooleanItem("workery-create-invoice-cash"),
            cheque: localStorageGetBooleanItem("workery-create-invoice-cheque"),
            debit: localStorageGetBooleanItem("workery-create-invoice-debit"),
            credit:localStorageGetBooleanItem("workery-create-invoice-credit"),
            other: localStorageGetBooleanItem("workery-create-invoice-other"),
            clientSignature: localStorage.getItem("workery-create-invoice-clientSignature"),
            associateSignDate: localStorageGetDateItem("workery-create-invoice-associateSignDate"),
            associateSignature: localStorage.getItem("workery-create-invoice-associateSignature"),
            errors: {},
            isLoading: false
        }

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
            orderId, errors, isLoading, invoiceQuoteDays, invoiceQuoteDate, invoiceCustomersApproval, line01Notes, line02Notes, paymentAmount, paymentDate,
            cash, cheque, debit, credit, other,
            clientSignature, associateSignDate, associateSignature
        } = this.state;
        return (
            <InvoiceCreateStep3Component
                orderId={orderId}
                order={this.props.orderDetail}
                invoiceQuoteDays={invoiceQuoteDays}
                invoiceQuoteDate={invoiceQuoteDate}
                invoiceCustomersApproval={invoiceCustomersApproval}
                line01Notes={line01Notes}
                line02Notes={line02Notes}
                paymentAmount={paymentAmount}
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
)(InvoiceCreateStep3Container);
