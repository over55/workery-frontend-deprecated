import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import InvoiceCreateStep3Component from "../../../components/financials/create/invoiceCreateStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { pullOrderDetail, invoiceOrderOperation } from "../../../actions/orderActions";
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
            invoiceQuoteDays: localStorageGetIntegerItem("workery-create-invoice-invoiceQuoteDays"),
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

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onInvoiceQuoteDateChange = this.onInvoiceQuoteDateChange.bind(this);
        this.onPaymentDateChange = this.onPaymentDateChange.bind(this);
        this.onAssociateSignDateChange = this.onAssociateSignDateChange.bind(this);
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

        const invoiceDateMoment = moment(this.state.invoiceDate);
        postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD");

        postData.line01Qty = this.state.line01Quantity;
        postData.line01Desc = this.state.line01Description;
        postData.line01Price = this.state.line01UnitPrice;
        postData.line01Amount = this.state.line01Amount;

        const invoiceQuoteDateMoment = moment(this.state.invoiceQuoteDate);
        postData.invoiceQuoteDate = invoiceQuoteDateMoment.format("YYYY-MM-DD");

        const paymentDateMoment = moment(this.state.paymentDate);
        postData.paymentDate = paymentDateMoment.format("YYYY-MM-DD");

        const associateSignDateMoment = moment(this.state.associateSignDate);
        postData.associateSignDate = associateSignDateMoment.format("YYYY-MM-DD");

        const cash = this.state.cash;
        const cheque = this.state.cheque;
        const debit = this.state.debit;
        const credit = this.state.credit;
        const other = this.state.other;
        if (cash === undefined || cash === null || cash === "") {
            postData.cash = false;
        } else {
            postData.cash = true;
        }
        if (cheque === undefined || cheque === null || cheque === "") {
            postData.cheque = false;
        } else {
            postData.cheque = true;
        }
        if (debit === undefined || debit === null || debit === "") {
            postData.debit = false;
        } else {
            postData.debit = true;
        }
        if (credit === undefined || credit === null || credit === "") {
            postData.credit = false;
        } else {
            postData.credit = true;
        }
        if (other === undefined || other === null || other === "") {
            postData.other = false;
        } else {
            postData.other = true;
        }

        postData.workOrderId = this.state.orderId;

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

    onSuccessCallback(response) {
        localStorageRemoveItemsContaining("workery-create-invoice-");
        this.props.setFlashMessage("success", "Invoice has been successfully created.");
        this.props.history.push("/financial/"+this.state.orderId+"/invoice");
    }

    onSuccessOrderCallback(response) {
        // Do nothing.
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
            this.setState({
                isLoading: true, errors: {}
            }, ()=>{
                this.props.invoiceOrderOperation(
                    this.getPostData(),
                    this.onSuccessCallback,
                    this.onFailureCallback,
                );
            })

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
        pullOrderDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
        invoiceOrderOperation: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                invoiceOrderOperation(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(InvoiceCreateStep3Container);
