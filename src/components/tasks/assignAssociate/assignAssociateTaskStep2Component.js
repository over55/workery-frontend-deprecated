// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


export default class AssignAssociateTaskStep1Component extends Component {
    render() {
        const {
            task, associates, activitySheetItems, id, errors, isLoading, onClick
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task #1
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Argyle</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/1/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Selection</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Task Details
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
                                    <th scope="row" className="bg-light">Client Phone #</th>
                                    <td>
                                        {task &&
                                            <a href={`tel:${task.jobCustomerE164Telephone}`}>
                                                {task.jobCustomerTelephone}
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Location</th>
                                    <td>
                                        {task &&
                                            <a href={task.jobCustomerLocationGoogleUrl} target="_blank">
                                                {task.jobCustomerLocation}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Description</th>
                                    <td>{task && task.jobDescription}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill Set(s)</th>
                                    <td>
                                        {task.jobPrettySkillSets && task.jobPrettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comments</th>
                                    <td>
                                        <Link to={`/order/${task.job}/comments`} target="_blank">
                                            View comments&nbsp;({task.jobCommentsCount})&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-sm-12 mx-auto mt-4 pt-4">
                    <h2>
                        <i className="fas fa-user-check"></i>&nbsp;Available Associates
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>E-Mail</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {associates && associates.map(
                                    (associate) => <AssociateItem associate={associate} onClick={onClick} key={`act-${associate.id}`} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-sm-12 mx-auto mt-4 pt-4">
                    <h2>
                        <i className="fas fa-id-card-alt"></i>&nbsp;Activity Sheet Items
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Status</th>
                                <th>Comment</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {activitySheetItems && activitySheetItems.map(
                                    (activitySheetItem) => <ActivitySheetItem activitySheetItem={activitySheetItem} onClick={onClick} key={`act-${activitySheetItem.id}`} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        );
    }
}


class SkillSetItem extends Component {
    render() {
        const { subCategory, value } = this.props.skillSet;
        return (
            <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        );
    };
}


class ActivitySheetItem extends Component {
    render() {
        const { associate, associateFullName, associateTelephone, associateE164Telephone, associateEmail, prettyState, comment } = this.props.activitySheetItem;
        const { onClick } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/associate/${associate}`} target="_blank">{associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                </td>
                <td>
                    {prettyState}
                </td>
                <td>
                    {comment}
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, associate) } }>Re-Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
        // const { subCategory, value } = this.props.skillSet;
        // return (
        //     <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        // );
    };
}


class AssociateItem extends Component {
    render() {
        const { id, fullName, telephone, e164Telephone, email } = this.props.associate;
        const { onClick } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/associate/${id}`} target="_blank">{fullName}&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                </td>
                <td>
                    <a href={`tel:${e164Telephone}`}>{telephone}</a>
                </td>
                <td>
                    <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, id) } }>Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
    };
}
