import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminOrderLiteRetrieveComponent extends Component {
    render() {
        const { id, isLoading, order, flashMessage } = this.props;
        const isCancelled = order.state === "cancelled";
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
                                {order.customerFullName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Client
                                        </th>
                                    </tr>
                                }
                                {order.customerFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/client/${order.customer}`} target="_blank">
                                                {order.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {order.customerFullName && order.customerTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{order.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{order.customerTelephone}</td>
                                    </tr>
                                }
                                {order.customerFullName && order.customerOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {order.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{order.customerOtherTelephone}</td>
                                    </tr>
                                }



                                {order.associateFullName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-crown"></i>&nbsp;Associate
                                        </th>
                                    </tr>
                                }
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
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">ID #</th>
                                    <td>{order.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{order.prettyStatus}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{order.prettyTypeOf}</td>
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
                                {order.prettyLatestPendingTask &&
                                    <tr>
                                        <th scope="row" className="bg-light">Required Task</th>
                                        <td>
                                            <strong>
                                                <Link to={`/task/${order.latestPendingTaskTypeOf}/${order.latestPendingTask}/step-1`} target="_blank">
                                                    {order.prettyLatestPendingTask}&nbsp;<i className="fas fa-external-link-alt"></i>
                                                </Link>
                                            </strong>
                                        </td>
                                    </tr>
                                }
                                {order.wasSurveyConducted &&
                                    <tr>
                                        <th scope="row" className="bg-light">Rating</th>
                                        <td>
                                            {order.score}/5
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
                                        {order.associate &&
                                            <div>
                                                <Link to={`/order/${order.id}/unassign-associate`} className="btn btn-warning btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-user-slash"></i>&nbsp;Unassign Associate
                                                </Link>
                                            </div>
                                        }
                                        {isCancelled
                                            ?""
                                            :<div>
                                                <Link to={`/order/${order.id}/transfer-step-1`} className="btn btn-warning btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-exchange-alt"></i>&nbsp;Transfer
                                                </Link>
                                            </div>
                                        }
                                        {isCancelled
                                            ?""
                                            :<div>
                                                <Link to={`/order/${order.id}/postpone`} className="btn btn-orange btn-lg mt-4 pl-4 pr-4">
                                                   <i className="fas fa-clock"></i>&nbsp;Postpone
                                                </Link>
                                            </div>
                                        }
                                        {isCancelled
                                            ?<div>
                                                <Link to={`/order/${order.id}/reopen`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                    Re-open&nbsp;<i className="fas fa-window-restore"></i>
                                                </Link>
                                            </div>
                                            :<div>
                                                <Link to={`/order/${order.id}/close`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-window-close"></i>&nbsp;Cancel
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
