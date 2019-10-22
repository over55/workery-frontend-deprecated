// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapCurrencyInput } from "../../../bootstrap/bootstrapCurrencyInput";
import { BootstrapCheckbox } from "../../../bootstrap/bootstrapCheckbox";
import {
    CUSTOMER_APPROVAL_RADIO_CHOICES
} from "../../../../constants/api";


class AssociateInvoiceCreateStep2Component extends Component {
    render() {
        const {
            orderId, order, errors,
            invoiceQuoteDays, invoiceQuoteDate, invoiceCustomersApproval, line01Notes, line02Notes, paymentDate,
            cash, cheque, debit, credit, other, clientSignature, associateSignDate, associateSignature,
            onTextChange, onInvoiceQuoteDateChange, isLoading, onClick, onSelectChange, onAmountChange, onPaymentDateChange, onAssociateSignDateChange, onCheckboxChange, onRadioChange
        } = this.props;
        const invoiceTotalAmount = order.invoiceLabourAmount + order.invoiceTaxAmount;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/company-financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/company-financial/${orderId}/invoice`}>
                                <i className="fas fa-money-check-alt"></i>&nbsp;Order #{orderId && orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Create Invoice
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Create Invoice
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/company-financial/${orderId}/invoice/create/step-1`}>
                                <span className="num">1.</span><span className="">Review</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/company-financial/${orderId}/invoice/create/step-2`}>
                                <span className="num">2.</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Financials</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;Financials
                            </h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Labour Amount"
                                value={order && order.invoiceLabourAmount}
                                name="invoiceLabourAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Labour Materials"
                                value={order && order.invoiceMaterialAmount}
                                name="invoiceMaterialAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Waste Removal"
                                value={order && order.invoiceWasteRemovalAmount}
                                name="invoiceWasteRemovalAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="HST (13%)"
                                value={order && order.invoiceTaxAmount}
                                name="invoiceTaxAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Total"
                                value={order && order.invoiceTotalAmount}
                                name="invoiceTotalAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Deposit"
                                value={order && order.invoiceDepositAmount}
                                name="invoiceDepositAmount"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                label="Amount Due"
                                value={order && order.invoiceAmountDue}
                                name="invoiceAmountDue"
                                helpText=""
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.invoiceQuoteDays}
                                label="This quote is valid for the following number of days: (*)"
                                onChange={onTextChange}
                                value={invoiceQuoteDays}
                                name="invoiceQuoteDays"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate HST"
                                value={order && order.associateTaxId}
                                name="associateTaxId"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapDatePicker
                                label="Date of Quote Approval (*)"
                                name="invoiceQuoteDate"
                                dateObj={invoiceQuoteDate}
                                onTimeChange={onInvoiceQuoteDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.invoiceQuoteDate}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.invoiceCustomersApproval}
                                label="Customer Approval: (*)"
                                name="invoiceCustomersApproval"
                                onChange={onRadioChange}
                                selectedValue={invoiceCustomersApproval}
                                options={CUSTOMER_APPROVAL_RADIO_CHOICES}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.line01Notes}
                                label="Line 01 - Notes or Extras (*)"
                                onChange={onTextChange}
                                value={line01Notes}
                                name="line01Notes"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line02Notes}
                                label="Line 02 - Notes or Extras"
                                onChange={onTextChange}
                                value={line02Notes}
                                name="line02Notes"
                                type="text"
                            />

                            <BootstrapDatePicker
                                label="Payment Date (*)"
                                name="paymentDate"
                                dateObj={paymentDate}
                                onTimeChange={onPaymentDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.paymentDate}
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.cash}
                                label="Cash"
                                onChange={onCheckboxChange}
                                value={cash}
                                name="cash"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.cheque}
                                label="Cheque"
                                onChange={onCheckboxChange}
                                value={cheque}
                                name="cheque"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.debit}
                                label="Debit"
                                onChange={onCheckboxChange}
                                value={debit}
                                name="debit"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.credit}
                                label="Credit"
                                onChange={onCheckboxChange}
                                value={credit}
                                name="credit"
                            />

                            <BootstrapCheckbox
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.other}
                                label="Other"
                                onChange={onCheckboxChange}
                                value={other}
                                name="other"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.clientSignature}
                                label="Client Signature upon completion:"
                                onChange={onTextChange}
                                value={clientSignature}
                                name="clientSignature"
                                type="text"
                                helpText="If the client's partner or legal representitive is signing on behalf of the client, please write their full name here, else leave the text as is."
                            />

                            <BootstrapDatePicker
                                label="Associate Signature Date (*)"
                                name="associateSignDate"
                                dateObj={associateSignDate}
                                onTimeChange={onAssociateSignDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.associateSignDate}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.associateSignature}
                                label="Associate Signature:"
                                onChange={onTextChange}
                                value={associateSignature}
                                name="associateSignature"
                                type="text"
                                helpText="If the associate is being represented by their business partner or other legal representitive then please write their full name here, else leave the text as is."
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-chevron-right"></i>
                                </button>
                                <Link to={`/company-financial/${orderId}/invoice/create/step-2`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AssociateInvoiceCreateStep2Component;
