// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../bootstrap/bootstrapSingleSelect";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapInput } from "../bootstrap/bootstrapInput";


export default class Report15Component extends Component {
    render() {
        const {
            expiryDateType, daysBeforeExpiry, errors, isLoading,
            onClick, onSelectChange, onTextChange
        } = this.props;


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
                            <i className="fas fa-calendar-times"></i>&nbsp;Associate Upcoming Expiry Dates Report
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-calendar-times"></i>&nbsp;Associate Upcoming Expiry Dates Report</h1>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                label="What expiry date are you looking for? (*)"
                                name="expiryDateType"
                                defaultOptionLabel="Please select the job State."
                                options={JOB_STATE_CHOICES}
                                value={expiryDateType}
                                error={errors.expiryDateType}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapSingleSelect
                                label="Days until expiry (*)"
                                name="daysBeforeExpiry"
                                defaultOptionLabel="Please select."
                                options={DAYS_STATE_CHOICES}
                                value={daysBeforeExpiry}
                                error={errors.daysBeforeExpiry}
                                onSelectChange={onSelectChange}
                                disabled={isLoading}
                                helpText="Indicate how many days before the date will expire."
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                                </button>
                                <Link to={`/reports`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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




export const JOB_STATE_CHOICES = [
    {
        id: 'expiryDateType-2-choice',
        selectName: "expiryDateType",
        value: 1,
        label: "Commercial Insurance"
    },{
        id: 'expiryDateType-3-choice',
        selectName: "expiryDateType",
        value: 2,
        label: "Police check"
    },{
        id: 'expiryDateType-4-choice',
        selectName: "expiryDateType",
        value: 0,
        label: "All"
    }
];

export const DAYS_STATE_CHOICES = [
    {
        id: 'daysBeforeExpiry-1-choice',
        selectName: "daysBeforeExpiry",
        value: 15,
        label: "Within 15 days"
    },{
        id: 'daysBeforeExpiry-2-choice',
        selectName: "daysBeforeExpiry",
        value: 30,
        label: "Within 30 Days"
    },{
        id: 'daysBeforeExpiry-3-choice',
        selectName: "daysBeforeExpiry",
        value: 90,
        label: "Within 90 Days"
    },{
        id: 'daysBeforeExpiry-4-choice',
        selectName: "daysBeforeExpiry",
        value: 180,
        label: "Within 180 Days"
    }
];
