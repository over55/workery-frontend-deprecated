import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import OrderCompletionTaskStep3Component from "../../../components/tasks/orderCompletion/orderCompletionTaskStep3Component";
import { pullTaskDetail } from "../../../actions/taskActions";
import { validateTask6Step3Input } from "../../../validators/taskValidator";
import { pullServiceFeeList, getServiceFeeReactSelectOptions, getPercentValueForServiceFeeId } from '../../../actions/serviceFeeActions';
import { postTaskOrderCompletionDetail } from "../../../actions/taskActions";
import { pullOrderDetail } from "../../../actions/orderActions";
import {
    localStorageSetObjectOrArrayItem,
    localStorageGetDateItem,
    localStorageGetFloatItem,
    localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';
import {
    WORK_ORDER_COMPLETED_AND_PAID_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    IS_OK_TO_EMAIL_CHOICES
} from "../../../constants/api";


/**
 *  Source: https://stackoverflow.com/a/18358056
 */
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}


class OrderCompletionTaskStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            errors: {},
            isLoading: false,
            id: id,
            hasInputtedFinancials: localStorage.getItem("workery-task-6-hasInputtedFinancials"),
            invoicePaidTo: localStorageGetIntegerItem("workery-task-6-invoicePaidTo"),
            paymentStatus: localStorage.getItem("workery-task-6-paymentStatus"),
            invoiceDate: localStorageGetDateItem("workery-task-6-invoiceDate"),
            invoiceIds: localStorage.getItem("workery-task-6-invoiceIds"),
            invoiceQuotedLabourAmount: localStorageGetFloatItem("workery-task-6-invoiceQuotedLabourAmount"),
            invoiceQuotedMaterialAmount: localStorageGetFloatItem("workery-task-6-invoiceQuotedMaterialAmount"),
            invoiceQuotedOtherCostsAmount: localStorageGetFloatItem("workery-task-6-invoiceQuotedOtherCostsAmount"),
            invoiceTotalQuoteAmount: localStorageGetFloatItem("workery-task-6-invoiceTotalQuoteAmount"),
            invoiceLabourAmount: localStorageGetFloatItem("workery-task-6-invoiceLabourAmount"),
            invoiceMaterialAmount: localStorageGetFloatItem("workery-task-6-invoiceMaterialAmount"),
            invoiceOtherCostsAmount: localStorageGetFloatItem("workery-task-6-invoiceOtherCostsAmount"),
            invoiceTaxAmount: localStorageGetFloatItem("workery-task-6-invoiceTaxAmount"),
            invoiceDepositAmount: 0.00,
            invoiceTotalAmount: localStorageGetFloatItem("workery-task-6-invoiceTotalAmount"),
            invoiceServiceFee: localStorageGetIntegerItem("workery-task-6-invoiceServiceFee"),
            invoiceServiceFeeAmount: localStorageGetFloatItem("workery-task-6-invoiceServiceFeeAmount"),
            invoiceServiceFeePaymentDate:localStorageGetDateItem("workery-task-6-invoiceServiceFeePaymentDate"),
            invoiceActualServiceFeeAmountPaid: localStorageGetFloatItem("workery-task-6-invoiceActualServiceFeeAmountPaid"),
            invoiceBalanceOwingAmount: localStorageGetFloatItem("workery-task-6-invoiceBalanceOwingAmount"),
            invoiceAmountDue: localStorageGetFloatItem("workery-task-6-invoiceAmountDue"),
            completionDate: localStorageGetDateItem("workery-task-6-completionDate"),
            errors: {},
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
            invoiceQuotedOtherCostsAmount,
            invoiceLabourAmount,
            invoiceMaterialAmount,
            invoiceOtherCostsAmount,
            invoiceTaxAmount,
            invoiceServiceFee,
            invoiceActualServiceFeeAmountPaid
        } = this.state;

        /*
         *  Compute the total quoted amount.
         */
        const invoiceTotalQuoteAmount = invoiceQuotedMaterialAmount + invoiceQuotedLabourAmount + invoiceQuotedOtherCostsAmount;
        console.log("performCalculation |", invoiceQuotedMaterialAmount, invoiceQuotedLabourAmount, invoiceQuotedOtherCostsAmount, invoiceTotalQuoteAmount);

        /*
         *  Compute the total amount.
         */
        const invoiceTotalAmount = invoiceLabourAmount + invoiceMaterialAmount + invoiceTaxAmount + invoiceOtherCostsAmount;
        console.log("performCalculation |", invoiceLabourAmount, invoiceMaterialAmount, invoiceTaxAmount, invoiceOtherCostsAmount, invoiceTotalAmount);

        /*
         *  Compute the service fee based on the labour.
         */
        const serviceFeePercent = getPercentValueForServiceFeeId(this.props.serviceFeeList, invoiceServiceFee);
        const invoiceServiceFeeAmount = invoiceLabourAmount * (serviceFeePercent/100);

        /*
         *  Compute balance owing.
         */
        let invoiceBalanceOwingAmount = invoiceServiceFeeAmount - invoiceActualServiceFeeAmountPaid;
        invoiceBalanceOwingAmount = roundToTwo(invoiceBalanceOwingAmount, 2);
        if (isNaN(invoiceBalanceOwingAmount)) {
            invoiceBalanceOwingAmount = 0;
        }

        /*
         *
         */
        const invoiceAmountDue = invoiceTotalAmount - invoiceDepositAmount;

        // Update our state.
        this.setState({
            invoiceTotalQuoteAmount: roundToTwo(invoiceTotalQuoteAmount, 2),
            invoiceTotalAmount: roundToTwo(invoiceTotalAmount, 2),
            invoiceBalanceOwingAmount: invoiceBalanceOwingAmount,
            invoiceServiceFeeAmount: roundToTwo(invoiceServiceFeeAmount, 2),
            invoiceAmountDue: roundToTwo(invoiceAmountDue, 2),
        });

        console.log(">>>", invoiceBalanceOwingAmount);

        // Update our persistent storage.
        localStorage.setItem("workery-task-6-invoiceTotalQuoteAmount", invoiceTotalQuoteAmount);
        localStorage.setItem("workery-task-6-invoiceTotalAmount", invoiceTotalAmount);
        localStorage.setItem("workery-task-6-invoiceBalanceOwingAmount", invoiceBalanceOwingAmount);
        localStorage.setItem("workery-task-6-invoiceServiceFeeAmount", invoiceServiceFeeAmount);
        localStorage.setItem("workery-task-6-invoiceAmountDue", invoiceAmountDue);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullServiceFeeList(0, 1000, parametersMap);
        this.props.pullOrderDetail(this.state.id);
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
        this.setState({ errors: {}, isLoading: false, });
        this.props.setFlashMessage("success", "Order has been successfully updated.");

        // According to the following ticket (https://github.com/over55/workery-front/issues/212)
        // we are to redirect to a different page where the user can handle
        // zeroing the amount owing.
        const invoiceAmountDue = order['invoiceAmountDue'];
        const paymentStatus = order['state'];
        if (paymentStatus === WORK_ORDER_COMPLETED_AND_PAID_STATE && invoiceAmountDue > 0) {
            this.props.history.push("/financial/"+this.state.id+"/zero-amount-due/create/step-1");
        } else {
            this.props.history.push("/financial/"+this.state.id);
        }
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
        const key = "workery-task-6-"+[e.target.name];
        localStorage.setItem(key, e.target.value);
    }

    /**
     *  Function will take the currency string and save it as a float value in
     *  the state for the field.
     */
    onAmountChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        const amount = value.replace("$","").replace(",", "");
        this.setState(
            { [name]: parseFloat(amount), }, ()=>{
                try {
                    const key = "workery-task-6-"+[name];
                    localStorage.setItem(key, parseFloat(amount));

                    // Update our form with our latest calculations. Since all our
                    // currency fields are to be taken into account, then generally
                    // run this function for all modifications.
                    this.performCalculation();
                } catch (err) {
                    console.log("onAmountChange | err:", err);
                }
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

    onSelectChange(option) {
        const optionKey = [option.selectName]+"Option";
        this.setState({
            [option.selectName]: option.value,
            optionKey: option,
        },()=>{
            localStorage.setItem('workery-task-6-'+[option.selectName].toString(), option.value);
            localStorage.setItem('workery-task-6-'+[option.selectName].toString()+"Label", option.label);
            localStorageSetObjectOrArrayItem('workery-task-6-'+optionKey, option);
            console.log("onSelectChange | Post Saved |", [option.selectName], optionKey, "|", this.state); // For debugging purposes only.

            // Since the only dropdown field we are using affects calculations,
            // therefore perform our calculation.
            this.performCalculation()
        });
    }

    onInvoiceDateChange(dateObj) {
        this.setState({ invoiceDate: dateObj, });
        localStorageSetObjectOrArrayItem('workery-task-6-invoiceDate', dateObj);
    }

    onInvoiceServiceFeePaymentDate(dateObj) {
        this.setState({ invoiceServiceFeePaymentDate: dateObj, });
        localStorageSetObjectOrArrayItem('workery-task-6-invoiceServiceFeePaymentDate', dateObj);
    }

    onCompletionDate(dateObj) {
        this.setState({ completionDate: dateObj, });
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateTask6Step3Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.setState({ isLoading: true, errors:{} }, ()=>{
                this.props.history.push("/task/6/"+this.state.id+"/step-4");
            });

        // CASE 2 OF 2: Validation was a failure.
        } else {
            console.log(errors);
            this.setState({ errors: errors, isLoading: false, });

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
            id, errors, isLoading,
            hasInputtedFinancials, invoicePaidTo, paymentStatus, invoiceDate, invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount, invoiceQuotedOtherCostsAmount,
            invoiceLabourAmount, invoiceMaterialAmount, invoiceOtherCostsAmount, invoiceTaxAmount, invoiceServiceFee,
            invoiceServiceFeeAmount, invoiceServiceFeePaymentDate, invoiceActualServiceFeeAmountPaid,
            invoiceTotalQuoteAmount, invoiceTotalAmount, invoiceBalanceOwingAmount, completionDate, invoiceAmountDue
        } = this.state;
        const invoiceServiceFeeOptions = getServiceFeeReactSelectOptions(this.props.serviceFeeList, "invoiceServiceFee");
        return (
            <OrderCompletionTaskStep3Component
                // Text
                invoiceIds={invoiceIds}
                onTextChange={this.onTextChange}

                // Amount
                invoiceQuotedLabourAmount={invoiceQuotedLabourAmount}
                invoiceQuotedMaterialAmount={invoiceQuotedMaterialAmount}
                invoiceQuotedOtherCostsAmount={invoiceQuotedOtherCostsAmount}
                invoiceTotalQuoteAmount={invoiceTotalQuoteAmount}
                invoiceLabourAmount={invoiceLabourAmount}
                invoiceMaterialAmount={invoiceMaterialAmount}
                invoiceOtherCostsAmount={invoiceOtherCostsAmount}
                invoiceTaxAmount={invoiceTaxAmount}
                invoiceTotalAmount={invoiceTotalAmount}
                invoiceServiceFeeAmount={invoiceServiceFeeAmount}
                invoiceBalanceOwingAmount={invoiceBalanceOwingAmount}
                invoiceAmountDue={invoiceAmountDue}
                onAmountChange={this.onAmountChange}

                // Select
                invoiceServiceFee={invoiceServiceFee}
                invoiceServiceFeeOptions={invoiceServiceFeeOptions}
                onSelectChange={this.onSelectChange}

                // Radio GUI
                hasInputtedFinancials={hasInputtedFinancials}
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
                task={this.props.taskDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        orderDetail: store.orderDetailState,
        taskDetail: store.taskDetailState,
        serviceFeeList: store.serviceFeeListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullServiceFeeList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullServiceFeeList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
        postTaskOrderCompletionDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postTaskOrderCompletionDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
        pullTaskDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTaskDetail(id, onSuccessCallback, onFailureCallback)
            )
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
)(OrderCompletionTaskStep3Container);
