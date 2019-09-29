// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapCurrencyInput } from "../../bootstrap/bootstrapCurrencyInput";
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../constants/api";


class InvoiceCreateStep2Component extends Component {
    render() {
        const {
            orderId, order, errors,
            line01Quantity, line01Description, line01UnitPrice, line01Amount,
            line02Quantity, line02Description, line02UnitPrice, line02Amount,
            line03Quantity, line03Description, line03UnitPrice, line03Amount,
            line04Quantity, line04Description, line04UnitPrice, line04Amount,
            line05Quantity, line05Description, line05UnitPrice, line05Amount,
            onAmountChange, onTextChange, isLoading, onClick
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
                            <i className="fas fa-money-check-alt"></i>&nbsp;Create
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Create Invoice
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/financial/${orderId}/invoice/create/step-1`}>
                                <span className="num">1.</span><span className="">First Section</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Second Section</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Third Section</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;Second Section
                            </h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 01
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.line01Quantity}
                                label="Line 01 Quantity (*)"
                                onChange={onTextChange}
                                value={line01Quantity}
                                name="line01Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.line01Description}
                                label="Line 01 Description (*)"
                                onChange={onTextChange}
                                value={line01Description}
                                name="line01Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.line01UnitPrice}
                                label="Line 01 Unit Price (*)"
                                onChange={onAmountChange}
                                value={line01UnitPrice}
                                name="line01UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.line01UnitPrice}
                                label="Line 01 Amount (*)"
                                onChange={onAmountChange}
                                value={line01Amount}
                                name="line01Amount"
                                helpText=""
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 02
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line02Quantity}
                                label="Line 02 Quantity"
                                onChange={onTextChange}
                                value={line02Quantity}
                                name="line02Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line02Description}
                                label="Line 02 Description"
                                onChange={onTextChange}
                                value={line02Description}
                                name="line02Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line02UnitPrice}
                                label="Line 02 Unit Price"
                                onChange={onAmountChange}
                                value={line02UnitPrice}
                                name="line02UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line02UnitPrice}
                                label="Line 02 Amount"
                                onChange={onAmountChange}
                                value={line02Amount}
                                name="line02Amount"
                                helpText=""
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 03
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line03Quantity}
                                label="Line 03 Quantity"
                                onChange={onTextChange}
                                value={line03Quantity}
                                name="line03Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line03Description}
                                label="Line 03 Description"
                                onChange={onTextChange}
                                value={line03Description}
                                name="line03Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line03UnitPrice}
                                label="Line 03 Unit Price"
                                onChange={onAmountChange}
                                value={line03UnitPrice}
                                name="line03UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line03UnitPrice}
                                label="Line 03 Amount"
                                onChange={onAmountChange}
                                value={line03Amount}
                                name="line03Amount"
                                helpText=""
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 04
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line04Quantity}
                                label="Line 04 Quantity"
                                onChange={onTextChange}
                                value={line04Quantity}
                                name="line04Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line04Description}
                                label="Line 04 Description"
                                onChange={onTextChange}
                                value={line04Description}
                                name="line04Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line04UnitPrice}
                                label="Line 04 Unit Price"
                                onChange={onAmountChange}
                                value={line04UnitPrice}
                                name="line04UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line04UnitPrice}
                                label="Line 04 Amount"
                                onChange={onAmountChange}
                                value={line04Amount}
                                name="line04Amount"
                                helpText=""
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 05
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line05Quantity}
                                label="Line 05 Quantity"
                                onChange={onTextChange}
                                value={line05Quantity}
                                name="line05Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line05Description}
                                label="Line 05 Description"
                                onChange={onTextChange}
                                value={line05Description}
                                name="line05Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line05UnitPrice}
                                label="Line 05 Unit Price"
                                onChange={onAmountChange}
                                value={line05UnitPrice}
                                name="line05UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line05UnitPrice}
                                label="Line 05 Amount"
                                onChange={onAmountChange}
                                value={line05Amount}
                                name="line05Amount"
                                helpText=""
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Next&nbsp;<i className="fas fa-chevron-right"></i>
                                </button>
                                <Link to={`/financial/${orderId}/invoice/create/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default InvoiceCreateStep2Component;
