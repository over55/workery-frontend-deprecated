// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";


export default class AdminOrderPostponeOperationComponent extends Component {
    render() {
        const {
            reason, errors, id, order, isLoading, onTextChange, onClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/order/${id}/full`}><i className="fas fa-wrench"></i>&nbsp;Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-book-reader"></i>&nbsp;Re-open Order
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-book-reader"></i>&nbsp;Re-open Order</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapTextarea
                                name="reason"
                                borderColour="border-primary"
                                label="Please write the reason why you are re-opening this job: (*)"
                                placeholder="Describe here."
                                rows="5"
                                value={reason}
                                helpText="Maximum 1,000 characters."
                                onChange={onTextChange}
                                error={errors.reason}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/order/${id}/operations`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
