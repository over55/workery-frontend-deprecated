import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import OrderCompletionTaskStep3Component from "../../../components/tasks/orderCompletion/orderCompletionTaskStep3Component";
import { pullTaskDetail } from "../../../actions/taskActions";
import { validateTask6Step3Input } from "../../../validators/taskValidator";
import { pullServiceFeeList, getServiceFeeReactSelectOptions } from '../../../actions/serviceFeeActions';
import { postTaskOrderCompletionDetail } from "../../../actions/taskActions";
import {
    localStorageSetObjectOrArrayItem,
    localStorageGetDateItem,
    localStorageGetFloatItem,
    localStorageGetIntegerItem
} from '../../../helpers/localStorageUtility';


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
            invoiceDate: localStorageGetDateItem("workery-task-6-invoiceDate"),
            invoiceIds: localStorage.getItem("workery-task-6-invoiceIds"),
            invoiceQuotedLabourAmount: localStorageGetFloatItem("workery-task-6-invoiceQuotedLabourAmount"),
            invoiceQuotedMaterialAmount: localStorageGetFloatItem("workery-task-6-invoiceQuotedMaterialAmount"),
            invoiceTotalQuoteAmount: localStorageGetFloatItem("workery-task-6-invoiceTotalQuoteAmount"),
            invoiceLabourAmount: localStorageGetFloatItem("workery-task-6-invoiceLabourAmount"),
            invoiceMaterialAmount: localStorageGetFloatItem("workery-task-6-invoiceMaterialAmount"),
            invoiceTaxAmount: localStorageGetFloatItem("workery-task-6-invoiceTaxAmount"),
            invoiceServiceFee: localStorageGetIntegerItem("workery-task-6-invoiceServiceFee"),
            invoiceServiceFeeAmount: localStorageGetFloatItem("workery-task-6-invoiceServiceFeeAmount"),
            invoiceServiceFeePaymentDate:localStorageGetDateItem("workery-task-6-invoiceServiceFeePaymentDate"),
            invoiceActualServiceFeeAmountPaid: localStorageGetFloatItem("workery-task-6-invoiceActualServiceFeeAmountPaid"),
            invoiceBalanceOwingAmount: localStorageGetFloatItem("workery-task-6-invoiceBalanceOwingAmount"),
            visits: localStorageGetFloatItem("workery-task-6-visits"),
            errors: {},
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onAmountChange = this.onAmountChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onInvoiceDateChange = this.onInvoiceDateChange.bind(this);
        this.onInvoiceServiceFeePaymentDate = this.onInvoiceServiceFeePaymentDate.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

     componentDidMount() {
         window.scrollTo(0, 0);  // Start the page at the top of the page.
         this.props.pullTaskDetail(this.state.id, this.onTaskDetailSuccessFetchCallback);
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

    onTaskDetailSuccessFetchCallback(taskDetail) {
        console.log("onTaskDetailSuccessFetchCallback | taskDetail:", taskDetail); // For debugging purposes only.
        if (taskDetail !== undefined && taskDetail !== null && taskDetail !== "") {
            if (taskDetail.isClosed === true || taskDetail.isClosed === "true") {
                this.props.setFlashMessage("danger", "Task has been already been closed.");
                this.props.history.push("/tasks");
            }
        }
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

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
            hasInputtedFinancials, invoiceDate, invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount,
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
            <OrderCompletionTaskStep3Component
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
                hasInputtedFinancials={hasInputtedFinancials}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderCompletionTaskStep3Container);
