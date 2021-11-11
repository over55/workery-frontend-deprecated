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


export default class PartnerOperationsComponent extends Component {
    render() {
        const { id, partnerDetail, user, errors, flashMessage, isLoading, onAddJobClick } = this.props;
        const isActiveState = parseInt(partnerDetail.state) === 1;
        const isCompany = partnerDetail && partnerDetail.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        const canDeletePartner = user.roleId === EXECUTIVE_ROLE_ID;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/partners`}><i className="fas fa-user-circle"></i>&nbsp;Partners</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{partnerDetail && partnerDetail.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/partner/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/partner/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/partner/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/partner/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/partner/${id}/files`}>
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
                            {isActiveState
                                ?<div className="col-sm-3 mb-4">
                                    <div className="card box-shadow text-center mx-auto h-100">
                                        <div className="card-custom-top-2">
                                            <i className="fas fa-archive fa-3x"></i>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">Archive Partner</h3>
                                            <p className="card-text">This will make the partner inactive.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/partner/${id}/archive`} className="btn btn-success btn-lg">
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
                                            <h3 className="card-title">Unarchive Partner</h3>
                                            <p className="card-text">This will make the partner active.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/partner/${id}/unarchive`} className="btn btn-success btn-lg">
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
                                            <h3 className="card-title">Upgrade Partner</h3>
                                            <p className="card-text">Make this a commercial partner.</p>
                                        </div>
                                        <div className="card-footer bg-transparent border-0">
                                            <Link to={`/partner/${id}/rez-upgrade`} className="btn btn-success btn-lg">
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
                                        <h3 className="card-title">Permanently Delete Partner</h3>
                                        <p className="card-text">Delete data from the database.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/partner/${id}/delete`} className="btn btn-success btn-lg">
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
