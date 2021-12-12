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
            taskDetail, associates, activitySheetItems, id, errors, isLoading, onClick
        } = this.props;

        const task = taskDetail;
        const { associate, customer, customerTags, workOrder, workOrderSkillSets, workOrderTags } = task;

        // let associate;
        const insuredAssociates = [];
        const uninsuredAssociates = [];

        if (isEmpty(associates) === false) { // Defensive Code.
            for (let associateItem of associates) {
                if (associateItem.wsibNumber !== undefined && associateItem.wsibNumber !== null && associateItem.wsibNumber !== "") {
                    insuredAssociates.push(associateItem);
                } else {
                    uninsuredAssociates.push(associateItem)
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task  && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId  && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Assign Associate</h1>

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
                                        <Link to={`/order/${task.orderId}`} target="_blank">
                                            {task  && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Name</th>
                                    <td>
                                        {customer &&
                                            <Link to={`/client/${customer.id}`} target="_blank">
                                                {task && customer.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Phone #</th>
                                    <td>
                                        {customer &&
                                            <a href={`tel:${customer.telephone}`}>
                                                {customer.telephone}
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Location</th>
                                    <td>
                                        {customer &&
                                            <a href={customer.fullAddressUrl} target="_blank">
                                                {customer.fullAddressWithoutPostalCode}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </a>
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Tag(s)</th>
                                    <td>
                                        {customerTags && customerTags.map(
                                            (customerTag) => <TagItem tag={customerTag} key={`customerTag-${customerTag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Description</th>
                                    <td>{workOrder && workOrder.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill Set(s)</th>
                                    <td>
                                        {workOrderSkillSets && workOrderSkillSets.map(
                                            (workOrderSkillSet) => <SkillSetItem skillSet={workOrderSkillSet} key={`workOrderSkillSet-${workOrderSkillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {workOrderTags && workOrderTags.map(
                                            (workOrderTag) => <TagItem tag={workOrderTag} key={`workOrderTag-${workOrderTag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comments</th>
                                    <td>
                                        <Link to={`/order/${task.orderId}/comments`} target="_blank">
                                            View comments&nbsp;<i className="fas fa-external-link-alt"></i>
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
                                {/* TODO: CONTINUE IMPLEMENTING FROM HERE... */}
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
        const { associate, associateName, associateTelephone, associateE164Telephone, associateEmail, state, comment } = this.props.activitySheetItem;
        const { onClick } = this.props;
        return (
            <tr>
                <td>
                    <Link to={`/associate/${associate}`} target="_blank">{associateName}&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                </td>
                <td>
                    <ActivitySheetItemStatusFormatter state={state} />
                </td>
                <td>
                    {comment}
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, associate, associateName) } }>Re-Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
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
        const {
            id, typeOf, name, telephone, email, wsibNumber, hourlySalaryDesired, past30DaysActivitySheetCount, tags
        } = this.props.associate;
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
                    <Link to={`/associate/${id}`} target="_blank">{name}&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                </td>
                <td>
                    <a href={`tel:${telephone}`}>{telephone}</a>
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
                    {isEmpty(tags)
                        ? "-"
                        : tags.map(
                        (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
                    }
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, id, name) } }>Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
                </td>
            </tr>
        );
    };
}



class UninsuredAssociateItem extends Component {
    render() {
        const { id, typeOf, name, telephone, email, wsibNumber, hourlySalaryDesired, past30DaysActivitySheetCount, tags } = this.props.associate;
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
                    <Link to={`/associate/${id}`} target="_blank">{name}&nbsp;<i className="fas fa-external-link-alt"></i></Link>
                </td>
                <td>
                    <a href={`tel:${telephone}`}>{telephone}</a>
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
                    {isEmpty(tags)
                        ? "-"
                        : tags.map(
                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>
                        )
                    }
                </td>
                <td>
                    <Link onClick={ (event)=>{ onClick(event, id, name) } }>Assign&nbsp;<i className="fas fa-chevron-right"></i></Link>
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

function ActivitySheetItemStatusFormatter(props){
    switch(props.state) {
        case 1:
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case 0:
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        default:
        return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}
