// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class OrderFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, order, errors, flashMessage } = this.props;
        const isCancelled = order.state === "cancelled";
        const isCompleted = order.state === "completed_and_unpaid" || order.state === "completed_and_paid" || isCancelled;
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
                                <span className="num"><i className="fas fa-id-badge"></i>&nbsp;</span><span className="">Activity Sheets</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
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
                                    <td>{order.id && order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Full Name</th>
                                    <td>
                                        <Link to={`/client/${order.customer}`} target="_blank">
                                            {order.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                {order.customerFullName && order.customerTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client {order.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{order.customerTelephone}</td>
                                    </tr>
                                }
                                {order.customerFullName && order.customerOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client Other {order.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{order.customerOtherTelephone}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{order.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill(s)</th>
                                    <td>
                                        {order.prettySkillSets && order.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags(s)</th>
                                    <td>
                                        {order.prettyTags && order.prettyTags.map(
                                            (tag) => <TagItem tag={tag} key={`tag-${tag.id}`} />)
                                        }
                                    </td>
                                </tr>
                                {order.associateFullName && order.associateFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/associate/${order.associate}`} target="_blank">
                                                {order.associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order.associateFullName && order.associateTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{order.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{order.associateTelephone}</td>
                                    </tr>
                                }
                                {order.associateFullName && order.associateOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {order.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{order.associateOtherTelephone}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Assignment Date</th>
                                    <td>
                                        {order.assignmentDate
                                            ? <Moment format="MM/DD/YYYY">{order.assignmentDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Home Support Service</th>
                                    <td>
                                        {order.isHomeSupportService
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ongoing</th>
                                    <td>
                                        {order.isOngoing
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{order.prettyStatus}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Start Date</th>
                                    <td>
                                        {order.startDate
                                            ? <Moment format="MM/DD/YYYY">{order.startDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Completion Date</th>
                                    <td>
                                        {order.completionDate
                                            ? <Moment format="MM/DD/YYYY">{order.completionDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Hours</th>
                                    <td>{order.hours}</td>
                                </tr>
                                {order.prettyLatestPendingTask &&
                                    <tr>
                                        <th scope="row" className="bg-light">Required Task</th>
                                        <td>
                                            <Link to={`/task/${order.latestPendingTaskTypeOf}/${order.latestPendingTask}/step-1`} target="_blank">
                                                {order.prettyLatestPendingTask}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
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
                                        {order.invoiceDate
                                            ? <Moment format="MM/DD/YYYY">{order.invoiceDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice ID(s) #</th>
                                    <td>
                                        {order.invoiceIds
                                            ? order.invoiceIds
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Quote</th>
                                    <td>
                                        {order.invoiceQuoteAmount
                                            ?<NumberFormat value={order.invoiceQuoteAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Labour</th>
                                    <td>
                                        {order.invoiceLabourAmount
                                            ?<NumberFormat value={order.invoiceLabourAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Labour</th>
                                    <td>
                                        {order.invoiceMaterialAmount
                                            ?<NumberFormat value={order.invoiceMaterialAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Total</th>
                                    <td>
                                        {order.invoiceTotalAmount
                                            ?<NumberFormat value={order.invoiceTotalAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Service Fee</th>
                                    <td>
                                        {order.invoiceServiceFeeAmount
                                            ?<NumberFormat value={order.invoiceServiceFeeAmount} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Invoice Service Fee Payment Date</th>
                                    <td>
                                        {order.invoiceServiceFeePaymentDate
                                            ? <Moment format="MM/DD/YYYY">{order.invoiceServiceFeePaymentDate}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>

                                {order.wasSurveyConducted &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        </th>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the quality of the work satisfactory?</th>
                                        <td>
                                            {order.wasJobSatisfactory ? "Yes" : "No"}
                                        </td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the work completed on time and on budget?</th>
                                        <td>{order.wasJobFinishedOnTimeAndOnBudget ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member punctual?</th>
                                        <td>{order.wasAssociatePunctual ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Was the Associate Member professional?</th>
                                        <td>{order.wasAssociateProfessional ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Would you refer Over55 to a friend of family member?</th>
                                        <td>{order.wouldCustomerReferOurOrganization ? "Yes" : "No"}</td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Overall Order Rating</th>
                                        <td>
                                            {order.score}/5
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
                                        <Moment format="MM/DD/YYYY hh:mm:ss a">{order.createdAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created by</th>
                                    <td>{order.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified at</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY hh:mm:ss a">{order.lastModifiedAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified by</th>
                                    <td>
                                        {order.lastModifiedBy}
                                    </td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    {isCompleted
                                        ? <td>
                                        </td>
                                        : <td>
                                            <ul>
                                                {order.associate &&
                                                    <li>
                                                        <Link to={`/order/${order.id}/unassign-associate`}>
                                                            Unassign Associate&nbsp;<i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                }
                                                {isCancelled
                                                    ?""
                                                    :<li>
                                                        <Link to={`/order/${order.id}/transfer-step-1`}>
                                                            Transfer&nbsp;<i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                }
                                                {isCancelled
                                                    ?""
                                                    :<li>
                                                        <Link to={`/order/${order.id}/postpone`}>
                                                            Postpone&nbsp;<i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                }
                                                <li>
                                                    {isCancelled
                                                        ?<Link to={`/order/${order.id}/reopen`}>
                                                            Re-open&nbsp;<i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                        :<Link to={`/order/${order.id}/close`}>
                                                            Close&nbsp;<i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    }
                                                </li>
                                            </ul>
                                        </td>
                                    }

                                </tr>

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
