import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import FinancialUpdateComponent from "../../../components/financials/update/financialUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { getTagReactSelectOptions, getPickedTagReactSelectOptions, pullTagList } from "../../../actions/tagActions";
import { putOrderFinancialDetail } from '../../../actions/orderActions';
import { pullServiceFeeList, getServiceFeeReactSelectOptions } from '../../../actions/serviceFeeActions';
import { validateFinancialUpdateInput } from '../../../validators/orderValidator';


class FinancialUpdateContainer extends Component {
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
            errors: {},
            isLoading: false,
            id: parseInt(id),
            paymentStatus: this.props.orderDetail.state,
            invoiceDate: this.props.orderDetail.invoiceDate ? new Date(this.props.orderDetail.invoiceDate) : null,
            invoiceIds: this.props.orderDetail.invoiceIds,
            invoiceQuotedLabourAmount: parseFloat(this.props.orderDetail.invoiceQuotedLabourAmount),
            invoiceQuotedMaterialAmount: parseFloat(this.props.orderDetail.invoiceQuotedMaterialAmount),
            invoiceTotalQuoteAmount: parseFloat(this.props.orderDetail.invoiceTotalQuoteAmount),
            invoiceLabourAmount: parseFloat(this.props.orderDetail.invoiceLabourAmount),
            invoiceMaterialAmount: parseFloat(this.props.orderDetail.invoiceMaterialAmount),
            invoiceTaxAmount: parseFloat(this.props.orderDetail.invoiceTaxAmount),
            invoiceServiceFee: parseInt(this.props.orderDetail.invoiceServiceFee),
            invoiceServiceFeeAmount: parseFloat(this.props.orderDetail.invoiceServiceFeeAmount),
            invoiceServiceFeePaymentDate: this.props.orderDetail.invoiceServiceFeePaymentDate ? new Date(this.props.orderDetail.invoiceServiceFeePaymentDate) : null,
            invoiceActualServiceFeeAmountPaid: parseFloat(this.props.orderDetail.invoiceActualServiceFeeAmountPaid),
            invoiceBalanceOwingAmount: parseFloat(this.props.orderDetail.invoiceBalanceOwingAmount),
            visits: parseInt(this.props.orderDetail.visits),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onInvoiceDateChange = this.onInvoiceDateChange.bind(this);
        this.onInvoiceServiceFeePaymentDate = this.onInvoiceServiceFeePaymentDate.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onSuccessfulTagsFetchCallback = this.onSuccessfulTagsFetchCallback.bind(this);
        this.onSuccessfulSkillSetsFetchCallback = this.onSuccessfulSkillSetsFetchCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        // Map the fields
        postData.state = this.state.paymentStatus;

        const invoiceDateMoment = moment(this.state.invoiceDate);
        postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD");

        const invoiceServiceFeePaymentDateMoment = moment(this.state.invoiceServiceFeePaymentDate);
        postData.invoiceServiceFeePaymentDate = invoiceServiceFeePaymentDateMoment.format("YYYY-MM-DD");

        /*
         *  Compute the total quoted amount.
         */
        postData.invoiceTotalQuoteAmount = this.state.invoiceQuotedMaterialAmount + this.state.invoiceQuotedLabourAmount;

        /*
         *  Compute the total amount.
         */
        postData.invoiceTotalAmount = this.state.invoiceLabourAmount + this.state.invoiceMaterialAmount + this.state.invoiceTaxAmount;

        /*
         *  Compute balance owing.
         */
        postData.invoiceBalanceOwingAmount = this.state.invoiceServiceFeeAmount - this.state.invoiceActualServiceFeeAmountPaid;

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
        this.props.pullServiceFeeList(1, 1000);
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
        this.setState({ errors: {}, isLoading: true, })
        this.props.setFlashMessage("success", "Order has been successfully updated.");
        this.props.history.push("/financial/"+this.state.id);
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onSuccessfulSkillSetsFetchCallback(skillSets) {
        this.setState({ isSkillSetsLoading: false, });
    }

    onSuccessfulTagsFetchCallback(tags) {
        this.setState({ isTagsLoading: false, });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState({
            [e.target.name]: parseFloat(amount),
        });
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-create-client-"+[e.target.name];
        const storageLabelKey =  "workery-create-client-"+[e.target.name].toString()+"-label";
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

    onInvoiceDateChange(dateObj) {
        this.setState({ invoiceDate: dateObj, });
    }

    onInvoiceServiceFeePaymentDate(dateObj) {
        this.setState({ invoiceServiceFeePaymentDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateFinancialUpdateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.putOrderFinancialDetail(
                this.getPostData(),
                this.onSuccessfulSubmissionCallback,
                this.onFailedSubmissionCallback
            );

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
            id, errors, isLoading,
            paymentStatus, invoiceDate, invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount,
            invoiceLabourAmount, invoiceMaterialAmount, invoiceTaxAmount, invoiceServiceFee,
            invoiceServiceFeeAmount, invoiceServiceFeePaymentDate, invoiceActualServiceFeeAmountPaid,
            visits,
        } = this.state;

        const invoiceServiceFeeOptions = getServiceFeeReactSelectOptions(this.props.serviceFeeList);

        /*
         *  Compute the total quoted amount.
         */
        const invoiceTotalQuoteAmount = invoiceQuotedMaterialAmount + invoiceQuotedLabourAmount;

        /*
         *  Compute the total amount.
         */
        const invoiceTotalAmount = invoiceLabourAmount + invoiceMaterialAmount + invoiceTaxAmount;

        /*
         *  Compute balance owing.
         */
        const invoiceBalanceOwingAmount = invoiceServiceFeeAmount - invoiceActualServiceFeeAmountPaid;

        return (
            <FinancialUpdateComponent
                // Text
                invoiceIds={invoiceIds}
                visits={visits}
                onTextChange={this.onTextChange}

                // Amount
                invoiceQuotedLabourAmount={invoiceQuotedLabourAmount}
                invoiceQuotedMaterialAmount={invoiceQuotedMaterialAmount}
                invoiceTotalQuoteAmount={invoiceTotalQuoteAmount}
                invoiceLabourAmount={invoiceLabourAmount}
                invoiceMaterialAmount={invoiceMaterialAmount}
                invoiceTaxAmount={invoiceTaxAmount}
                invoiceTotalAmount={invoiceTotalAmount}
                invoiceServiceFeeAmount={invoiceServiceFeeAmount}
                invoiceBalanceOwingAmount={invoiceBalanceOwingAmount}
                onAmountChange={this.onAmountChange}

                // Select
                invoiceServiceFee={invoiceServiceFee}
                invoiceServiceFeeOptions={invoiceServiceFeeOptions}

                // Radio GUI
                paymentStatus={paymentStatus}
                onRadioChange={this.onRadioChange}

                // Date GUI
                invoiceDate={invoiceDate}
                onInvoiceDateChange={this.onInvoiceDateChange}
                invoiceServiceFeePaymentDate={invoiceServiceFeePaymentDate}
                onInvoiceServiceFeePaymentDate={this.onInvoiceServiceFeePaymentDate}
                invoiceActualServiceFeeAmountPaid={invoiceActualServiceFeeAmountPaid}

                // Other GUI
                id={id}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        skillSetList: store.skillSetListState,
        tagList: store.tagListState,
        orderDetail: store.orderDetailState,
        serviceFeeList: store.serviceFeeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        putOrderFinancialDetail: (data, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putOrderFinancialDetail(data, onSuccessCallback, onFailureCallback)
            )
        },
        pullServiceFeeList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullServiceFeeList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinancialUpdateContainer);
