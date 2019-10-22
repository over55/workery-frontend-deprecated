// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../../constants/api";


class AssociateInvoiceCreateStep1Component extends Component {
    render() {
        const {
            orderId, order, errors,
            invoiceId, invoiceDate,
            onTextChange, onRadioChange, onInvoiceDateChange, isLoading, onClick, onSelectChange
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${orderId}/invoice`}>
                                <i className="fas fa-money-check-alt"></i>&nbsp;Order #{orderId && orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Update Invoice - Review
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;Review
                            </h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.invoiceId}
                                label="Invoice ID (*)"
                                onChange={onTextChange}
                                value={invoiceId}
                                name="invoiceId"
                                type="text"
                            />

                            <BootstrapDatePicker
                                label="Invoice Date(*)"
                                name="invoiceDate"
                                dateObj={invoiceDate}
                                onTimeChange={onInvoiceDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.invoiceDate}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Name"
                                value={order && order.associateFullName}
                                name="associateFullName"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Telephone"
                                value={order && order.associateTelephone}
                                name="associateTelephone"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Associate Tax ID"
                                value={order && order.associateTaxId}
                                name="associateTaxId"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Name"
                                value={order && order.customerFullName}
                                name="customerFullName"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Address"
                                value={order && order.customerAddress}
                                name="customerAddress"
                                type="string"
                                disabled={true}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                label="Client Email"
                                value={order && order.customerEmail}
                                name="customerEmail"
                                type="string"
                                disabled={true}
                            />


                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/financial/${orderId}/invoice`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AssociateInvoiceCreateStep1Component;
