import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import {
    WORK_ORDER_CANCELLED_STATE,
    WORK_ORDER_COMPLETED_BUT_UNPAID_STATE,
    WORK_ORDER_COMPLETED_AND_PAID_STATE
} from "../../../../constants/api";
import {
    getWorkOrderStateLabel,
    getWorkOrderTypeOfLabel
} from "../../../../constants/labels";


export default class AdminOrderLiteRetrieveComponent extends Component {
    render() {
        const { id, isLoading, order, flashMessage } = this.props;

        let isCancelled = false;
        if (order && isEmpty(order) === false) {
            isCancelled = order.state === WORK_ORDER_CANCELLED_STATE;
        }

        let isCompleted;
        if (order && isEmpty(order) === false) {
            isCompleted = order.state === WORK_ORDER_COMPLETED_BUT_UNPAID_STATE || order.state === WORK_ORDER_COMPLETED_AND_PAID_STATE || isCancelled;
        }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
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
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/order/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
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
                                {order && order.customerName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Client
                                        </th>
                                    </tr>
                                }
                                {order && order.customer &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/client/${order && order.customer.id}`} target="_blank">
                                                {order && order.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order && order.customer && order.customer.telephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{order && order.customer.telephoneTypeOf} #</th>
                                        <td><a href={`tel:${order && order.customer.telephone}`}>{order && order.customer.telephone}</a></td>
                                    </tr>
                                }
                                {order && order.customer && order.customer.otherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {order && order.customer.otherTelephoneTypeOf} #</th>
                                        <td>{order && order.customer.otherTelephone}</td>
                                    </tr>
                                }

                                {order && order.associate &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-crown"></i>&nbsp;Associate
                                        </th>
                                    </tr>
                                }
                                {order && order.associate && order.associate.id &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/associate/${order && order.associate.id}`} target="_blank">
                                                {order && order.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order && order.associate && order.associate.telephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{order && order.associate.telephoneTypeOf} #</th>
                                        <td>{order && order.associate.telephone}</td>
                                    </tr>
                                }
                                {order && order.associate && order.associate.otherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {order && order.associate.otherTelephoneTypeOf} #</th>
                                        <td>{order && order.associate.otherTelephone}</td>
                                    </tr>
                                }
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">ID #</th>
                                    <td>{order && order.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{order && order.state && getWorkOrderStateLabel(order.state)}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{order && order.typeOf && getWorkOrderTypeOfLabel(order.typeOf)}</td>
                                </tr>
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
                                {order && order.prettyLatestPendingTask &&
                                    <tr>
                                        <th scope="row" className="bg-light">Required Task</th>
                                        <td>
                                            <strong>
                                                {order && order.prettyLatestPendingTask !== "None"
                                                    ?<Link to={`/task/${order && order.latestPendingTaskTypeOf}/${order && order.latestPendingTask}/step-1`} target="_blank">
                                                        {order && order.prettyLatestPendingTask}&nbsp;<i className="fas fa-external-link-alt"></i>
                                                    </Link>
                                                    :"-"
                                                }
                                            </strong>
                                        </td>
                                    </tr>
                                }
                                {order && order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Rating</th>
                                        <td>
                                            {order && order.score}/5
                                        </td>
                                    </tr>
                                }

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
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
                                                    Re-open&nbsp;<i className="fas fa-window-restore"></i>
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

                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
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
