import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";


export default class OngoingOrderLiteRetrieveComponent extends Component {
    render() {
        const { id, ongoingOrder, flashMessage } = this.props;
        // const isCancelled = order.state === "cancelled";
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/ongoing-orders`}><i className="fas fa-undo-alt"></i>&nbsp;Ongoing Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-undo-alt"></i>&nbsp;Ongoing Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-undo-alt"></i>&nbsp;View Ongoing Order</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/ongoing-order/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/ongoing-order/${id}/comments`}>
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
                                {ongoingOrder.customerFullName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-user-circle"></i>&nbsp;Client
                                        </th>
                                    </tr>
                                }
                                {ongoingOrder.customerFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/client/${ongoingOrder.customer}`} target="_blank">
                                                {ongoingOrder.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {ongoingOrder.customerFullName && ongoingOrder.customerTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{ongoingOrder.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.customerTelephone}</td>
                                    </tr>
                                }
                                {ongoingOrder.customerFullName && ongoingOrder.customerOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {ongoingOrder.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.customerOtherTelephone}</td>
                                    </tr>
                                }





                                {ongoingOrder.associateFullName &&
                                    <tr className="bg-dark">
                                        <th scope="row" colSpan="2" className="text-light">
                                            <i className="fas fa-crown"></i>&nbsp;Associate
                                        </th>
                                    </tr>
                                }
                                {ongoingOrder.associateFullName && ongoingOrder.associateFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Name</th>
                                        <td>
                                            <Link to={`/associate/${ongoingOrder.associate}`} target="_blank">
                                                {ongoingOrder.associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                {ongoingOrder.associateFullName && ongoingOrder.associateTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">{ongoingOrder.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.associateTelephone}</td>
                                    </tr>
                                }
                                {ongoingOrder.associateFullName && ongoingOrder.associateOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Other {ongoingOrder.associatePrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.associateOtherTelephone}</td>
                                    </tr>
                                }
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-undo-alt"></i>&nbsp;Ongoing Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">ID #</th>
                                    <td>{ongoingOrder.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{ongoingOrder.status}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{ongoingOrder.prettyTypeOf}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>



                { /*
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
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
                                                    <Link to={`/order/${order.id}/transfer`}>
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
                                </tr>



                */}

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
