import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import AdminFinancialUpdateComponent from "../../../../components/financials/admin/update/adminFinancialUpdateComponent";
import { setFlashMessage } from "../../../../actions/flashMessageActions";
import { validateFinancialUpdateInput } from "../../../../validators/orderValidator";
import { pullServiceFeeList, getServiceFeeReactSelectOptions, getPercentValueForServiceFeeId } from '../../../../actions/serviceFeeActions';
import { putOrderFinancialDetail, pullOrderDetail } from "../../../../actions/orderActions";
import {
    WORK_ORDER_COMPLETED_AND_PAID_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    IS_OK_TO_EMAIL_CHOICES
} from "../../../../constants/api";
import { localStorageSetObjectOrArrayItem } from '../../../../helpers/localStorageUtility';


/**
 *  Source: https://stackoverflow.com/a/18358056
 */
function roundToTwo(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}


class AdminFinancialUpdateContainer extends Component {
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
        // var invoiceDate = this.props.orderDetail.invoiceDate
        //                   ? moment(this.props.orderDetail.invoiceDate, 'YYYY-MM-DD').toDate()
        //                   : null;
        // var completionDate = this.props.orderDetail.completionDate
        //                   ? moment(this.props.orderDetail.completionDate, 'YYYY-MM-DD').toDate()
        //                   : null;
        var invoiceDate = this.props.orderDetail.invoiceDate ? new Date(this.props.orderDetail.invoiceDate) : null;
        if (invoiceDate !== null) {
            invoiceDate.setMinutes( invoiceDate.getMinutes() + invoiceDate.getTimezoneOffset() );
        }

        var completionDate = this.props.orderDetail.completionDate ? new Date(this.props.orderDetail.completionDate) : null;
        if (completionDate !== null) {
            completionDate.setMinutes( completionDate.getMinutes() + completionDate.getTimezoneOffset() );
        }

        const hasNoIDs = this.props.orderDetail.invoiceIds === undefined || this.props.orderDetail.invoiceIds === null || this.props.orderDetail.invoiceIds === "";

        const associateServiceFee = this.props.orderDetail.associate.invoiceServiceFee.id;
        let invoiceServiceFee = parseInt(this.props.orderDetail.invoiceServiceFee.id);
        if (invoiceServiceFee === undefined || invoiceServiceFee === null || isNaN(invoiceServiceFee)) {
            invoiceServiceFee = associateServiceFee;
        }

        // The following code will set "zero" value if any issues exist with the data.
        // Start ...
        //----------------------------------------------------------------------
        let invoiceQuotedLabourAmount = parseFloat(this.props.orderDetail.invoiceQuotedLabourAmount)
        if (invoiceQuotedLabourAmount === undefined || invoiceQuotedLabourAmount === null || isNaN(invoiceQuotedLabourAmount)) {
            invoiceQuotedLabourAmount = 0;
        }
        let invoiceQuotedMaterialAmount = parseFloat(this.props.orderDetail.invoiceQuotedMaterialAmount)
        if (invoiceQuotedMaterialAmount === undefined || invoiceQuotedMaterialAmount === null || isNaN(invoiceQuotedMaterialAmount)) {
            invoiceQuotedMaterialAmount = 0;
        }
        let invoiceQuotedOtherCostsAmount = parseFloat(this.props.orderDetail.invoiceQuotedOtherCostsAmount)
        if (invoiceQuotedOtherCostsAmount === undefined || invoiceQuotedOtherCostsAmount === null || isNaN(invoiceQuotedOtherCostsAmount)) {
            invoiceQuotedOtherCostsAmount = 0;
        }
        let invoiceTotalQuoteAmount = parseFloat(this.props.orderDetail.invoiceTotalQuoteAmount)
        if (invoiceTotalQuoteAmount === undefined || invoiceTotalQuoteAmount === null || isNaN(invoiceTotalQuoteAmount)) {
            invoiceTotalQuoteAmount = 0;
        }
        let invoiceLabourAmount = parseFloat(this.props.orderDetail.invoiceLabourAmount)
        if (invoiceLabourAmount === undefined || invoiceLabourAmount === null || isNaN(invoiceLabourAmount)) {
            invoiceLabourAmount = 0;
        }
        let invoiceMaterialAmount = parseFloat(this.props.orderDetail.invoiceMaterialAmount)
        if (invoiceMaterialAmount === undefined || invoiceMaterialAmount === null || isNaN(invoiceMaterialAmount)) {
            invoiceMaterialAmount = 0;
        }
        let invoiceOtherCostsAmount = parseFloat(this.props.orderDetail.invoiceOtherCostsAmount)
        if (invoiceOtherCostsAmount === undefined || invoiceOtherCostsAmount === null || isNaN(invoiceOtherCostsAmount)) {
            invoiceOtherCostsAmount = 0;
        }
        let invoiceTaxAmount = parseFloat(this.props.orderDetail.invoiceTaxAmount)
        if (invoiceTaxAmount === undefined || invoiceTaxAmount === null || isNaN(invoiceTaxAmount)) {
            invoiceTaxAmount = 0;
        }
        let invoiceDepositAmount = parseFloat(this.props.orderDetail.invoiceDepositAmount)
        if (invoiceDepositAmount === undefined || invoiceDepositAmount === null || isNaN(invoiceDepositAmount)) {
            invoiceDepositAmount = 0;
        }
        let invoiceServiceFeeAmount = parseFloat(this.props.orderDetail.invoiceServiceFeeAmount)
        if (invoiceServiceFeeAmount === undefined || invoiceServiceFeeAmount === null || isNaN(invoiceServiceFeeAmount)) {
            invoiceServiceFeeAmount = 0;
        }
        let invoiceActualServiceFeeAmountPaid = parseFloat(this.props.orderDetail.invoiceActualServiceFeeAmountPaid)
        if (invoiceActualServiceFeeAmountPaid === undefined || invoiceActualServiceFeeAmountPaid === null || isNaN(invoiceActualServiceFeeAmountPaid)) {
            invoiceActualServiceFeeAmountPaid = 0;
        }
        let invoiceBalanceOwingAmount = parseFloat(this.props.orderDetail.invoiceBalanceOwingAmount)
        if (invoiceBalanceOwingAmount === undefined || invoiceBalanceOwingAmount === null || isNaN(invoiceBalanceOwingAmount)) {
            invoiceBalanceOwingAmount = 0;
        }
        let invoiceAmountDue = parseFloat(this.props.orderDetail.invoiceAmountDue)
        if (invoiceAmountDue === undefined || invoiceAmountDue === null || isNaN(invoiceAmountDue)) {
            invoiceAmountDue = 0;
        }
        let visits = parseInt(this.props.orderDetail.visits)
        if (visits === undefined || visits === null || isNaN(visits)) {
            visits = 0;
        }
        //----------------------------------------------------------------------
        // ... Finished.

        // Update state.
        this.state = {
            errors: {},
            isLoading: false,
            id: parseInt(id),
            invoicePaidTo: this.props.orderDetail.invoicePaidTo,
            paymentStatus: this.props.orderDetail.state,
            invoiceDate: invoiceDate,
            invoiceIds: hasNoIDs ? id : this.props.orderDetail.invoiceIds,
            invoiceQuotedLabourAmount: invoiceQuotedLabourAmount,
            invoiceQuotedMaterialAmount: invoiceQuotedMaterialAmount,
            invoiceQuotedOtherCostsAmount: invoiceQuotedOtherCostsAmount,
            invoiceTotalQuoteAmount: invoiceTotalQuoteAmount,
            invoiceLabourAmount: invoiceLabourAmount,
            invoiceMaterialAmount: invoiceMaterialAmount,
            invoiceOtherCostsAmount: invoiceOtherCostsAmount,
            invoiceTaxAmount: invoiceTaxAmount,
            invoiceDepositAmount: invoiceDepositAmount,
            invoiceServiceFee: invoiceServiceFee,
            invoiceServiceFeeAmount: invoiceServiceFeeAmount,
            invoiceServiceFeePaymentDate: invoiceServiceFeePaymentDate,
            invoiceActualServiceFeeAmountPaid: invoiceActualServiceFeeAmountPaid,
            invoiceBalanceOwingAmount: invoiceBalanceOwingAmount,
            invoiceAmountDue: invoiceAmountDue,
            visits: visits,
            completionDate: completionDate,
        }

        this.onSuccessfullyFetchedOrderDetail = this.onSuccessfullyFetchedOrderDetail.bind(this);
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
        const invoiceBalanceOwingAmount = invoiceServiceFeeAmount - invoiceActualServiceFeeAmountPaid;

        /*
         * Compute amount due.
         */
        const invoiceAmountDue = invoiceTotalAmount - invoiceDepositAmount;

        /*
         *  Convert to currency decimal places.
         */
        const invoiceTotalQuoteAmountRounded = roundToTwo(invoiceTotalQuoteAmount, 2);
        const invoiceTotalAmountRounded =  roundToTwo(invoiceTotalAmount, 2);
        const invoiceBalanceOwingAmountRounded = roundToTwo(invoiceBalanceOwingAmount, 2);
        const invoiceServiceFeeAmountRounded = roundToTwo(invoiceServiceFeeAmount, 2);
        const invoiceAmountDueRounded = roundToTwo(invoiceAmountDue, 2);

        /*
         *  Handle NaN values.
         */
        const invoiceTotalQuoteAmountSanitized = isNaN(invoiceTotalQuoteAmountRounded) ? 0 : invoiceTotalQuoteAmountRounded;
        const invoiceTotalAmountRoundedSanitized = isNaN(invoiceTotalAmountRounded) ? 0 : invoiceTotalAmountRounded;
        const invoiceBalanceOwingAmountSanitized = isNaN(invoiceBalanceOwingAmountRounded) ? 0 : invoiceBalanceOwingAmountRounded;
        const invoiceServiceFeeAmountSanitized = isNaN(invoiceServiceFeeAmountRounded) ? 0 : invoiceServiceFeeAmountRounded;
        const invoiceAmountDueSanitized = isNaN(invoiceAmountDueRounded) ? 0 : invoiceAmountDueRounded;

        // Update our state.
        this.setState({
            invoiceTotalQuoteAmount: invoiceTotalQuoteAmountSanitized,
            invoiceTotalAmount: invoiceTotalAmountRoundedSanitized,
            invoiceBalanceOwingAmount: invoiceBalanceOwingAmountSanitized,
            invoiceServiceFeeAmount: invoiceServiceFeeAmountSanitized,
            invoiceAmountDue: invoiceAmountDueSanitized,
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

        if (this.state.completionDate !== undefined && this.state.completionDate !== null && !isNaN(this.state.completionDate) ) {
            const completionDateMoment = moment(this.state.completionDate);
            postData.completionDate = completionDateMoment.format("YYYY-MM-DD")
        }

        if (this.state.invoiceDate !== undefined && this.state.invoiceDate !== null && !isNaN(this.state.invoiceDate) ) {
            const invoiceDateMoment = moment(this.state.invoiceDate);
            postData.invoiceDate = invoiceDateMoment.format("YYYY-MM-DD")
        }

        if (this.state.invoiceServiceFeePaymentDate !== undefined && this.state.invoiceServiceFeePaymentDate !== null && !isNaN(this.state.invoiceServiceFeePaymentDate) ) {
            const invoiceServiceFeePaymentDateMoment = moment(this.state.invoiceServiceFeePaymentDate);
            postData.invoiceServiceFeePaymentDate = invoiceServiceFeePaymentDateMoment.format("YYYY-MM-DD");
        }

        postData.state = this.state.paymentStatus;

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
        const parametersMap = new Map();
        parametersMap.set("state", 1);
        this.props.pullServiceFeeList(0, 1000, parametersMap);
        this.props.pullOrderDetail(this.state.id, this.onSuccessfullyFetchedOrderDetail);
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

    onSuccessfullyFetchedOrderDetail(orderDetail) {
        // // console.log(orderDetail);
        // this.setState({
        //     isLoading: false,
        // });
    }

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

        // According to the following ticket (https://github.com/over55/workery-frontend/issues/212)
        // we are to redirect to a different page where the user can handle
        // zeroing the amount owing.
        const invoiceAmountDue = order['invoiceAmountDue'];
        const paymentStatus = order['state'];
        if (paymentStatus === WORK_ORDER_COMPLETED_AND_PAID_STATE && invoiceAmountDue > 0) {
            //
            // Let use set a few pre-set values.
            //
            localStorageSetObjectOrArrayItem('workery-create-zero-amount-deposit-paidAt', this.state.invoiceDate);
            localStorage.setItem("workery-create-zero-amount-deposit-paidTo", this.state.invoicePaidTo);
            localStorage.setItem("workery-create-zero-amount-deposit-paidFor", 4); // A.k.a. "Amount Due".
            localStorage.setItem("workery-create-zero-amount-deposit-paidFor", "Amount Due");
            if (this.state.invoicePaidTo === 1) {
                localStorage.setItem("workery-create-zero-amount-deposit-paidTo-label", "Associate");
            } else {
                localStorage.setItem("workery-create-zero-amount-deposit-paidTo-label", "Organization");
            }
            localStorage.setItem("workery-create-zero-amount-deposit-amount", this.state.invoiceAmountDue);
            localStorage.setItem("workery-create-zero-amount-deposit-invoiceAmountDue", 0.00);

            //
            // Redirect to the new page.
            //
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
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const {
            id, errors, isLoading,
            invoicePaidTo, paymentStatus, invoiceDate, invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount, invoiceQuotedOtherCostsAmount,
            invoiceLabourAmount, invoiceMaterialAmount, invoiceOtherCostsAmount, invoiceTaxAmount, invoiceServiceFee,
            invoiceServiceFeeAmount, invoiceServiceFeePaymentDate, invoiceActualServiceFeeAmountPaid,
            visits, invoiceTotalQuoteAmount, invoiceTotalAmount, invoiceBalanceOwingAmount, completionDate, invoiceAmountDue
        } = this.state;
        const invoiceServiceFeeOptions = getServiceFeeReactSelectOptions(this.props.serviceFeeList, "invoiceServiceFee");
        return (
            <AdminFinancialUpdateComponent
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
)(AdminFinancialUpdateContainer);
