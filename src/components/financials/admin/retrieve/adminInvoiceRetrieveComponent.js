// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminInvoiceRetrieveComponent extends Component {
    render() {
        const { id, invoice, errors, flashMessage, isLoading, onDownloadInvoicePDFClick } = this.props;
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
                            <i className="fas fa-money-check-alt"></i>&nbsp;Order #{id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/financial/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/financial/${id}/deposits`}>
                                <span className="num"><i className="fas fa-hand-holding-usd"></i>&nbsp;</span><span className="">Payments</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-file-invoice"></i>&nbsp;</span><span className="">Invoice</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/financial/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {invoice && invoice.invoiceId !== undefined && invoice.invoiceId !== null
                    ? <div className="row pt-3 mb-4 pb-2">
                        <div className="col-md-10 mx-auto p-2">

                            <h2>
                                <i className="fas fa-table"></i>&nbsp;Details
                            </h2>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <table className="table table-bordered custom-cell-w" id={`id-${id}-invoice-table`}>
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-file-invoice"></i>&nbsp;Invoice Header
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Invoice ID</th>
                                        <td>{invoice && invoice.invoiceId}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Invoice Date</th>
                                        <td>{invoice && invoice.invoiceDate}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Name</th>
                                        <td>{invoice && invoice.associateFullName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Phone</th>
                                        <td>{invoice && invoice.associateTelephone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate HST #</th>
                                        <td>{invoice && invoice.associateTaxId}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Name</th>
                                        <td>{invoice && invoice.customerFullName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Address</th>
                                        <td>{invoice && invoice.customerAddress}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Phone</th>
                                        <td>{invoice && invoice.customerTelephone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Email</th>
                                        <td>{invoice && invoice.customerEmail}</td>
                                    </tr>

                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-file-invoice"></i>&nbsp;Invoice Description
                                            <Link to={`/financial/${invoice.order}/invoice/update/second-section`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 01</th>
                                        <td>x{invoice.line01Qty} | {invoice.line01Desc} | <NumberFormat value={invoice.line01Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line01Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 02</th>
                                        {invoice.line02Qty
                                            ? <td>x{invoice.line02Qty} | {invoice.line02Desc} | <NumberFormat value={invoice.line02Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line02Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 03</th>
                                        {invoice.line03Qty
                                            ? <td>x{invoice.line03Qty} | {invoice.line03Desc} | <NumberFormat value={invoice.line03Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line03Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 04</th>
                                        {invoice.line04Qty
                                            ? <td>x{invoice.line04Qty} | {invoice.line04Desc} | <NumberFormat value={invoice.line04Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line04Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 05</th>
                                        {invoice.line05Qty
                                            ? <td>x{invoice.line05Qty} | {invoice.line05Desc} | <NumberFormat value={invoice.line05Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line05Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 06</th>
                                        {invoice.line06Qty
                                            ? <td>x{invoice.line06Qty} | {invoice.line06Desc} | <NumberFormat value={invoice.line06Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line06Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 07</th>
                                        {invoice.line07Qty
                                            ? <td>x{invoice.line07Qty} | {invoice.line07Desc} | <NumberFormat value={invoice.line07Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line07Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 08</th>
                                        {invoice.line08Qty
                                            ? <td>x{invoice.line08Qty} | {invoice.line08Desc} | <NumberFormat value={invoice.line08Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line08Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 09</th>
                                        {invoice.line09Qty
                                            ? <td>x{invoice.line09Qty} | {invoice.line09Desc} | <NumberFormat value={invoice.line09Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line09Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 10</th>
                                        {invoice.line10Qty
                                            ? <td>x{invoice.line10Qty} | {invoice.line10Desc} | <NumberFormat value={invoice.line10Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line10Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 11</th>
                                        {invoice.line11Qty
                                            ? <td>x{invoice.line11Qty} | {invoice.line11Desc} | <NumberFormat value={invoice.line11Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line11Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 12</th>
                                        {invoice.line12Qty
                                            ? <td>x{invoice.line12Qty} | {invoice.line12Desc} | <NumberFormat value={invoice.line12Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line12Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 13</th>
                                        {invoice.line13Qty
                                            ? <td>x{invoice.line13Qty} | {invoice.line13Desc} | <NumberFormat value={invoice.line13Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line13Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 14</th>
                                        {invoice.line14Qty
                                            ? <td>x{invoice.line14Qty} | {invoice.line14Desc} | <NumberFormat value={invoice.line14Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line14Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 15</th>
                                        {invoice.line15Qty
                                            ? <td>x{invoice.line15Qty} | {invoice.line15Desc} | <NumberFormat value={invoice.line15Price} displayType={'text'} thousandSeparator={true} prefix={'$'} /> | <NumberFormat value={invoice.line15Amount} displayType={'text'} thousandSeparator={true} prefix={'$'} /></td>
                                            : <td>-</td>
                                        }
                                    </tr>



                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-file-invoice"></i>&nbsp;Invoice Financials
                                            <Link to={`/financial/${invoice.order}/invoice/update/third-section`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Payment</th>
                                        <td>
                                            {invoice.invoiceDepositAmount
                                                ?<NumberFormat value={invoice.invoiceDepositAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Labour</th>
                                        <td>
                                            {invoice.invoiceLabourAmount
                                                ?<NumberFormat value={invoice.invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Materials</th>
                                        <td>
                                            {invoice.invoiceMaterialAmount
                                                ?<NumberFormat value={invoice.invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Waste Removal</th>
                                        <td>
                                            {invoice.invoiceWasteRemovalAmount
                                                ?<NumberFormat value={invoice.invoiceWasteRemovalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Total Tax</th>
                                        <td>
                                            {invoice.invoiceTaxAmount
                                                ?<NumberFormat value={invoice.invoiceTaxAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Total</th>
                                        <td>
                                            {invoice.invoiceTotalAmount
                                                ?<NumberFormat value={invoice.invoiceTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate HST</th>
                                        <td>
                                            {invoice.associateTaxId
                                                ? invoice.associateTaxId
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Date of Quote Approval</th>
                                        <td>
                                            {invoice.invoiceQuoteDate
                                                ? <Moment format="MM/DD/YYYY">{invoice.invoiceQuoteDate}</Moment>
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Customer Approval</th>
                                        <td>
                                            {invoice.invoiceCustomersApproval
                                                ? invoice.invoiceCustomersApproval
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 01 - Notes or Extras</th>
                                        <td>
                                            {invoice.line01Notes
                                                ? invoice.line01Notes
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Line 02 - Notes or Extras</th>
                                        <td>
                                            {invoice.line02Notes
                                                ? invoice.line02Notes
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Payment Date</th>
                                        <td>
                                            {invoice.invoiceQuoteDate
                                                ? <Moment format="MM/DD/YYYY">{invoice.invoiceQuoteDate}</Moment>
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Cash</th>
                                        <td>
                                            {invoice.cash ? "X" : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Cheque</th>
                                        <td>
                                            {invoice.cheque ? "X" : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Debit</th>
                                        <td>
                                            {invoice.debit ? "X" : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Credit</th>
                                        <td>
                                            {invoice.credit ? "X" : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Other</th>
                                        <td>
                                            {invoice.other ? "X" : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Client Signature upon completion</th>
                                        <td>
                                            {invoice.clientSignature ? invoice.clientSignature : "-"}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Signature Date</th>
                                        <td>
                                            {invoice.associateSignDate
                                                ? <Moment format="MM/DD/YYYY">{invoice.associateSignDate}</Moment>
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Signature</th>
                                        <td>
                                            {invoice.associateSignature ? invoice.associateSignature : "-"}
                                        </td>
                                    </tr>


                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-server"></i>&nbsp;System
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Created At</th>
                                        <td>
                                             {invoice && <Moment format="MM/DD/YYYY hh:mm:ss a">{invoice.created}</Moment>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Created By</th>
                                        <td>{invoice.createdBy}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Modified At</th>
                                        <td>
                                            {invoice && <Moment format="MM/DD/YYYY hh:mm:ss a">{invoice.lastModified}</Moment>}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Modified By</th>
                                        <td>{invoice.lastModifiedBy}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Revision Version</th>
                                        <td>{invoice && invoice.revisionVersion}</td>
                                    </tr>


                                </tbody>
                            </table>
                            <form>
                                <div className="form-group">
                                    <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onDownloadInvoicePDFClick}>
                                        <i className="fas fa-cloud-download-alt"></i>&nbsp;Download PDF
                                    </button>
                                    <Link to={`/financials`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    : <div className="jumbotron">
                        <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;No Invoice</h1>
                        <p className="lead">No invoice has been created, as a result you will need to create it before you are able to download the PDF copy of it.</p>
                        <p>Please click below to begin creating the invoice.</p>
                        <p className="lead">
                            <Link className="btn btn-primary btn-lg" to={`/financial/${id}/invoice/create/step-1`}>
                                Begin Wizard&nbsp;<i className="fas fa-chevron-right"></i>
                            </Link>
                        </p>
                    </div>

                }
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
