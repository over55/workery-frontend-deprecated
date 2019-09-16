import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import Moment from 'react-moment';
// import 'moment-timezone';


export default class OrderCompletionTaskStep5Component extends Component {
    render() {
        const {
            // Step 2
            wasCompleted, wasCompletedLabel, completionDate, reason, reasonLabel, reasonOther,

            // Step 3
            invoiceIds, visits, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount, invoiceTotalQuoteAmount, invoiceLabourAmount,
            invoiceMaterialAmount, invoiceTaxAmount, invoiceTotalAmount, invoiceServiceFeeAmount, invoiceBalanceOwingAmount,
            invoiceServiceFee, hasInputtedFinancials, invoiceDate, invoiceActualServiceFeeAmountPaid, invoiceServiceFeePaymentDate,

            // Step 4
            comment,

            // Everything else...
            task, id, onClick, onBack, errors, isLoading
        } = this.props;
        const isCancelled = wasCompleted === false || wasCompleted === "false";
        const isCompleted = wasCompleted === true || wasCompleted === "true";
        const isOtherHowDidYouHearSelected = reason === 1;
        const hasFinancials = hasInputtedFinancials === true || hasInputtedFinancials === "true";
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Order Completion</h1>

                {task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/6/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/6/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Status</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/task/6/${id}/step-3`}>
                                <span className="num">3.</span><span className="">Financials</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/task/6/${id}/step-4`}>
                                <span className="num">4.</span><span className="">Comment</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Review</span>
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
                        <p><strong>Please confirm these details before submitting the order completion task:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job #</th>
                                    <td>
                                        <Link to={`/order/${task.job}`} target="_blank">
                                            {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Name</th>
                                    <td>
                                        <Link to={`/client/${task.jobCustomer}`} target="_blank">
                                            {task && task.jobCustomerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Name</th>
                                    <td>
                                        <Link to={`/associate/${task.jobAssociate}`} target="_blank">
                                            {task && task.jobAssociateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-calendar-check"></i>&nbsp;Status
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Was this job successfully completed by the Associate?</th>
                                    <td>
                                        {wasCompletedLabel}
                                    </td>
                                </tr>
                                {isCancelled &&
                                    <tr>
                                        <th scope="row" className="bg-light">Reason&nbsp;{isOtherHowDidYouHearSelected && "(Other)"}</th>
                                        <td>
                                            {isOtherHowDidYouHearSelected
                                               ? reasonOther
                                               : reasonLabel
                                           }
                                        </td>
                                    </tr>
                                }
                                {isCompleted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Completion Date</th>
                                        <td>
                                            {completionDate &&
                                                <Moment format="YYYY/MM/DD">{completionDate}</Moment>
                                            }
                                        </td>
                                    </tr>
                                }


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-credit-card"></i>&nbsp;Financials
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Date</th>
                                    <td>
                                        {hasFinancials
                                            ? <Moment format="YYYY/MM/DD">{invoiceDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID(s)</th>
                                    <td>
                                        {hasFinancials
                                            ? invoiceIds
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Visits</th>
                                    <td>
                                        {hasFinancials
                                            ? visits
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Labour</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceQuotedLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Quoted Materials</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceQuotedMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total Quoted</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceTotalQuoteAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Labour</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Materials</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tax</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceTaxAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Total</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Service Fee</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceServiceFeeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Service fee payment date</th>
                                    <td>
                                        {hasFinancials
                                            ? <Moment format="YYYY/MM/DD">{invoiceServiceFeePaymentDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Actual Service Fee Paid</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceActualServiceFeeAmountPaid} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Balance Owing</th>
                                    <td>
                                        {hasFinancials
                                            ? <NumberFormat value={invoiceBalanceOwingAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            : "-"
                                        }
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-comments"></i>&nbsp;Comment
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Text</th>
                                    <td>{comment}</td>
                                </tr>


                            </tbody>
                        </table>

                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>

                                <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/6/${id}/step-4`}>
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>
                        </form>

                    </div>
                </div>


            </div>
        );
    }
}


const STATUS_CHOICES = [
    {
        id: 'wasCompleted-m-choice',
        name: "wasCompleted",
        value: true,
        label: "Yes"
    },{
        id: 'wasCompleted-f-choice',
        name: "wasCompleted",
        value: false,
        label: "No"
    }
];
