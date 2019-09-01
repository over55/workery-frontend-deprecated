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


export default class OngoingOrderFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, ongoingOrder, errors, flashMessage } = this.props;
        const isCancelled = ongoingOrder.state === "cancelled";
        const isCompleted = ongoingOrder.state === "completed_and_unpaid" || ongoingOrder.state === "completed_and_paid" || isCancelled;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/ongoing-orders"><i className="fas fa-undo-alt"></i>&nbsp;Ongoing Orders</Link>
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
                        <div id="step-1" className="st-grey">
                            <Link to={`/ongoing-order/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
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
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Job Details
                                        <Link to={`/ongoing-order/${id}/update/lite`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ongoing Order #</th>
                                    <td>{ongoingOrder.id && ongoingOrder.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Status</th>
                                    <td>{ongoingOrder.prettyStatus}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Job Type</th>
                                    <td>{ongoingOrder.prettyTypeOf}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client Full Name</th>
                                    <td>
                                        <Link to={`/client/${ongoingOrder.customer}`} target="_blank">
                                            {ongoingOrder.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>
                                {ongoingOrder.customerFullName && ongoingOrder.customerTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client {ongoingOrder.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.customerTelephone}</td>
                                    </tr>
                                }
                                {ongoingOrder.customerFullName && ongoingOrder.customerOtherTelephone &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client Other {ongoingOrder.customerPrettyTelephoneTypeOf} #</th>
                                        <td>{ongoingOrder.customerOtherTelephone}</td>
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
                                        <i className="fas fa-server"></i>&nbsp;System Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created at</th>
                                    <td>
                                        <Moment format="YYYY/MM/DD hh:mm:ss a">{ongoingOrder.createdAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created by</th>
                                    <td>{ongoingOrder.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified at</th>
                                    <td>
                                        <Moment format="YYYY/MM/DD hh:mm:ss a">{ongoingOrder.lastModifiedAt}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified by</th>
                                    <td>
                                        {ongoingOrder.lastModifiedBy}
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
