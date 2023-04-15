// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../bootstrap/bootstrapDatePicker';
import { BootstrapSingleSelect } from "../bootstrap/bootstrapSingleSelect";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


export default class Report2Component extends Component {
    render() {
        const {
            associate, associateOptions, isAssociatesLoading, fromDate, toDate, jobState, errors, isLoading,
            onClick, onSelectChange, onFromDateChange, onToDateChange, onAssociateChange
        } = this.props;

        console.log("Report2Component | associate:", associate);

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
                            <i className="fas fa-address-card"></i>&nbsp;Active Associate Jobs Report
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-address-card"></i>&nbsp;Active Associate Jobs Report</h1>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Associate (*)"
                                name="associate"
                                defaultOptionLabel="Please select the associate."
                                options={associateOptions}
                                value={associate}
                                error={errors.associate}
                                onSelectChange={onAssociateChange}
                                isLoading={isAssociatesLoading}
                            />

                            <BootstrapDatePicker
                                label="From date (*)"
                                name="fromDate"
                                dateObj={fromDate}
                                onTimeChange={onFromDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.fromDate}
                            />

                            <BootstrapDatePicker
                                label="To date (*)"
                                name="toDate"
                                dateObj={toDate}
                                onTimeChange={onToDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.toDate}
                            />

                            <BootstrapSingleSelect
                                label="What type of job status to filter by? (*)"
                                name="jobState"
                                defaultOptionLabel="Please select the job State."
                                options={JOB_STATE_CHOICES}
                                value={jobState}
                                error={errors.jobState}
                                onSelectChange={onSelectChange}
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
        id: 'jobState-2-choice',
        selectName: "jobState",
        value: 'completed_and_unpaid',
        label: "Completed but unpaid"
    },{
        id: 'jobState-3-choice',
        selectName: "jobState",
        value: "completed_and_paid",
        label: "Completed and paid"
    },{
        id: 'jobState-4-choice',
        selectName: "jobState",
        value: 'in_progress',
        label: "In progress"
    },{
        id: 'jobState-5-choice',
        selectName: "jobState",
        value: 'pending',
        label: "Pending"
    },{
        id: 'jobState-6-choice',
        selectName: "jobState",
        value: 'cancelled',
        label: "Cancelled"
    },{
        id: 'jobState-7-choice',
        selectName: "jobState",
        value: 'ongoing',
        label: "Ongoing"
    },{
        id: 'jobState-1-choice',
        selectName: "jobState",
        value: "all",
        label: "All completed paid/unpaid/in progress jobs"
    }
];
