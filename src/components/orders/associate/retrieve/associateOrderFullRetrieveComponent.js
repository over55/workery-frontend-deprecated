// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AssociateOrderFullRetrieveComponent extends Component {
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
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Jobs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Job # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;View Job</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/job/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
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
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job #</th>
                                    <td>{order.id && order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Full Name</th>
                                    <td>{order.customerFullName}</td>
                                </tr>
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
                                        <td>{order.associateFullName}</td>
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
                                        <th scope="row" className="bg-light">Overall Job Rating</th>
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
