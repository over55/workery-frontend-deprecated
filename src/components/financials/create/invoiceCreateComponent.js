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
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../constants/api";


class InvoiceCreateComponent extends Component {
    render() {
        const {
            orderId, order, errors,
            onTextChange, onRadioChange, isLoading, onClick, onSelectChange
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-money-check-alt"></i>&nbsp;Order #{orderId && orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-file-invoice-dollar"></i>&nbsp;Create Invoice
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file-invoice-dollar"></i>&nbsp;First Section
                            </h2>

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-table"></i>&nbsp;Details
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Name</th>
                                        <td>{order && order.associateFullName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Phone</th>
                                        <td>{order && order.associateTelephone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate HST #</th>
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
                                        <th scope="row" className="bg-light">Client Phone</th>
                                        <td>{order && order.customerTelephone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Email</th>
                                        <td>{order && order.customerEmail}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Labour</th>
                                        <td>
                                            {order.invoiceLabourAmount
                                                ?<NumberFormat value={order.invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Materials</th>
                                        <td>
                                            {order.invoiceMaterialAmount
                                                ?<NumberFormat value={order.invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Total Tax</th>
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
                                        <th scope="row" className="bg-light">Service Fee Rate</th>
                                        <td>
                                            {order.prettyInvoiceServiceFee
                                                ?order.prettyInvoiceServiceFee
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Service Fee</th>
                                        <td>
                                            {order.invoiceServiceFeeAmount
                                                ?<NumberFormat value={order.invoiceServiceFeeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Service Fee Payment Date</th>
                                        <td>
                                            {order.invoiceServiceFeePaymentDate
                                                ?<Moment format="MM/DD/YYYY">{order.invoiceServiceFeePaymentDate}</Moment>
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Service Fee Paid</th>
                                        <td>
                                            {order.invoiceActualServiceFeeAmountPaid
                                                ?<NumberFormat value={order.invoiceActualServiceFeeAmountPaid} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>

                                </tbody>
                            </table>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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

export default InvoiceCreateComponent;
