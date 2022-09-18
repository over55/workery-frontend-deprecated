import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    WORK_ORDER_CANCELLED_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    WORK_ORDER_COMPLETED_AND_PAID_STATE
} from '../../../../constants/api';
import {
    getWorkOrderStateLabel,
    getWorkOrderTypeOfLabel
} from "../../../../constants/labels";
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminOrderFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, order, errors, flashMessage } = this.props;

        let isCancelled = false;
        if (order && isEmpty(order) === false) {
            isCancelled = order.state === WORK_ORDER_CANCELLED_STATE;
        }

        let isCompleted;
        if (order && isEmpty(order) === false) {
            isCompleted = order.state === WORK_ORDER_COMPLETED_BUT_UNPAID_STATE || order.state === WORK_ORDER_COMPLETED_AND_PAID_STATE || isCancelled;
        }

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;View Order</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/order/${id}/tasks`}>
                                <span className="num"><i className="fas fa-tasks"></i>&nbsp;</span><span className="">Tasks</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/order/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-badge"></i>&nbsp;</span><span className="">Activity</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/order/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/order/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Job Details
                                        <Link to={`/order/${id}/update/lite`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order #</th>
                                    <td>{order && order.id && order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Full Name</th>
                                    <td>
                                        <Link to={`/client/${order && order.customer && order.customer.id}`} target="_blank">
                                            {order && order.customer && order.customer.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                {order && order.customer && order.customer.telephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Telephone #</th>
                                        <td>
                                            <a href={`tel:${order && order.customer.telephone}`}>{order && order.customer.telephone}</a>
                                        </td>
                                    </tr>
                                }
                                {order && order.customer && order.customer.otherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other Telephone #</th>
                                        <td>
                                            <a href={`tel:${order && order.customer.otherTelephone}`}>{order && order.customer.otherTelephone}</a>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{order && order.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill(s)</th>
                                    <td>
                                        {order && order.skillSets && order.skillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillsets-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags(s)</th>
                                    <td>
                                        {order && order.tags && order.tags.map(
                                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
                                        }
                                    </td>
                                </tr>
                                {order && order.associate && order.associate.name &&
                                    <tr>
                                        <th scope="row" className="bg-light">Associate Full Name</th>
                                        <td>
                                            <Link to={`/associate/${order.associate.id}`} target="_blank">
                                                {order && order.associate.name}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order && order.associate && order.associate.telephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Telephone #</th>
                                        <td>
                                            <a href={`tel:${order && order.associate.telephone}`}>{order && order.associate.telephone}</a>
                                        </td>
                                    </tr>
                                }
                                {order && order.associate && order.associate.otherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other Telephone #</th>
                                        <td>
                                            <a href={`tel:${order && order.associate.otherTelephone}`}>{order && order.associate.otherTelephone}</a>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Assignment Date</th>
                                    <td>
                                        {order && order.assignmentDate
                                            ? <Moment format="MM/DD/YYYY">{order && order.assignmentDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Home Support Service</th>
                                    <td>
                                        {order && order.isHomeSupportService
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ongoing</th>
                                    <td>
                                        {order && order.isOngoing
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{order && order.state && getWorkOrderStateLabel(order.state)}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{order && order.typeOf && getWorkOrderTypeOfLabel(order.typeOf)}</td>
                                </tr>
                                {order && order.closingReasonComment !== undefined && order.closingReasonComment !== null && order.closingReasonComment !== "" &&
                                    <tr>
                                        <th scope="row" className="bg-light">Closing Reason</th>
                                        <td>{order && order.closingReasonComment}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Start Date</th>
                                    <td>
                                        {order && order.startDate
                                            ? <Moment format="MM/DD/YYYY">{order.startDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Completion Date</th>
                                    <td>
                                        {order && order.completionDate
                                            ? <Moment format="MM/DD/YYYY">{order.completionDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Hours</th>
                                    <td>{order && order.hours}</td>
                                </tr>
                                {order && order.prettyLatestPendingTask &&
                                    <tr>
                                        <th scope="row" className="bg-light">Required Task</th>
                                        <td>
                                            {order.prettyLatestPendingTask !== "None"
                                                ?<Link to={`/task/${order.latestPendingTaskTypeOf}/${order.latestPendingTask}/step-1`} target="_blank">
                                                    {order.prettyLatestPendingTask}&nbsp;<i className="fas fa-external-link-alt"></i>
                                                </Link>
                                                :"-"
                                            }
                                        </td>
                                    </tr>
                                }

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Financial Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Date</th>
                                    <td>
                                        {order && order.invoiceDate
                                            ? <Moment format="MM/DD/YYYY">{order.invoiceDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID(s) #</th>
                                    <td>
                                        {order && order.invoiceIds
                                            ? order.invoiceIds
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Quote</th>
                                    <td>
                                        {order && order.invoiceQuoteAmount
                                            ?<NumberFormat value={order.invoiceQuoteAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Labour</th>
                                    <td>
                                        {order && order.invoiceLabourAmount
                                            ?<NumberFormat value={order.invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Materials</th>
                                    <td>
                                        {order && order.invoiceMaterialAmount
                                            ?<NumberFormat value={order.invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Total</th>
                                    <td>
                                        {order && order.invoiceTotalAmount
                                            ?<NumberFormat value={order.invoiceTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Service Fee</th>
                                    <td>
                                        {order && order.invoiceServiceFeeAmount
                                            ?<NumberFormat value={order.invoiceServiceFeeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Service Fee Payment Date</th>
                                    <td>
                                        {order && order.invoiceServiceFeePaymentDate
                                            ? <Moment format="MM/DD/YYYY">{order.invoiceServiceFeePaymentDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>

                                {order && order.wasSurveyConducted &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        </th>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the quality of the work satisfactory?</th>
                                        <td>
                                            {order && order.wasJobSatisfactory ? "Yes" : "No"}
                                        </td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the work completed on time and on budget?</th>
                                        <td>{order && order.wasJobFinishedOnTimeAndOnBudget ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member punctual?</th>
                                        <td>{order && order.wasAssociatePunctual ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member professional?</th>
                                        <td>{order && order.wasAssociateProfessional ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Would you refer Over55 to a friend of family member?</th>
                                        <td>{order && order.wouldCustomerReferOurOrganization ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Overall Order Rating</th>
                                        <td>
                                            {order && order.score}/5
                                        </td>
                                    </tr>
                                }



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created at</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY hh:mm:ss a">{order && order.createdAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created by</th>
                                    <td>{order && order.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified at</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY hh:mm:ss a">{order && order.lastModifiedAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified by</th>
                                    <td>
                                        {order && order.lastModifiedBy}
                                    </td>
                                </tr>

                                {isCompleted
                                    ?""
                                    :<tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                        </th>
                                    </tr>
                                }
                                {isCompleted
                                    ?""
                                    :<tr>
                                        <th scope="row" className="bg-light">Available Choices</th>
                                        <td>
                                            {order && order.associate && isCompleted === false &&
                                                <div>
                                                    <Link to={`/order/${order && order.id}/unassign-associate`} className="btn btn-warning btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-user-slash"></i>&nbsp;Unassign Associate
                                                    </Link>
                                                </div>
                                            }
                                            {isCancelled
                                                ?""
                                                :<div>
                                                    <Link to={`/order/${order && order.id}/transfer-step-1`} className="btn btn-warning btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-exchange-alt"></i>&nbsp;Transfer
                                                    </Link>
                                                </div>
                                            }
                                            {isCancelled
                                                ?""
                                                :<div>
                                                    <Link to={`/order/${order && order.id}/postpone`} className="btn btn-orange btn-lg mt-4 pl-4 pr-4">
                                                       <i className="fas fa-clock"></i>&nbsp;Postpone
                                                    </Link>
                                                </div>
                                            }
                                            {isCancelled
                                                ?<div>
                                                    <Link to={`/order/${order && order.id}/reopen`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-window-restore"></i>&nbsp;Re-open
                                                    </Link>
                                                </div>
                                                :<div>
                                                    <Link to={`/order/${order && order.id}/close`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-window-close"></i>&nbsp;Close
                                                    </Link>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>


            </main>
        );
    }
}

class TagItem extends Component {
    render() {
        const { text, id } = this.props.tag;
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
