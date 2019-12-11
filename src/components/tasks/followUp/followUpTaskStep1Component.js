import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';


export default class FollowUpTaskStep1Component extends Component {
    render() {
        const { id, task, onBack, onClick } = this.props;
        return (
            <div>
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

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - 48 Hour Follow Up</h1>

                {task && task.associateAwayLog !== undefined && task.associateAwayLog !== null &&
                    <div className="alert alert-warning" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - The associate assigned to this task is currently away.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num">1.</span><span className="">Info</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <span className="num">2.</span><span className="">Meeting</span>
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
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{task && task.description}</td>
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
                                    <th scope="row" className="bg-light">Client Tag(s)</th>
                                    <td>
                                        {task.jobCustomerPrettyTags && task.jobCustomerPrettyTags.map(
                                            (prettyTag) => <TagItem tag={prettyTag} key={`prettyTag-${prettyTag.id}`} />)
                                        }
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
                                <tr>
                                    <th scope="row" className="bg-light">Associate Phone #</th>
                                    <td>
                                        {task &&
                                            <a href={`tel:${task.jobAssociateE164Telephone}`}>
                                                {task.jobAssociateTelephone}
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate Tag(s)</th>
                                    <td>
                                        {task.jobAssociatePrettyTags && task.jobAssociatePrettyTags.map(
                                            (prettyTag) => <TagItem tag={prettyTag} key={`prettyTag-${prettyTag.id}`} />)
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
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {task.jobPrettyTags && task.jobPrettyTags.map(
                                            (prettyTag) => <TagItem tag={prettyTag} key={`prettyTag-${prettyTag.id}`} />)
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
                                <tr>
                                    <th scope="row" className="bg-light">Created:</th>
                                    <td>
                                        At {task && task.createdAt &&
                                            <Moment format="MM/DD/YYYY">{task.createdAt}</Moment>
                                        } by {task && task.createdByLabel}
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-clipboard-list"></i>&nbsp;Optional
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 mx-auto p-2">
                                                <Link className="btn btn-orange btn-lg" to={`/order/${task.job}/postpone`}>
                                                    <i className="fas fa-clock"></i>&nbsp;Postpone
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mx-auto p-2">
                                                <Link className="btn btn-danger btn-lg" to={`/order/${task.job}/close`}>
                                                    <i className="fas fa-window-close"></i>&nbsp;Close
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-clipboard-list"></i>&nbsp;Required
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <div className="row">
                                            <div className="col-md-4 mx-auto p-2">
                                                <button className="btn btn-success btn-lg" onClick={onClick}>
                                                    Begin&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to="/tasks">
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
