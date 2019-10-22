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
import { BootstrapCurrencyInput } from "../../../bootstrap/bootstrapCurrencyInput";
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../../constants/api";


class AssociateInvoiceSecondSectionUpdateComponent extends Component {
    render() {
        const {
            orderId, order, errors,
            line01Quantity, line01Description, line01UnitPrice, line01Amount,
            line02Quantity, line02Description, line02UnitPrice, line02Amount,
            line03Quantity, line03Description, line03UnitPrice, line03Amount,
            line04Quantity, line04Description, line04UnitPrice, line04Amount,
            line05Quantity, line05Description, line05UnitPrice, line05Amount,
            line06Quantity, line06Description, line06UnitPrice, line06Amount,
            line07Quantity, line07Description, line07UnitPrice, line07Amount,
            line08Quantity, line08Description, line08UnitPrice, line08Amount,
            line09Quantity, line09Description, line09UnitPrice, line09Amount,
            line10Quantity, line10Description, line10UnitPrice, line10Amount,
            line11Quantity, line11Description, line11UnitPrice, line11Amount,
            line12Quantity, line12Description, line12UnitPrice, line12Amount,
            line13Quantity, line13Description, line13UnitPrice, line13Amount,
            line14Quantity, line14Description, line14UnitPrice, line14Amount,
            line15Quantity, line15Description, line15UnitPrice, line15Amount,
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
                            <Link to="/company-financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/company-financial/${orderId}/invoice`}>
                                <i className="fas fa-money-check-alt"></i>&nbsp;Order #{orderId && orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Update Invoice - Details
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;Details
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
                                error={errors.line01Amount}
                                label="Line 01 Amount (*)"
                                onChange={onAmountChange}
                                value={line01Amount}
                                name="line01Amount"
                                helpText=""
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
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
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 06
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line06Quantity}
                                label="Line 06 Quantity"
                                onChange={onTextChange}
                                value={line06Quantity}
                                name="line06Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line06Description}
                                label="Line 06 Description"
                                onChange={onTextChange}
                                value={line06Description}
                                name="line06Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line06UnitPrice}
                                label="Line 06 Unit Price"
                                onChange={onAmountChange}
                                value={line06UnitPrice}
                                name="line06UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line06UnitPrice}
                                label="Line 06 Amount"
                                onChange={onAmountChange}
                                value={line06Amount}
                                name="line06Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 07
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line07Quantity}
                                label="Line 07 Quantity"
                                onChange={onTextChange}
                                value={line07Quantity}
                                name="line07Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line07Description}
                                label="Line 07 Description"
                                onChange={onTextChange}
                                value={line07Description}
                                name="line07Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line07UnitPrice}
                                label="Line 07 Unit Price"
                                onChange={onAmountChange}
                                value={line07UnitPrice}
                                name="line07UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line07UnitPrice}
                                label="Line 07 Amount"
                                onChange={onAmountChange}
                                value={line07Amount}
                                name="line07Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 08
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line08Quantity}
                                label="Line 08 Quantity"
                                onChange={onTextChange}
                                value={line08Quantity}
                                name="line08Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line08Description}
                                label="Line 08 Description"
                                onChange={onTextChange}
                                value={line08Description}
                                name="line08Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line08UnitPrice}
                                label="Line 08 Unit Price"
                                onChange={onAmountChange}
                                value={line08UnitPrice}
                                name="line08UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line08UnitPrice}
                                label="Line 08 Amount"
                                onChange={onAmountChange}
                                value={line08Amount}
                                name="line08Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 09
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line09Quantity}
                                label="Line 09 Quantity"
                                onChange={onTextChange}
                                value={line09Quantity}
                                name="line09Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line09Description}
                                label="Line 09 Description"
                                onChange={onTextChange}
                                value={line09Description}
                                name="line09Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line09UnitPrice}
                                label="Line 09 Unit Price"
                                onChange={onAmountChange}
                                value={line09UnitPrice}
                                name="line09UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line09UnitPrice}
                                label="Line 09 Amount"
                                onChange={onAmountChange}
                                value={line09Amount}
                                name="line09Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 10
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line10Quantity}
                                label="Line 10 Quantity"
                                onChange={onTextChange}
                                value={line10Quantity}
                                name="line10Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line10Description}
                                label="Line 10 Description"
                                onChange={onTextChange}
                                value={line10Description}
                                name="line10Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line10UnitPrice}
                                label="Line 10 Unit Price"
                                onChange={onAmountChange}
                                value={line10UnitPrice}
                                name="line10UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line10Amount}
                                label="Line 10 Amount"
                                onChange={onAmountChange}
                                value={line10Amount}
                                name="line10Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 11
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line11Quantity}
                                label="Line 11 Quantity"
                                onChange={onTextChange}
                                value={line11Quantity}
                                name="line11Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line11Description}
                                label="Line 11 Description"
                                onChange={onTextChange}
                                value={line11Description}
                                name="line11Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line11UnitPrice}
                                label="Line 11 Unit Price"
                                onChange={onAmountChange}
                                value={line11UnitPrice}
                                name="line11UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line11UnitPrice}
                                label="Line 11 Amount"
                                onChange={onAmountChange}
                                value={line11Amount}
                                name="line11Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 12
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line12Quantity}
                                label="Line 12 Quantity"
                                onChange={onTextChange}
                                value={line12Quantity}
                                name="line12Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line12Description}
                                label="Line 12 Description"
                                onChange={onTextChange}
                                value={line12Description}
                                name="line12Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line12UnitPrice}
                                label="Line 12 Unit Price"
                                onChange={onAmountChange}
                                value={line12UnitPrice}
                                name="line12UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line12UnitPrice}
                                label="Line 12 Amount"
                                onChange={onAmountChange}
                                value={line12Amount}
                                name="line12Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 13
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line13Quantity}
                                label="Line 13 Quantity"
                                onChange={onTextChange}
                                value={line13Quantity}
                                name="line13Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line13Description}
                                label="Line 13 Description"
                                onChange={onTextChange}
                                value={line13Description}
                                name="line13Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line13UnitPrice}
                                label="Line 13 Unit Price"
                                onChange={onAmountChange}
                                value={line13UnitPrice}
                                name="line13UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line13UnitPrice}
                                label="Line 13 Amount"
                                onChange={onAmountChange}
                                value={line13Amount}
                                name="line13Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 14
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line14Quantity}
                                label="Line 14 Quantity"
                                onChange={onTextChange}
                                value={line14Quantity}
                                name="line14Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line14Description}
                                label="Line 14 Description"
                                onChange={onTextChange}
                                value={line14Description}
                                name="line14Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line14UnitPrice}
                                label="Line 14 Unit Price"
                                onChange={onAmountChange}
                                value={line14UnitPrice}
                                name="line14UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line14UnitPrice}
                                label="Line 14 Amount"
                                onChange={onAmountChange}
                                value={line14Amount}
                                name="line14Amount"
                                helpText=""
                                disabled={true}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                Line 15
                            </p>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line15Quantity}
                                label="Line 15 Quantity"
                                onChange={onTextChange}
                                value={line15Quantity}
                                name="line15Quantity"
                                type="number"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.line15Description}
                                label="Line 15 Description"
                                onChange={onTextChange}
                                value={line15Description}
                                name="line15Description"
                                type="text"
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line15UnitPrice}
                                label="Line 15 Unit Price"
                                onChange={onAmountChange}
                                value={line15UnitPrice}
                                name="line15UnitPrice"
                                helpText=""
                            />

                            <BootstrapCurrencyInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.line15UnitPrice}
                                label="Line 15 Amount"
                                onChange={onAmountChange}
                                value={line15Amount}
                                name="line15Amount"
                                helpText=""
                                disabled={true}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/company-financial/${orderId}/invoice/create/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AssociateInvoiceSecondSectionUpdateComponent;
