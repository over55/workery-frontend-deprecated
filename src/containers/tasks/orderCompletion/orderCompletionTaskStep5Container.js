import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import OrderCompletionTaskStep5Component from "../../../components/tasks/orderCompletion/orderCompletionTaskStep5Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { pullTaskDetail } from "../../../actions/taskActions";
import { postTaskOrderCompletionDetail } from "../../../actions/taskActions";
import {
    localStorageGetFloatItem,
    localStorageGetIntegerItem,
    localStorageSetObjectOrArrayItem,
    localStorageGetDateItem,
    localStorageRemoveItemsContaining
} from '../../../helpers/localStorageUtility';


class OrderCompletionTaskStep5Container extends Component {
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
            // Everything else...
            errors: {},
            isLoading: false,
            id: id,

            // Step 2
            wasCompleted: localStorage.getItem("workery-task-6-wasCompleted"),
            wasCompletedLabel: localStorage.getItem("workery-task-6-wasCompleted-label"),
            completionDate: localStorageGetDateItem("workery-task-6-completionDate"),
            associate: localStorageGetIntegerItem("workery-task-6-associateId"),
            reason: localStorageGetIntegerItem("workery-task-6-reason"),
            reasonLabel: localStorage.getItem("workery-task-6-reasonLabel"),
            reasonOther: localStorage.getItem("workery-task-6-reasonOther"),
            reasonComment: localStorage.getItem("workery-task-6-reasonComment"),

            // Step 3
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

            // Step 4
            comment: localStorage.getItem("workery-task-6-comment"),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onTaskDetailSuccessFetchCallback = this.onTaskDetailSuccessFetchCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.taskItemId = parseInt(this.state.id);

        if (isNaN(this.state.reason)) {
            postData.reason = 1;
        }

        postData.wasCompleted = this.state.wasCompleted === "true" ? true : false;
        postData.hasInputtedFinancials = this.state.hasInputtedFinancials === "true" ? true : false;

        if (this.state.completionDate !== undefined && this.state.completionDate !== null) {
            const completionDateMoment = moment(this.state.completionDate);
            postData.completionDate = completionDateMoment.format("YYYY-MM-DD");
        }

        if (this.state.invoiceDate !== undefined && this.state.invoiceDate !== null) {
            const invoiceDateMoment = moment(this.state.invoiceDate);
            postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD");
        }

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
         this.props.pullTaskDetail(this.state.id, this.onTaskDetailSuccessFetchCallback);
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

    onSuccessCallback(profile) {
        localStorageRemoveItemsContaining("workery-task-6-");
        this.props.setFlashMessage("success", "Job completion task has been successfully closed.");
        this.props.history.push("/order/"+this.props.taskDetail.orderId);
    }

    onFailureCallback(errors) {
        console.log(errors);
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTaskDetailSuccessFetchCallback(taskDetail) {
        console.log("onTaskDetailSuccessFetchCallback | taskDetail:", taskDetail); // For debugging purposes only.
        if (taskDetail !== undefined && taskDetail !== null && taskDetail !== "") {
            if (taskDetail.isClosed === true || taskDetail.isClosed === "true") {
                this.props.setFlashMessage("danger", "Task has been already been closed.");
                this.props.history.push("/order/"+this.props.taskDetail.orderId);
            }
        }
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ isLoading: true, errors:{} }, ()=>{
            this.props.postTaskOrderCompletionDetail(
                this.getPostData(),
                this.onSuccessCallback,
                this.onFailureCallback
            )
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <OrderCompletionTaskStep5Component
                // Step 2
                wasCompleted={this.state.wasCompleted}
                wasCompletedLabel={this.state.wasCompletedLabel}
                completionDate={this.state.completionDate}
                onInvoiceDateChange={this.onInvoiceDateChange}
                reason={this.state.reason}
                reasonLabel={this.state.reasonLabel}
                reasonOther={this.state.reasonOther}

                // Step 3
                invoiceIds={this.state.invoiceIds}
                invoiceQuotedLabourAmount={this.state.invoiceQuotedLabourAmount}
                invoiceQuotedMaterialAmount={this.state.invoiceQuotedMaterialAmount}
                invoiceTotalQuoteAmount={this.state.invoiceTotalQuoteAmount}
                invoiceLabourAmount={this.state.invoiceLabourAmount}
                invoiceMaterialAmount={this.state.invoiceMaterialAmount}
                invoiceTaxAmount={this.state.invoiceTaxAmount}
                invoiceTotalAmount={this.state.invoiceTotalAmount}
                invoiceServiceFeeAmount={this.state.invoiceServiceFeeAmount}
                invoiceBalanceOwingAmount={this.state.invoiceBalanceOwingAmount}
                invoiceServiceFee={this.state.invoiceServiceFee}
                hasInputtedFinancials={this.state.hasInputtedFinancials}
                invoiceDate={this.state.invoiceDate}
                invoiceActualServiceFeeAmountPaid={this.state.invoiceActualServiceFeeAmountPaid}
                invoicePaidTo={this.state.invoicePaidTo}
                paymentStatus={this.state.paymentStatus}
                invoiceQuotedOtherCostsAmount={this.state.invoiceQuotedOtherCostsAmount}
                invoiceOtherCostsAmount={this.state.invoiceOtherCostsAmount}
                invoiceDepositAmount={this.state.invoiceDepositAmount}
                invoiceAmountDue={this.invoiceAmountDue}

                // Step 4
                comment={this.state.comment}

                // Everything else...
                id={this.state.id}
                isLoading={this.state.isLoading}
                task={this.props.taskDetail}
                errors={this.state.errors}
                onBack={this.onBack}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        taskDetail: store.taskDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
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
)(OrderCompletionTaskStep5Container);
