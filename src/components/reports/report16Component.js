// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../bootstrap/bootstrapDatePicker';
import { BootstrapSingleSelect } from "../bootstrap/bootstrapSingleSelect";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


export default class Report16Component extends Component {
    render() {
        const {
            fromDate, toDate, userType, errors, isLoading,
            onClick, onSelectChange, onFromDateChange, onToDateChange
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
                            <i className="fas fa-globe"></i>&nbsp;How Users Find Us Report (Long)
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-globe"></i>&nbsp;How Users Find Us Report</h1>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapDatePicker
                                label="From Assignment Date (*)"
                                name="fromDate"
                                dateObj={fromDate}
                                onTimeChange={onFromDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.fromDate}
                            />

                            <BootstrapDatePicker
                                label="To Assignment Date (*)"
                                name="toDate"
                                dateObj={toDate}
                                onTimeChange={onToDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.toDate}
                            />

                            <BootstrapSingleSelect
                                label="What type of user type to filter by? (*)"
                                name="userType"
                                defaultOptionLabel="Please select the job State."
                                options={JOB_STATE_CHOICES}
                                value={userType}
                                error={errors.userType}
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


/*
" name="user_type" required=""><option selected="" value="">Types...</option><option value="">Client</option><option value="associate">Associate</option><option value="staff">Staff</option><option value="partner">Partner</option></select>
*/

export const JOB_STATE_CHOICES = [
    {
        id: 'userType-2-choice',
        selectName: "userType",
        value: 'client',
        label: "Client"
    },{
        id: 'userType-3-choice',
        selectName: "userType",
        value: "associate",
        label: "Associate"
    },{
        id: 'userType-4-choice',
        selectName: "userType",
        value: 'staff',
        label: "Staff"
    },{
        id: 'userType-1-choice',
        selectName: "userType",
        value: "partner",
        label: "Partner"
    }
];
