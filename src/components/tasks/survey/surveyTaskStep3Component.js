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
            comment, id, task, onBack, onClick, errors, isLoading, score
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

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation - Survey</h1>

                            <table className="table table-bordered custom-cell-w">
                                <tbody>
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Summary
                                        </th>
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
                                    {hasSurvey &&
                                        <tr>
                                            <th scope="row" className="bg-light">Score</th>
                                            <td>
                                                {score}/5
                                            </td>
                                        </tr>
                                    }
                                    <tr>
                                        <th scope="row" className="bg-light">Was there a survey conducted?</th>
                                        <td>{wasSurveyConductedLabel}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/task/7/${id}/step-2`} className="btn btn-orange btn-lg  float-left">
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
