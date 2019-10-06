import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapCurrencyInput } from "../../bootstrap/bootstrapCurrencyInput";
import { ORDER_CANCEL_REASON_CHOICES } from "../../../constants/api";


export default class OrderCompletionTaskStep3Component extends Component {
    render() {
        const {
            // TEXT
            invoiceIds,
            visits,
            onTextChange,

            // AMOUNT
            invoiceQuotedLabourAmount,
            invoiceQuotedMaterialAmount,
            invoiceLabourAmount,
            invoiceTotalQuoteAmount,
            invoiceMaterialAmount,
            invoiceTaxAmount,
            invoiceTotalAmount,
            invoiceServiceFeeAmount,
            invoiceBalanceOwingAmount,
            onAmountChange,

            // SELECT
            invoiceServiceFee,
            invoiceServiceFeeOptions,
            onSelectChange,

            // RADIO
            hasInputtedFinancials,
            onRadioChange,

            // DATE
            invoiceDate,
            onInvoiceDateChange,
            invoiceServiceFeePaymentDate,
            onInvoiceServiceFeePaymentDate,
            invoiceActualServiceFeeAmountPaid,

            // EVERYTHING ELSE
            onClick, onBack, id, isLoading, errors, task
        } = this.props;
        const isNotInputted = hasInputtedFinancials === false || hasInputtedFinancials === "false";
        const isInputted = hasInputtedFinancials === true || hasInputtedFinancials === "true";
        // const isOtherHowDidYouHearSelected = reason === 'Other';
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Order Completion</h1>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/6/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/6/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Status</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Financials</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Comment</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-credit-card"></i>&nbsp;Financials
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {/*
                            <!--------------------------------------------->
                            <!--            end YES/NO CHOICE            -->
                            <!--------------------------------------------->
                            */}

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.hasInputtedFinancials}
                                label="Was there financials inputted? (*)"
                                name="hasInputtedFinancials"
                                onChange={onRadioChange}
                                selectedValue={hasInputtedFinancials}
                                options={HAS_INPUTTED_FINANCIALS_CHOICES}
                                helpText='Selecting "yes" will require you to ask the financials and input it here.'
                            />
                            {/*
                            <!--------------------------------------------->
                            <!--            end YES/NO CHOICE            -->
                            <!--------------------------------------------->
                            */}


                            {/*
                            <!--------------------------------------------->
                            <!--              FINANCIAL DATA             -->
                            <!--------------------------------------------->
                            */}

                            {isInputted &&
                                <div>
                                    <BootstrapDatePicker
                                        label="Invoice date (*)"
                                        name="invoiceDate"
                                        dateObj={invoiceDate}
                                        onTimeChange={onInvoiceDateChange}
                                        datePickerClassName="form-control form-control-lg border"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                        error={errors.invoiceDate}
                                    />

                                    <BootstrapInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceIds}
                                        label="Invoice ID(s) (*)"
                                        onChange={onTextChange}
                                        value={invoiceIds}
                                        name="invoiceIds"
                                        type="text"
                                        helpText="Please note, you are able to input multiple invoice ID values if you want, just separate them by commas. Ex.: 123, 456."
                                    />

                                    <BootstrapInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.visits}
                                        label="# of Visit(s) (*)"
                                        onChange={onTextChange}
                                        value={visits}
                                        name="visits"
                                        type="number"
                                        helpText="The the number of visits that were made between the customer and associate for this particular work order. The minimum visit(s) needs to be 1 and maximum is 100."
                                    />

                                    <p className="border-bottom mb-3 pb-1 text-secondary">
                                        <i className="fas fa-clipboard"></i>&nbsp;Quote
                                    </p>

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceQuotedLabourAmount}
                                        label="Quoted Labour (*)"
                                        onChange={onAmountChange}
                                        value={invoiceQuotedLabourAmount}
                                        name="invoiceQuotedLabourAmount"
                                        helpText=""
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceQuotedMaterialAmount}
                                        label="Quoted Materials (*)"
                                        onChange={onAmountChange}
                                        value={invoiceQuotedMaterialAmount}
                                        name="invoiceQuotedMaterialAmount"
                                        helpText="If no material costs will occur then please enter zero."
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-success"
                                        error={errors.invoiceTotalQuoteAmount}
                                        label="Total Quoted"
                                        onChange={onAmountChange}
                                        value={invoiceTotalQuoteAmount}
                                        name="invoiceTotalQuoteAmount"
                                        helpText=""
                                        disabled={true}
                                    />

                                    <p className="border-bottom mb-3 pb-1 text-secondary">
                                        <i className="fas fa-clipboard-check"></i>&nbsp;Actual
                                    </p>

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceLabourAmount}
                                        label="Actual Labour (*)"
                                        onChange={onAmountChange}
                                        value={invoiceLabourAmount}
                                        name="invoiceLabourAmount"
                                        helpText=""
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceMaterialAmount}
                                        label="Actual Materials (*)"
                                        onChange={onAmountChange}
                                        value={invoiceMaterialAmount}
                                        name="invoiceMaterialAmount"
                                        helpText="If no material costs were incurred then please enter zero."
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceTaxAmount}
                                        label="Tax (*)"
                                        onChange={onAmountChange}
                                        value={invoiceTaxAmount}
                                        name="invoiceTaxAmount"
                                        helpText="If no tax was paid, please enter zero."
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-success"
                                        error={errors.invoiceTotalAmount}
                                        label="Total"
                                        onChange={onAmountChange}
                                        value={invoiceTotalAmount}
                                        name="invoiceTotalAmount"
                                        helpText=""
                                        disabled={true}
                                    />

                                    <p className="border-bottom mb-3 pb-1 text-secondary">
                                        <i className="fas fa-hand-holding-usd"></i>&nbsp;Service Fee
                                    </p>

                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="Service Fee (*)"
                                        name="invoiceServiceFee"
                                        defaultOptionLabel="Please select the service fee."
                                        options={invoiceServiceFeeOptions}
                                        value={invoiceServiceFee}
                                        error={errors.invoiceServiceFee}
                                        onSelectChange={onSelectChange}
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-success"
                                        error={errors.invoiceServiceFeeAmount}
                                        label="Required Service Fee"
                                        onChange={onAmountChange}
                                        value={invoiceServiceFeeAmount}
                                        name="invoiceServiceFeeAmount"
                                        helpText="The service fee amount owed by the associate."
                                        disabled={true}
                                    />

                                    <BootstrapDatePicker
                                        label="Invoice service fee payment date (*)"
                                        name="invoiceServiceFeePaymentDate"
                                        dateObj={invoiceServiceFeePaymentDate}
                                        onTimeChange={onInvoiceServiceFeePaymentDate}
                                        datePickerClassName="form-control form-control-lg border"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                        error={errors.invoiceServiceFeePaymentDate}
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-primary"
                                        error={errors.invoiceActualServiceFeeAmountPaid}
                                        label="Actual Service Fee Paid (*)"
                                        onChange={onAmountChange}
                                        value={invoiceActualServiceFeeAmountPaid}
                                        name="invoiceActualServiceFeeAmountPaid"
                                        helpText="Please fill in the actual service fee amount paid by the associate and received by your organization."
                                    />

                                    <BootstrapCurrencyInput
                                        inputClassName="form-control"
                                        borderColour="border-success"
                                        error={errors.invoiceBalanceOwingAmount}
                                        label="Balance Owing"
                                        onChange={onAmountChange}
                                        value={invoiceBalanceOwingAmount}
                                        name="invoiceBalanceOwingAmount"
                                        helpText="This is remaining balance to be paid by the associate to your organization."
                                        disabled={true}
                                    />
                                </div>
                            }

                            {/*
                            <!--------------------------------------------->
                            <!--           end FINANCIAL DATA            -->
                            <!--------------------------------------------->
                            */}

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                ReviewComment&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/6/${id}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}


const HAS_INPUTTED_FINANCIALS_CHOICES = [
    {
        id: 'hasInputtedFinancials-m-choice',
        name: "hasInputtedFinancials",
        value: true,
        label: "Yes"
    },{
        id: 'hasInputtedFinancials-f-choice',
        name: "hasInputtedFinancials",
        value: false,
        label: "No"
    }
];
