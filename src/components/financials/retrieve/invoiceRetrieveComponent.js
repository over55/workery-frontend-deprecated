// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class InvoiceRetrieveComponent extends Component {
    render() {
        const { invoice, errors, flashMessage, isLoading, onDownloadInvoicePDFClick } = this.props;
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
                            <i className="fas fa-money-check-alt"></i>&nbsp;Order #{invoice && invoice.order && invoice.order.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/financial/${invoice.order}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-file-invoice"></i>&nbsp;</span><span className="">Invoice</span>
                            </strong>
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

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-file-invoice"></i>&nbsp;Invoice Header
                                            <Link to={`/financial/${invoice.order}/invoice/update`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Invoice ID</th>
                                        <td>---</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Invoice Date</th>
                                        <td>---</td>
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
                                            <Link to={`/financial/${invoice.order}/invoice/update`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                        </th>
                                    </tr>


                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-file-invoice"></i>&nbsp;Invoice Financials
                                            <Link to={`/financial/${invoice.order}/invoice/update`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                        </th>
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
                                        <th scope="row" className="bg-light">Service Fee Rate</th>
                                        <td>
                                            {invoice.prettyInvoiceServiceFee
                                                ?invoice.prettyInvoiceServiceFee
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Service Fee</th>
                                        <td>
                                            {invoice.invoiceServiceFeeAmount
                                                ?<NumberFormat value={invoice.invoiceServiceFeeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Service Fee Payment Date</th>
                                        <td>
                                            {invoice.invoiceServiceFeePaymentDate
                                                ?<Moment format="MM/DD/YYYY">{invoice.invoiceServiceFeePaymentDate}</Moment>
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Actual Service Fee Paid</th>
                                        <td>
                                            {invoice.invoiceActualServiceFeeAmountPaid
                                                ?<NumberFormat value={invoice.invoiceActualServiceFeeAmountPaid} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                                :"-"
                                            }
                                        </td>
                                    </tr>

                                </tbody>
                            </table>
                            <form>
                                <div className="form-group">
                                    <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onDownloadInvoicePDFClick}>
                                        <i className="fas fa-cloud-download-alt"></i>&nbsp;Download PDF
                                    </button>
                                    <Link to={`/financials`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
                            <Link className="btn btn-primary btn-lg" to={`/financial/${invoice.id}/invoice/create/step-1`}>
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
