// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../bootstrap/bootstrapSingleSelect";
import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


export default class Report7Component extends Component {
    render() {
        const {
            associateType, errors, isLoading,
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
                            <i className="fas fa-birthday-cake"></i>&nbsp;Associate Birthday Report
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-birthday-cake"></i>&nbsp;Associate Birthday Report</h1>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                label="What type of associate status to filter by? (*)"
                                name="associateType"
                                defaultOptionLabel="Please select the job State."
                                options={ASSOCIATE_TYPE_CHOICES}
                                value={associateType}
                                error={errors.associateType}
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




export const ASSOCIATE_TYPE_CHOICES = [
    {
        id: 'associateType-2-choice',
        selectName: "associateType",
        value: 1,
        label: "Active Associates"
    },{
        id: 'associateType-3-choice',
        selectName: "associateType",
        value: 0,
        label: "Inactive Associates"
    },{
        id: 'associateType-1-choice',
        selectName: "associateType",
        value: "all",
        label: "All completed paid/unpaid/in progress jobs"
    }
];
