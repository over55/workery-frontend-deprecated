// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    EXECUTIVE_ROLE_ID
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class ClientOperationsComponent extends Component {
    render() {
        const { id, clientDetail, user, errors, flashMessage, isLoading, onAddJobClick } = this.props;
        const isActiveState = parseInt(clientDetail.state) === 1;
        const isCompany = clientDetail && clientDetail.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        const canDeleteClient = user.roleId === EXECUTIVE_ROLE_ID;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/clients`}><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{clientDetail && clientDetail.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-user"></i>&nbsp;{clientDetail && clientDetail.name}
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/client/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/client/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/client/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/client/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/client/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">

                        <div className="card-group row">
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-plus fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Add Order</h3>
                                        <p className="card-text">Create a new job for this client.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link className="btn btn-success btn-lg" onClick={onAddJobClick}>
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {isActiveState
                                ?<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-archive fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Archive Client</h3>
                                            <p className="card-text">This will make the client inactive.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/client/${id}/archive`} className="btn btn-success btn-lg">
                                                Go&nbsp;<i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                :<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-box-open fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Unarchive Client</h3>
                                            <p className="card-text">This will make the client active.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/client/${id}/unarchive`} className="btn btn-success btn-lg">
                                                Go&nbsp;<i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            {isCompany === false &&
                                <div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-bolt fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Upgrade Client</h3>
                                            <p className="card-text">Make this a commercial client.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/client/${id}/rez-upgrade`} className="btn btn-success btn-lg">
                                                Go&nbsp;<i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="col-sm-3 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-trash-alt fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Permanently Delete Client</h3>
                                        <p className="card-text">Delete data from the database.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/client/${id}/delete`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-chevron-right"></i>
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
