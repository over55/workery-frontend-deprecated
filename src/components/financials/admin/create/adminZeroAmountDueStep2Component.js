// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapCurrencyInput } from "../../bootstrap/bootstrapCurrencyInput";
import { BootstrapCheckbox } from "../../bootstrap/bootstrapCheckbox";
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../constants/api";


class AdminZeroAmountDueStep2Component extends Component {
    render() {
        const {
            orderId, order,
            paidAt, onPaidAtChange,
            depositMethod, depositMethodLabel, paidToLabel, paidForLabel, onRadioChange,
            amount, onAmountChange, invoiceAmountDue,
            errors,
            isLoading, onClick, onSelectChange
        } = this.props;
        const invoiceSubTotalAmount = parseFloat(order.invoiceLabourAmount) + parseFloat(order.invoiceTaxAmount);
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
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
                            <i className="fas fa-coins"></i>&nbsp;Zero Amount Due
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-coins"></i>&nbsp;Create Payment
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/financial/${orderId}/zero-amount-due/create/step-1`}>
                                <span className="num">1.</span><span className="">Decision</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the invoice:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-file-invoice-dollar"></i>&nbsp;Payment Detail
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Paid at</th>
                                    <td><Moment format="MM/DD/YYYY">{paidAt}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Payment Method</th>
                                    <td>{depositMethodLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Paid to</th>
                                    <td>{paidToLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Paid for</th>
                                    <td>{paidForLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Amount</th>
                                    <td>
                                        <NumberFormat value={amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/financial/${orderId}/zero-amount-due/create/step-1`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminZeroAmountDueStep2Component;
