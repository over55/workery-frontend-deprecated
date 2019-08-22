// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from "../../bootstrap/bootstrapDatePicker";
import {
    WORK_ORDER_COMPLETED_AND_PAID_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    IS_OK_TO_EMAIL_CHOICES
} from "../../../constants/api";


export default class FinancialUpdateComponent extends Component {
    render() {
        const {
            id, isLoading, errors,

            invoiceIds,
            onTextChange,

            paymentStatus,
            onRadioChange,

            invoiceDate,
            onInvoiceDateChange,

            onClick,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financials`}><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${id}`}><i className="fas fa-money-check-alt"></i>&nbsp;Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Link>
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
                                borderColour="border-success"
                                error={errors.invoiceIds}
                                label="Invoice ID(s)"
                                onChange={onTextChange}
                                value={invoiceIds}
                                name="invoiceIds"
                                type="text"
                                helpText="Please note, you are able to input multiple invoice ID values if you want, just separate them by commas. Ex.: 123, 456."
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


export const PAYMENT_STATUS_CHOICES = [
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
