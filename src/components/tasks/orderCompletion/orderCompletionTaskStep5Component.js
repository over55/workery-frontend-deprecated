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
            invoiceIds, invoiceQuotedLabourAmount, invoiceQuotedMaterialAmount, invoiceTotalQuoteAmount, invoiceLabourAmount,
            invoiceMaterialAmount, invoiceTaxAmount, invoiceTotalAmount, invoiceServiceFeeAmount, invoiceBalanceOwingAmount,
            invoiceServiceFee, hasInputtedFinancials, invoiceDate, invoiceActualServiceFeeAmountPaid, invoiceServiceFeePaymentDate,
            invoicePaidTo, paymentStatus, invoiceQuotedOtherCostsAmountinvoiceOtherCostsAmount,
            invoiceDepositAmount, invoiceAmountDue,

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

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation - Order Completion</h1>

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Summary
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
                                                    <Moment format="MM/DD/YYYY">{completionDate}</Moment>
                                                }
                                            </td>
                                        </tr>
                                    }
                                    <tr>
                                        <th scope="row" className="bg-light">Was this job successfully completed by the Associate?</th>
                                        <td>
                                            {wasCompletedLabel}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/task/6/${id}/step-4`} className="btn btn-orange btn-lg  float-left">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                                <button className="btn btn-success btn-lg" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                            </p>
                        </div>

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
