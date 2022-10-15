import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    EXECUTIVE_ROLE_ID
} from '../../../../constants/api';
import { FlashMessageComponent } from "../../../flashMessageComponent";


export default class AdminOrderOperationsComponent extends Component {
    render() {
        const { id, order, user, errors, flashMessage, isLoading, onAddJobClick } = this.props;
        // const isActiveState = order.state === "active";
        // const isCompany = order && order.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        // const canDeleteClient = user.roleId === EXECUTIVE_ROLE_ID;

        let isCancelled = false;
        if (order && isEmpty(order) === false) {
            isCancelled = order.state === "cancelled";
        }

        let isCompleted;
        if (order && isEmpty(order) === false) {
            isCompleted = order.state === "completed_and_unpaid" || order.state === "completed_and_paid" || isCancelled;
        }

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
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
                        <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">


                        <div className="card-group row">
                            {order && order.associate && isCompleted === false &&
                                <div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-user-slash fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Unassign Associate</h3>
                                            <p className="card-text">Unassign the current Associate.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" to={`/order/${order && order.id}/unassign-associate`}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            {isCancelled
                                ?""
                                :<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-exchange-alt fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Transfer</h3>
                                            <p className="card-text">Transfer this job to another Client and/or Associate.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" to={`/order/${order && order.id}/transfer-step-1`}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            {isCancelled
                                ?""
                                :<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-hourglass-half fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Postpone</h3>
                                            <p className="card-text">Postpone this job to a future date.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" to={`/order/${order && order.id}/postpone`}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            {isCancelled
                                ?<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-window-restore fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Re-open</h3>
                                            <p className="card-text">Re-open this job.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" to={`/order/${order && order.id}/reopen`}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-window-close fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Close</h3>
                                            <p className="card-text">Close this job or end it early.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link className="btn btn-success btn-lg" to={`/order/${order && order.id}/close`}>
                                                Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-credit-card fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Financials</h3>
                                        <p className="card-text">View this Job Order's Financials.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link className="btn btn-success btn-lg" to={`/financial/${order && order.id}`}>
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </main>
        );
    }
}


/**
 *  Function will take the tag value which was selected and find print it with
 *  the label from the tagOptions data.
 */
class TagItem extends Component {
    render() {
        const { tag, tagOptions } = this.props;
        for (let i = 0; i < tagOptions.length; i++) {
            let tagOption = tagOptions[i];
            if (tagOption.value === tag) {
                return (
                    <span className="badge badge-info badge-lg" value={tag}>{tagOption.label}</span>
                );
            }
        }
        return (null);
    };
}


/**
 *  Function will take the howDidYouHear value which was selected and find
 * print it with the label from the howDidYouHearOptions data.
 */
class HowDidYouHearText extends Component {
    render() {
        const { howDidYouHear, howDidYouHearOther, howDidYouHearOptions } = this.props;
        if (howDidYouHearOther !== null && howDidYouHearOther !== undefined && howDidYouHearOther !== "") {
            return howDidYouHearOther;
        }
        for (let i = 0; i < howDidYouHearOptions.length; i++) {
            let howDidYouHearOption = howDidYouHearOptions[i];
            if (howDidYouHearOption.value === howDidYouHear) {
                return (
                    <span value={howDidYouHear}>{howDidYouHearOption.label}</span>
                );
            }
        }
        return (null);
    };
}
