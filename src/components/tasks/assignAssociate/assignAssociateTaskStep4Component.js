import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


export default class AssignAssociateTaskStep4Component extends Component {
    render() {
        const { statusLabel, associateId, associateFullName, comment, id, task, onBack, onClick, isLoading, errors } = this.props;
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Assign Associate</h1>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <div className="jumbotron">
                            <h1 className="display-4"><i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation - Assign Associate</h1>

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
                                        <th scope="row" className="bg-light">Associate</th>
                                        <td>
                                            <Link to={`/associate/${associateId}`} target="_blank">
                                                {associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="bg-light">Accepted Job?</th>
                                        <td>{statusLabel}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <hr />
                            <p>Please click <strong>save</strong> to proceed.</p>
                            <p>
                            <Link to={`/task/1/${id}/step-3`} className="btn btn-orange btn-lg  float-left">
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
