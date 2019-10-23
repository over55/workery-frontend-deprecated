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
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../../constants/api";


class AssociateInvoiceCreateStep2Component extends Component {
    render() {
        const {
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
            orderId, order, errors, invoiceId, invoiceDate,
            invoiceQuoteDays, invoiceQuoteDate, invoiceCustomersApproval, line01Notes, line02Notes, paymentDate,
            cash, cheque, debit, credit, other, clientSignature, associateSignDate, associateSignature,
            isLoading, onClick,
        } = this.props;
        const invoiceSubTotalAmount = parseFloat(order.invoiceLabourAmount) + parseFloat(order.invoiceMaterialAmount) + parseFloat(order.invoiceWasteRemovalAmount);
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
                        <div id="step-3" className="st-grey">
                            <Link to={`/company-financial/${orderId}/invoice/create/step-3`}>
                                <span className="num">3.</span><span className="">Financials</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Review</span>
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
                                        <i className="fas fa-file-invoice-dollar"></i>&nbsp;Review
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID</th>
                                    <td>{invoiceId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Date</th>
                                    <td><Moment format="MM/DD/YYYY">{invoiceDate}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Name</th>
                                    <td>{order && order.associateFullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Telephone</th>
                                    <td>{order && order.associateTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Tax ID</th>
                                    <td>{order && order.associateTaxId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Name</th>
                                    <td>{order && order.customerFullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Address</th>
                                    <td>{order && order.customerAddress}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Email</th>
                                    <td>{order && order.customerEmail}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-file-invoice-dollar"></i>&nbsp;Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 01</th>
                                    <td>x{line01Quantity} | {line01Description} | {line01UnitPrice} | {line01Amount}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 02</th>
                                    <td>
                                        {line02Quantity
                                            ? <div>x{line02Quantity} | {line02Description} | {line02UnitPrice} | {line02Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 03</th>
                                    <td>
                                        {line03Quantity
                                            ? <div>x{line03Quantity} | {line03Description} | {line03UnitPrice} | {line03Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 04</th>
                                    <td>
                                        {line04Quantity
                                            ? <div>x{line04Quantity} | {line04Description} | {line04UnitPrice} | {line04Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 05</th>
                                    <td>
                                        {line05Quantity
                                            ? <div>x{line05Quantity} | {line05Description} | {line05UnitPrice} | {line05Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 06</th>
                                    <td>
                                        {line06Quantity
                                            ? <div>x{line06Quantity} | {line06Description} | {line06UnitPrice} | {line06Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 07</th>
                                    <td>
                                        {line07Quantity
                                            ? <div>x{line07Quantity} | {line07Description} | {line07UnitPrice} | {line07Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 08</th>
                                    <td>
                                        {line08Quantity
                                            ? <div>x{line08Quantity} | {line08Description} | {line08UnitPrice} | {line08Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 09</th>
                                    <td>
                                        {line09Quantity
                                            ? <div>x{line09Quantity} | {line09Description} | {line09UnitPrice} | {line09Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 10</th>
                                    <td>
                                        {line10Quantity
                                            ? <div>x{line10Quantity} | {line10Description} | {line10UnitPrice} | {line10Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 11</th>
                                    <td>
                                        {line11Quantity
                                            ? <div>x{line11Quantity} | {line11Description} | {line11UnitPrice} | {line11Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 12</th>
                                    <td>
                                        {line12Quantity
                                            ? <div>x{line12Quantity} | {line12Description} | {line12UnitPrice} | {line12Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 13</th>
                                    <td>
                                        {line13Quantity
                                            ? <div>x{line13Quantity} | {line13Description} | {line13UnitPrice} | {line13Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 14</th>
                                    <td>
                                        {line14Quantity
                                            ? <div>x{line14Quantity} | {line14Description} | {line14UnitPrice} | {line14Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 15</th>
                                    <td>
                                        {line15Quantity
                                            ? <div>x{line15Quantity} | {line15Description} | {line15UnitPrice} | {line15Amount}</div>
                                            : "-"
                                        }
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-file-invoice-dollar"></i>&nbsp;Financials
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Labour Amount</th>
                                    <td>
                                        {order.invoiceLabourAmount
                                            ?<NumberFormat value={order.invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Labour Materials</th>
                                    <td>
                                        {order.invoiceMaterialAmount
                                            ?<NumberFormat value={order.invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Waste Removal</th>
                                    <td>
                                        {order.invoiceWasteRemovalAmount
                                            ?<NumberFormat value={order.invoiceWasteRemovalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Subtotal</th>
                                    <td>
                                        {invoiceSubTotalAmount
                                            ?<NumberFormat value={invoiceSubTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">HST (13%)</th>
                                    <td>
                                        {order.invoiceTaxAmount
                                            ?<NumberFormat value={order.invoiceTaxAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total</th>
                                    <td>
                                        {order.invoiceTotalAmount
                                            ?<NumberFormat value={order.invoiceTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Deposit</th>
                                    <td>
                                        {order.invoiceDepositAmount
                                            ?<NumberFormat value={order.invoiceDepositAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Amount Due</th>
                                    <td>
                                        {order.invoiceAmountDue
                                            ?<NumberFormat value={order.invoiceAmountDue} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">This quote is valid for the following number of days</th>
                                    <td>{invoiceQuoteDays}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate HST</th>
                                    <td>{order && order.associateTaxId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Quote Approval</th>
                                    <td><Moment format="MM/DD/YYYY">{invoiceQuoteDate}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Customer Approval</th>
                                    <td>{invoiceCustomersApproval}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 01 - Notes or Extras</th>
                                    <td>{line01Notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Line 02 - Notes or Extras</th>
                                    <td>{line02Notes}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Payment Date</th>
                                    <td><Moment format="MM/DD/YYYY">{paymentDate}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Cash</th>
                                    <td>{cash ? "X" : ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Cheque</th>
                                    <td>{cheque ? "X" : ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Debit</th>
                                    <td>{debit ? "X" : ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Credit</th>
                                    <td>{credit ? "X" : ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Other</th>
                                    <td>{other ? "X" : ""}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Signature upon completion</th>
                                    <td>{clientSignature}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Signature Date</th>
                                    <td><Moment format="MM/DD/YYYY">{associateSignDate}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Signature</th>
                                    <td>{associateSignature}</td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/company-financial/${orderId}/invoice/create/step-3`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
