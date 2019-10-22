import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminInvoiceThirdSectionUpdateComponent from "../../../../components/financials/admin/update/adminInvoiceThirdSectionUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { pullOrderInvoice, putInvoiceThirdSection } from "../../../../actions/orderActions";
import { validateInvoiceSectionThirdInput } from "../../../../validators/orderValidator";
import {
    localStorageGetIntegerItem,
    localStorageGetDateItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetFloatItem,
    localStorageGetBooleanOrNullItem,
    localStorageRemoveItemsContaining
} from '../../../../helpers/localStorageUtility';
import { putStaffContactDetail } from '../../../../actions/staffActions';


class AdminInvoiceThirdSectionUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        var invoiceQuoteDate = new Date(this.props.orderDetail.invoiceQuoteDate);
        invoiceQuoteDate.setMinutes( invoiceQuoteDate.getMinutes() + invoiceQuoteDate.getTimezoneOffset() );
        var paymentDate = new Date(this.props.orderDetail.paymentDate);
        paymentDate.setMinutes( paymentDate.getMinutes() + paymentDate.getTimezoneOffset() );
        var associateSignDate = new Date(this.props.orderDetail.associateSignDate);
        associateSignDate.setMinutes( associateSignDate.getMinutes() + associateSignDate.getTimezoneOffset() );

        this.state = {
            orderId: parseInt(id),
            invoiceQuoteDays: this.props.orderDetail.invoiceQuoteDays,
            invoiceQuoteDate: invoiceQuoteDate,
            invoiceCustomersApproval: this.props.orderDetail.invoiceCustomersApproval,
            line01Notes: this.props.orderDetail.line01Notes,
            line02Notes: this.props.orderDetail.line02Notes,
            paymentDate: paymentDate,
            cash: this.props.orderDetail.cash,
            cheque: this.props.orderDetail.cheque,
            debit: this.props.orderDetail.debit,
            credit: this.props.orderDetail.credit,
            other:  this.props.orderDetail.other,
            clientSignature: this.props.orderDetail.clientSignature,
            associateSignDate: associateSignDate,
            associateSignature: this.props.orderDetail.associateSignature,
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

        const invoiceQuoteDateMoment = moment(this.state.invoiceQuoteDate);
        postData.invoiceQuoteDate = invoiceQuoteDateMoment.format("YYYY-MM-DD");

        const paymentDateMoment = moment(this.state.paymentDate);
        postData.paymentDate = paymentDateMoment.format("YYYY-MM-DD");

        const associateSignDateMoment = moment(this.state.associateSignDate);
        postData.associateSignDate = associateSignDateMoment.format("YYYY-MM-DD");

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
        this.props.pullOrderInvoice(this.state.orderId, this.onSuccessOrderCallback, this.onFailureCallback);
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

    onSuccessfulSubmissionCallback(response) {
        console.log("onSuccessfulSubmissionCallback |", response);
        this.props.setFlashMessage("success", "Invoice has been successfully update.");
        this.props.history.push("/financial/"+this.state.orderId+"/invoice");
    }

    onFailedSubmissionCallback(errors) {
        this.setState({ errors: errors, });

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
            this.props.putInvoiceThirdSection(this.getPostData(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);

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
            <AdminInvoiceThirdSectionUpdateComponent
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
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putStaffContactDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(putStaffContactDetail(data, onSuccessCallback, onFailureCallback))
        },
        pullOrderInvoice: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderInvoice(id, onSuccessCallback, onFailureCallback)
            )
        },
        putInvoiceThirdSection: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putInvoiceThirdSection(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminInvoiceThirdSectionUpdateContainer);
