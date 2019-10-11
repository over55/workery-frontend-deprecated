import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import FinancialUpdateComponent from "../../../components/financials/update/financialUpdateComponent";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { validateFinancialUpdateInput } from "../../../validators/orderValidator";
import { pullServiceFeeList, getServiceFeeReactSelectOptions, getPercentValueForServiceFeeId } from '../../../actions/serviceFeeActions';
import { putOrderFinancialDetail } from "../../../actions/orderActions";


/**
 *  Source: https://stackoverflow.com/a/18358056
 */
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


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

        // Get our dates based on our browsers timezone.
        // https://github.com/angular-ui/bootstrap/issues/2628#issuecomment-55125516
        var invoiceServiceFeePaymentDate = this.props.orderDetail.invoiceServiceFeePaymentDate ? new Date(this.props.orderDetail.invoiceServiceFeePaymentDate) : null;
        if (invoiceServiceFeePaymentDate !== null) {
            invoiceServiceFeePaymentDate.setMinutes( invoiceServiceFeePaymentDate.getMinutes() + invoiceServiceFeePaymentDate.getTimezoneOffset() );
        }

        // Update state.
        this.state = {
            errors: {},
            isLoading: false,
            id: parseInt(id),
            invoicePaidTo: this.props.orderDetail.invoicePaidTo,
            paymentStatus: this.props.orderDetail.state,
            invoiceDate: this.props.orderDetail.invoiceDate ? new Date(this.props.orderDetail.invoiceDate) : null,
            invoiceIds: this.props.orderDetail.invoiceIds,
            invoiceQuotedLabourAmount: parseFloat(this.props.orderDetail.invoiceQuotedLabourAmount),
            invoiceQuotedMaterialAmount: parseFloat(this.props.orderDetail.invoiceQuotedMaterialAmount),
            invoiceQuotedWasteRemovalAmount: parseFloat(this.props.orderDetail.invoiceQuotedWasteRemovalAmount),
            invoiceTotalQuoteAmount: parseFloat(this.props.orderDetail.invoiceTotalQuoteAmount),
            invoiceLabourAmount: parseFloat(this.props.orderDetail.invoiceLabourAmount),
            invoiceMaterialAmount: parseFloat(this.props.orderDetail.invoiceMaterialAmount),
            invoiceWasteRemovalAmount: parseFloat(this.props.orderDetail.invoiceWasteRemovalAmount),
            invoiceTaxAmount: parseFloat(this.props.orderDetail.invoiceTaxAmount),
            invoiceDepositAmount: parseFloat(this.props.orderDetail.invoiceDepositAmount),
            invoiceServiceFee: parseInt(this.props.orderDetail.invoiceServiceFee),
            invoiceServiceFeeAmount: parseFloat(this.props.orderDetail.invoiceServiceFeeAmount),
            invoiceServiceFeePaymentDate: invoiceServiceFeePaymentDate,
            invoiceActualServiceFeeAmountPaid: parseFloat(this.props.orderDetail.invoiceActualServiceFeeAmountPaid),
            invoiceBalanceOwingAmount: parseFloat(this.props.orderDetail.invoiceBalanceOwingAmount),
            invoiceAmountDue: parseFloat(this.props.orderDetail.invoiceAmountDue),
            visits: parseInt(this.props.orderDetail.visits),
            completionDate: this.props.orderDetail.completionDate ? new Date(this.props.orderDetail.completionDate) : null,
        }

        this.performCalculation = this.performCalculation.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onInvoiceDateChange = this.onInvoiceDateChange.bind(this);
        this.onInvoiceServiceFeePaymentDate = this.onInvoiceServiceFeePaymentDate.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onCompletionDate = this.onCompletionDate.bind(this);
    }

    /**
     *  Utility function calculates our read-only form fields.
     */
    performCalculation() {
        // Get the variables we are going to use to perform our calculations.
        const {
            invoiceDepositAmount,
            invoiceQuotedMaterialAmount,
            invoiceQuotedLabourAmount,
            invoiceQuotedWasteRemovalAmount,
            invoiceLabourAmount,
            invoiceMaterialAmount,
            invoiceWasteRemovalAmount,
            invoiceTaxAmount,
            invoiceServiceFee,
            invoiceActualServiceFeeAmountPaid
        } = this.state;

        /*
         *  Compute the total quoted amount.
         */
        const invoiceTotalQuoteAmount = invoiceQuotedMaterialAmount + invoiceQuotedLabourAmount + invoiceQuotedWasteRemovalAmount;
        console.log("performCalculation |", invoiceQuotedMaterialAmount, invoiceQuotedLabourAmount, invoiceQuotedWasteRemovalAmount, invoiceTotalQuoteAmount);

        /*
         *  Compute the total amount.
         */
        const invoiceTotalAmount = invoiceLabourAmount + invoiceMaterialAmount + invoiceTaxAmount + invoiceWasteRemovalAmount;
        console.log("performCalculation |", invoiceLabourAmount, invoiceMaterialAmount, invoiceTaxAmount, invoiceWasteRemovalAmount, invoiceTotalAmount);

        /*
         *  Compute the service fee based on the labour.
         */
        const serviceFeePercent = getPercentValueForServiceFeeId(this.props.serviceFeeList, invoiceServiceFee);
        const invoiceServiceFeeAmount = invoiceLabourAmount * (serviceFeePercent/100);

        /*
         *  Compute balance owing.
         */
        const invoiceBalanceOwingAmount = invoiceServiceFeeAmount - invoiceActualServiceFeeAmountPaid;

        /*
         *
         */
        const invoiceAmountDue = invoiceTotalAmount - invoiceDepositAmount;
        
        // Update our state.
        this.setState({
            invoiceTotalQuoteAmount: roundToTwo(invoiceTotalQuoteAmount, 2),
            invoiceTotalAmount: roundToTwo(invoiceTotalAmount, 2),
            invoiceBalanceOwingAmount: roundToTwo(invoiceBalanceOwingAmount, 2),
            invoiceServiceFeeAmount: roundToTwo(invoiceServiceFeeAmount, 2),
            invoiceAmountDue: roundToTwo(invoiceAmountDue, 2),
        });
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.task_item = this.state.id;

        const completionDateMoment = moment(this.state.completionDate);
        postData.completionDate = completionDateMoment.format("YYYY-MM-DD")

        const invoiceDateMoment = moment(this.state.invoiceDate);
        postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD")

        const invoiceServiceFeePaymentDateMoment = moment(this.state.invoiceServiceFeePaymentDate);
        postData.invoiceServiceFeePaymentDate = invoiceServiceFeePaymentDateMoment.format("YYYY-MM-DD")

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
        const parametersMap = new Map()
        parametersMap.set("isArchived", 3)
        this.props.pullServiceFeeList(1, 1000, parametersMap);
        this.performCalculation();
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

    onTaskDetailSuccessFetchCallback(taskDetail) {
        console.log("onTaskDetailSuccessFetchCallback | taskDetail:", taskDetail); // For debugging purposes only.
        if (taskDetail !== undefined && taskDetail !== null && taskDetail !== "") {
            if (taskDetail.isClosed === true || taskDetail.isClosed === "true") {
                this.props.setFlashMessage("danger", "Task has been already been closed.");
                this.props.history.push("/tasks");
            }
        }
    }

    onSuccessfulSubmissionCallback(order) {
        this.setState({ errors: {}, isLoading: false, })
        this.props.setFlashMessage("success", "Order has been successfully updated.");
        this.props.history.push("/financial/"+this.state.id);
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

    onTextChange(e) {
        this.setState({ [e.target.name]: e.target.value, });
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const amount = e.target.value.replace("$","").replace(",", "");
        this.setState(
            { [e.target.name]: parseFloat(amount), }, ()=>{
                // Update our form with our latest calculations. Since all our
                // currency fields are to be taken into account, then generally
                // run this function for all modifications.
                this.performCalculation();
            }
        );
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-task-6-"+[e.target.name];
        const storageLabelKey =  "workery-task-6-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.

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

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                // Since the only dropdown field we are using affects calculations,
                // therefore perform our calculation.
                this.performCalculation()
            }
        );
    }

    onInvoiceDateChange(dateObj) {
        this.setState({ invoiceDate: dateObj, });
    }

    onInvoiceServiceFeePaymentDate(dateObj) {
        this.setState({ invoiceServiceFeePaymentDate: dateObj, });
    }

    onCompletionDate(dateObj) {
        this.setState({ completionDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateFinancialUpdateInput(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState(
                { isLoading: true, errors: {} },
                ()=>{
                    this.props.putOrderFinancialDetail(
                        this.getPostData(),
                        this.onSuccessfulSubmissionCallback,
                        this.onFailedSubmissionCallback
                    );
                }
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
            invoicePaidTo, paymentStatus, invoiceDate, invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount, invoiceQuotedWasteRemovalAmount,
            invoiceLabourAmount, invoiceMaterialAmount, invoiceWasteRemovalAmount, invoiceTaxAmount, invoiceServiceFee,
            invoiceServiceFeeAmount, invoiceServiceFeePaymentDate, invoiceActualServiceFeeAmountPaid,
            visits, invoiceTotalQuoteAmount, invoiceTotalAmount, invoiceBalanceOwingAmount, completionDate, invoiceAmountDue
        } = this.state;
        const invoiceServiceFeeOptions = getServiceFeeReactSelectOptions(this.props.serviceFeeList, "invoiceServiceFee");
        return (
            <FinancialUpdateComponent
                // Text
                invoiceIds={invoiceIds}
                onTextChange={this.onTextChange}

                // Amount
                invoiceQuotedLabourAmount={invoiceQuotedLabourAmount}
                invoiceQuotedMaterialAmount={invoiceQuotedMaterialAmount}
                invoiceQuotedWasteRemovalAmount={invoiceQuotedWasteRemovalAmount}
                invoiceTotalQuoteAmount={invoiceTotalQuoteAmount}
                invoiceLabourAmount={invoiceLabourAmount}
                invoiceMaterialAmount={invoiceMaterialAmount}
                invoiceWasteRemovalAmount={invoiceWasteRemovalAmount}
                invoiceTaxAmount={invoiceTaxAmount}
                invoiceTotalAmount={invoiceTotalAmount}
                invoiceServiceFeeAmount={invoiceServiceFeeAmount}
                invoiceBalanceOwingAmount={invoiceBalanceOwingAmount}
                invoiceAmountDue={invoiceAmountDue}
                onAmountChange={this.onAmountChange}

                // Select
                invoiceServiceFee={invoiceServiceFee}
                invoiceServiceFeeOptions={invoiceServiceFeeOptions}
                visits={visits}
                onSelectChange={this.onSelectChange}

                // Radio GUI
                invoicePaidTo={invoicePaidTo}
                paymentStatus={paymentStatus}
                onRadioChange={this.onRadioChange}

                // Date GUI
                invoiceDate={invoiceDate}
                onInvoiceDateChange={this.onInvoiceDateChange}
                invoiceServiceFeePaymentDate={invoiceServiceFeePaymentDate}
                onInvoiceServiceFeePaymentDate={this.onInvoiceServiceFeePaymentDate}
                invoiceActualServiceFeeAmountPaid={invoiceActualServiceFeeAmountPaid}
                completionDate={completionDate}
                onCompletionDate={this.onCompletionDate}

                // Other GUI
                id={id}
                orderDetail={this.props.orderDetail}
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
        orderDetail: store.orderDetailState,
        serviceFeeList: store.serviceFeeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        pullServiceFeeList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullServiceFeeList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        putOrderFinancialDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                putOrderFinancialDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FinancialUpdateContainer);
