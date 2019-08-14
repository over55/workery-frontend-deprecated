// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


export default class Report5Component extends Component {
    render() {
        const { errors, isLoading, onClick, onSelectChange, onFromDateChange, onToDateChange } = this.props;


        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/reports`}><i className="fas fa-chart-bar"></i>&nbsp;Reports</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-clock"></i>&nbsp;Associate Insurance Report
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-clock"></i>&nbsp;Associate Insurance</h1>

                            <p>There are no fields to choose from, simple click <strong>download</strong> to generate the report and download.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                                </button>
                                <Link to={`/reports`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
