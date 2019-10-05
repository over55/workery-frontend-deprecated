// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class FinancialRetrieveComponent extends Component {
    render() {
        const { order, errors, flashMessage, isLoading, } = this.props;
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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-money-check-alt"></i>&nbsp;Order #{order && order.id && order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/financial/${order.id}/invoice`}>
                                <span className="num"><i className="fas fa-file-invoice"></i>&nbsp;</span><span className="">Invoice</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client</th>
                                    <td>
                                        <Link to={`/client/${order.customer}`} target="_blank">
                                            {order && order.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order #</th>
                                    <td>
                                        <Link to={`/order/${order.id}`} target="_blank">
                                            {order && order.id && order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                {order && order.clonedFrom !== undefined && order.clonedFrom !== null && order.clonedFrom !== "" &&
                                    <tr>
                                        <th scope="row" className="bg-light"><i className="fas fa-external-link-alt"></i>Cloned from Order #</th>
                                        <td>
                                            <Link to={`/order/${order.clonedFrom}`} target="_blank">
                                                {order && order.clonedFrom && order.clonedFrom.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Order Start Date</th>
                                    <td>
                                        {order.startDate
                                            ? <Moment format="MM/DD/YYYY">{order.startDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order Completion Date</th>
                                    <td>
                                        {order.completionDate
                                            ? <Moment format="MM/DD/YYYY">{order.completionDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate</th>
                                    <td>
                                        <Link to={`/associate/${order.associate}`} target="_blank">
                                            {order && order.associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Date</th>
                                    <td>
                                        {order.invoiceDate
                                            ? <Moment format="MM/DD/YYYY">{order.invoiceDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID(s) #</th>
                                    <td>{order.invoiceIds}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Labour</th>
                                    <td>
                                        {order.invoiceQuotedLabourAmount
                                            ?<NumberFormat value={order.invoiceQuotedLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Materials</th>
                                    <td>
                                        {order.invoiceQuotedMaterialAmount
                                            ?<NumberFormat value={order.invoiceQuotedMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Waste Removal</th>
                                    <td>
                                        {order.invoiceQuotedWasteRemovalAmount
                                            ?<NumberFormat value={order.invoiceQuotedWasteRemovalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total Quote</th>
                                    <td>
                                        {order.invoiceTotalQuoteAmount
                                            ?<NumberFormat value={order.invoiceTotalQuoteAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
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
                                    <th scope="row" className="bg-light">Actual Waste Removal</th>
                                    <td>
                                        {order.invoiceWasteRemovalAmount
                                            ?<NumberFormat value={order.invoiceWasteRemovalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
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
                                <tr>
                                    <th scope="row" className="bg-light">Account Balance</th>
                                    <td>
                                        {order.invoiceBalanceOwingAmount
                                            ?<NumberFormat value={order.invoiceBalanceOwingAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light"># of Visits</th>
                                    <td>
                                        {order && order.visits
                                            ? order.visits.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
                                            : "-"
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <Link to={`/financial/${order.id}/clone`}>
                                                    Clone&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`/order/${order.id}/close`} target="_blank">
                                                    Cancel&nbsp;<i className="fas fa-external-link-alt"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`/order/${order.id}/unassign-associate`} target="_blank">
                                                    Unassign&nbsp;<i className="fas fa-external-link-alt"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <Link to={`/financial/${order.id}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link>
                                <Link to={`/financials`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


/**
 *  Function will take the tag value which was selected and find print it with
 *  the label from the tagOptions data.
 */
class TagItem extends Component {
    render() {
        const { tag, tagOptions } = this.props;
        for (let i = 0; i < tagOptions.length; i++) {
            let tagOption = tagOptions[i];
            if (tagOption.value === tag) {
                return (
                    <span className="badge badge-info badge-lg" value={tag}>{tagOption.label}</span>
                );
            }
        }
        return (null);
    };
}


/**
 *  Function will take the howDidYouHear value which was selected and find
 * print it with the label from the howDidYouHearOptions data.
 */
class HowDidYouHearText extends Component {
    render() {
        const { howDidYouHear, howDidYouHearOther, howDidYouHearOptions } = this.props;
        if (howDidYouHearOther !== null && howDidYouHearOther !== undefined && howDidYouHearOther !== "") {
            return howDidYouHearOther;
        }
        for (let i = 0; i < howDidYouHearOptions.length; i++) {
            let howDidYouHearOption = howDidYouHearOptions[i];
            if (howDidYouHearOption.value === howDidYouHear) {
                return (
                    <span value={howDidYouHear}>{howDidYouHearOption.label}</span>
                );
            }
        }
        return (null);
    };
}
