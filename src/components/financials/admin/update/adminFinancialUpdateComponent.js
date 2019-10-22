// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from "../../bootstrap/bootstrapDatePicker";
import { BootstrapCurrencyInput } from "../../bootstrap/bootstrapCurrencyInput";
import {
    WORK_ORDER_COMPLETED_AND_PAID_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    IS_OK_TO_EMAIL_CHOICES
} from "../../../constants/api";


export default class AdminFinancialUpdateComponent extends Component {
    render() {
        const {
            // TEXT
            invoiceIds,
            visits,
            onTextChange,

            // AMOUNT
            invoiceQuotedLabourAmount,
            invoiceQuotedMaterialAmount,
            invoiceQuotedWasteRemovalAmount,
            invoiceLabourAmount,
            invoiceTotalQuoteAmount,
            invoiceMaterialAmount,
            invoiceWasteRemovalAmount,
            invoiceTaxAmount,
            invoiceTotalAmount,
            invoiceServiceFeeAmount,
            invoiceBalanceOwingAmount,
            invoiceAmountDue,
            onAmountChange,

            // SELECT
            invoiceServiceFee,
            invoiceServiceFeeOptions,
            onSelectChange,

            // RADIO
            invoicePaidTo,
            paymentStatus,
            onRadioChange,

            // DATE
            invoiceDate,
            onInvoiceDateChange,
            invoiceServiceFeePaymentDate,
            onInvoiceServiceFeePaymentDate,
            invoiceActualServiceFeeAmountPaid,
            completionDate,
            onCompletionDate,

            // EVERYTHING ELSE
            onClick, id, isLoading, errors, orderDetail
        } = this.props;

        // Generate our list of choices from 1 to 30.
        let visitChoices = [];
        for (let i = 1; i <= 30; i++) {
            visitChoices.push({
                id: 'visits-t-choice',
                name: "visits",
                value: i,
                label: i
            });
        }

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financials`}><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${id}`}><i className="fas fa-money-check-alt"></i>&nbsp;Order #{id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Order
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file"></i>&nbsp;Order Form
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-cogs"></i>&nbsp;Status
                            </p>

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.invoicePaidTo}
                                label="Who was paid for this job? (*)"
                                name="invoicePaidTo"
                                onChange={onRadioChange}
                                selectedValue={invoicePaidTo}
                                options={PAID_TO_CHOICES}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.paymentStatus}
                                label="What is the payment status of this job? (*)"
                                name="paymentStatus"
                                onChange={onRadioChange}
                                selectedValue={paymentStatus}
                                options={PAYMENT_STATUS_CHOICES}
                                helpText='Selecting "yes" will result in job being paid.'
                            />

                            {paymentStatus === WORK_ORDER_COMPLETED_AND_PAID_STATE &&
                                <BootstrapDatePicker
                                    label="Completion date (*)"
                                    name="completionDate"
                                    dateObj={completionDate}
                                    onTimeChange={onCompletionDate}
                                    datePickerClassName="form-control form-control-lg border"
                                    divClassName="form-group p-0 col-md-7 mb-4"
                                    error={errors.completionDate}
                                />
                            }

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
                                helpText="Please note, the system automatically generates an ID, however you are able to edit it if you wish."
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="# of Visit(s) (*)"
                                name="invoiceServiceFee"
                                defaultOptionLabel="Please select the service fee."
                                options={visitChoices}
                                value={visits}
                                error={errors.visits}
                                onSelectChange={onSelectChange}
                                helpText="The the number of visits that were made between the customer and associate for this particular work order. The minimum visit(s) needs to be 1 and maximum is 30."

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
                                error={errors.invoiceQuotedWasteRemovalAmount}
                                label="Quoted Waste Removal"
                                onChange={onAmountChange}
                                value={invoiceQuotedWasteRemovalAmount}
                                name="invoiceQuotedWasteRemovalAmount"
                                helpText="If no waste removal will occur then please enter zero."
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
                                error={errors.invoiceWasteRemovalAmount}
                                label="Actual Waste Removal (*)"
                                onChange={onAmountChange}
                                value={invoiceWasteRemovalAmount}
                                name="invoiceWasteRemovalAmount"
                                helpText="If no waste removal will occur then please enter zero."
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

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Deposit"
                                value={orderDetail.invoiceDepositAmount}
                                name="invoiceDepositAmount"
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Amount Due"
                                value={invoiceAmountDue}
                                name="invoiceAmountDue"
                                disabled={true}
                                helpText="This is the total amount subtracted by the deposit amount."
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

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/financial/${id}`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>



            </main>
        );
    }
}


const PAYMENT_STATUS_CHOICES = [
    {
        id: 'paymentStatus-t-choice',
        name: "paymentStatus",
        value: WORK_ORDER_COMPLETED_AND_PAID_STATE,
        label: "Paid"
    },{
        id: 'paymentStatus-f-choice',
        name: "paymentStatus",
        value: WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
        label: "Unpaid"
    }
];


const PAID_TO_CHOICES = [
    {
        id: 'invoicePaidTo-1-choice',
        name: "invoicePaidTo",
        value: 1,
        label: "Associate"
    },{
        id: 'invoicePaidTo-2-choice',
        name: "invoicePaidTo",
        value: 2,
        label: "Organization"
    }
];
