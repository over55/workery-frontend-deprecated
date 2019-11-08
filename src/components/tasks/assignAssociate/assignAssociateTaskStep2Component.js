// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import NumberFormat from 'react-number-format';
import isEmpty from 'lodash/isEmpty';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


export default class AssignAssociateTaskStep1Component extends Component {
    render() {
        const {
            task, associates, activitySheetItems, id, errors, isLoading, onClick
        } = this.props;

        let associate;
        const insuredAssociates = [];
        const uninsuredAssociates = [];

        if (isEmpty(associates) === false) { // Defensive Code.
            for (associate of associates) {
                if (associate.wsibNumber !== undefined && associate.wsibNumber !== null && associate.wsibNumber !== "") {
                    insuredAssociates.push(associate);
                } else {
                    uninsuredAssociates.push(associate)
                }
            }
        }

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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task  && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job  && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Assign Associate</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/1/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Activity</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Assignment</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Assign Associate
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job #</th>
                                    <td>
                                        <Link to={`/order/${task.job}`} target="_blank">
                                            {task  && task.job && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
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
                        <i className="fas fa-user-shield"></i>&nbsp;Associates with WSIB coverage
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>E-Mail</th>
                                <th>WSIB #</th>
                                <th>Rate ($/h)</th>
                                <th>Contacts (30 Days)</th>
                                <th>Tags</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {associates && insuredAssociates.map(
                                    (associate) => <InsuredAssociateItem associate={associate} onClick={onClick} key={`act-${associate.id}`} />)
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-sm-12 mx-auto mt-4 pt-4">
                    <h2>
                        <i className="fas fa-user"></i>&nbsp;Associates without WSIB coverage
                    </h2>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th></th>
                                <th>Full Name</th>
                                <th>Phone</th>
                                <th>E-Mail</th>
                                <th>Rate ($/h)</th>
                                <th>Contacts (30 Days)</th>
                                <th>Tags</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                {associates && uninsuredAssociates.map(
                                    (associate) => <UninsuredAssociateItem associate={associate} onClick={onClick} key={`act-${associate.id}`} />)
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
                    <Link onClick={ (event)=>{ onClick(event, associate, associateFullName) } }>Re-Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
        // const { subCategory, value } = this.props.skillSet;
        // return (
        //     <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        // );
    };
}


class InsuredAssociateItem extends Component {
    render() {
        const { id, typeOf, fullName, telephone, e164Telephone, email, wsibNumber, hourlySalaryDesired, past30DaysActivitySheetCount, prettyTags } = this.props.associate;
        const { onClick } = this.props;
        const isCommercial = typeOf === 3; // COMMERCIAL_ASSOCIATE_TYPE_OF_ID
        return (
            <tr>
                <td>
                    {isCommercial
                        ? <i className="fas fa-building"></i>
                        : <i className="fas fa-home"></i>
                    }
                </td>
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
                    {wsibNumber}
                </td>
                <td>
                    <NumberFormat
                        thousandSeparator={true}
                        prefix={'$'}
                        value={hourlySalaryDesired}
                        fixedDecimalScale={true}
                        decimalScale={2}
                        displayType={'text'}
                    />
                </td>
                <td>
                    {past30DaysActivitySheetCount}
                </td>
                <td>
                    {isEmpty(prettyTags)
                        ? "-"
                        : prettyTags.map(
                        (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
                    }
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, id, fullName) } }>Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
    };
}



class UninsuredAssociateItem extends Component {
    render() {
        const { id, typeOf, fullName, telephone, e164Telephone, email, wsibNumber, hourlySalaryDesired, past30DaysActivitySheetCount, prettyTags } = this.props.associate;
        const { onClick } = this.props;
        const isCommercial = typeOf === 3; // COMMERCIAL_ASSOCIATE_TYPE_OF_ID
        return (
            <tr>
                <td>
                    {isCommercial
                        ? <i className="fas fa-building"></i>
                        : <i className="fas fa-home"></i>
                    }
                </td>
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
                    <NumberFormat
                        thousandSeparator={true}
                        prefix={'$'}
                        value={hourlySalaryDesired}
                        fixedDecimalScale={true}
                        decimalScale={2}
                        displayType={'text'}
                    />
                </td>
                <td>
                    {past30DaysActivitySheetCount}
                </td>
                <td>
                    {isEmpty(prettyTags)
                        ? "-"
                        : prettyTags.map(
                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>
                        )
                    }
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, id, fullName) } }>Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
    };
}


class TagItem extends Component {
    render() {
        const { text, id } = this.props.tag;
        return (
            <span className="badge badge-danger badge-lg" value={id}>{text}</span>
        );
    };
}
