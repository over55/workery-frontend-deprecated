import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


export default class SurveyTaskStep3Component extends Component {
    render() {
        const {
            wasSurveyConducted, wasSurveyConductedLabel,
            noSurveyConductedReason, noSurveyConductedReasonLabel, noSurveyConductedReasonOther,
            wasJobSatisfactoryLabel, wasJobFinishedOnTimeAndOnBudgetLabel, wasAssociatePunctualLabel, wasAssociateProfessionalLabel, wouldCustomerReferOurOrganizationLabel,
            comment, id, task, onBack, onClick, errors, isLoading
        } = this.props;
        const hasNoSurvey = wasSurveyConducted === false || wasSurveyConducted === "false";
        const hasSurvey = wasSurveyConducted === true || wasSurveyConducted === "true";
        const isNoSurveyConductedReasonOther = noSurveyConductedReason === 1;
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/7/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/7/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Survey</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Review</span>
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

                        <p><strong>Please confirm these details before submitting the survey task:</strong></p>

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
                                            {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
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
                                        <i className="fas fa-chart-pie"></i>&nbsp;Survey
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Was there a survey conducted?</th>
                                    <td>{wasSurveyConductedLabel}</td>
                                </tr>
                                {hasSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the quality of the work satisfactory?</th>
                                        <td>{wasJobSatisfactoryLabel}</td>
                                    </tr>
                                }
                                {hasSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the work completed on time and on budget?</th>
                                        <td>{wasJobFinishedOnTimeAndOnBudgetLabel}</td>
                                    </tr>
                                }
                                {hasSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member punctual?</th>
                                        <td>{wasAssociatePunctualLabel}</td>
                                    </tr>
                                }
                                {hasSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member professional?</th>
                                        <td>{wasAssociateProfessionalLabel}</td>
                                    </tr>
                                }
                                {hasSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Would you refer Over55 to a friend of family member?</th>
                                        <td>{wouldCustomerReferOurOrganizationLabel}</td>
                                    </tr>
                                }
                                {hasNoSurvey &&
                                    <tr>
                                        <th scope="row" className="bg-light">Reason survey was not conducted?</th>
                                        <td>
                                            {isNoSurveyConductedReasonOther
                                                ? noSurveyConductedReasonOther
                                                : noSurveyConductedReasonLabel
                                            }
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Comment</th>
                                    <td>{comment}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-info-circle"></i>&nbsp;Misc
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Note(s):</th>
                                    <td>
                                        <ul>
                                            <li>Please note that upon submission this order will become completed and there will be no more tasks afterwords.</li>
                                        </ul>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>

                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to={`/task/7/${id}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


class TagItem extends Component {
    render() {
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


class SkillSetItem extends Component {
    render() {
        const { subCategory, value } = this.props.skillSet;
        return (
            <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        );
    };
}
