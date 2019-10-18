// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import NumberFormat from 'react-number-format';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class InvoiceRetrieveComponent extends Component {
    render() {
        const { id, invoice, errors, flashMessage, isLoading, onDownloadInvoicePDFClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/financial/${id}/operations`}>
                                <i className="fas fa-money-check-alt"></i>&nbsp;Order #{id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                            </Link>
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/financial/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/financial/${id}/deposits`}>
                                <span className="num"><i className="fas fa-hand-holding-usd"></i>&nbsp;</span><span className="">Payments</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/financial/${id}/invoice`}>
                                <span className="num"><i className="fas fa-file-invoice"></i>&nbsp;</span><span className="">Invoice</span>
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
                            <div className="col-sm-4 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-copy fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Clone</h3>
                                        <p className="card-text">Create a duplicate of this job.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/financial/${id}/clone`} className="btn btn-success btn-lg">
                                            Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-window-close fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Cancel</h3>
                                        <p className="card-text">Cancel this job.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/order/${id}/close`} className="btn btn-success btn-lg" target="_blank">
                                            Go&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-4 mb-4">
                                <div className="card box-shadow text-center mx-auto h-100">
                                    <div className="card-custom-top-2">
                                        <i className="fas fa-undo fa-3x"></i>
                                    </div>
                                    <div className="card-body">
                                        <h3 className="card-title">Unassign</h3>
                                        <p className="card-text">Unassign this job.</p>
                                    </div>
                                    <div className="card-footer bg-transparent border-0">
                                        <Link to={`/order/${id}/unassign-associate`} className="btn btn-success btn-lg" target="_blank">
                                            Go&nbsp;<i className="fas fa-external-link-alt"></i>
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
