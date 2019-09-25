// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { JOB_TYPE_CHOICES, HOME_SUPPORT_CHOICES, IS_ONGOING_JOB_TYPE } from '../../../../constants/api';


export default class OrderCreateStep3Component extends Component {
    render() {
        const {
            errors, onNextClick,
            startDate, onStartDateChange,
            jobType, homeSupport, onRadioChange,
        } = this.props;
        const isOngoing = parseInt(jobType) === IS_ONGOING_JOB_TYPE;
        const helpText = "<strong>Note:</strong> Selecting 'Ongoing' will result in this job will being re-created by the system every month. You will be able to terminate or pause this job from the <a href='/'>ongoing jobs page</a> . If you have any questions please <a href='/help'>contact the administrator</a>.";
        const jobTypeHelpText = isOngoing ? helpText : null;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Order
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/orders/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/orders/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Job Type</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills and Description</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-cog"></i>&nbsp;Job Type
                            </h2>
                            <p className="text-secondary font-italic">All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            { /*<p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Personal Information
                            </p> */}

                            <BootstrapDatePicker
                                label="Start date"
                                name="startDate"
                                dateObj={startDate}
                                onTimeChange={onStartDateChange}
                                borderClassname="border-success"
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.startDate}
                                helpText="This field is optional as start date can be set at a later task."
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.jobType}
                                label="Is this job one time or ongoing? (*)"
                                name="jobType"
                                onChange={onRadioChange}
                                selectedValue={jobType}
                                options={JOB_TYPE_CHOICES}
                                helpText={jobTypeHelpText}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.homeSupport}
                                label="Is this job a home support service? (*)"
                                name="homeSupport"
                                onChange={onRadioChange}
                                selectedValue={homeSupport}
                                options={HOME_SUPPORT_CHOICES}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onNextClick}>
                                    Skills&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/orders/add/step-2" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}
