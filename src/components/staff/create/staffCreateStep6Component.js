// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { IS_ACTIVE_TYPE_OF_CHOICES } from "../../../constants/api";


class StaffCreateStep6Component extends Component {
    render() {
        const {
            errors, isLoading, onNextClick, onSelectChange,
            password, passwordRepeat, description, emergencyContactName,
            emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone, onTextChange,
            isActive, onRadioChange,
            policeCheck, onPoliceCheckDateChange
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Staff
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/staff/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/staff/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/staff/add/step-3">
                                <span className="num">3.</span><span className="">Group</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/staff/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/staff/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey active">
                            <strong>
                                <span className="num">6.</span><span className="">Account</span>
                            </strong>
                        </div>
                        <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-8" className="st-grey">
                            <span className="num">8.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-user-tie"></i>&nbsp;Account
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Policy
                            </p>

                            <BootstrapDatePicker
                                label="Police Check Expiry (*)"
                                name="policeCheck"
                                dateObj={policeCheck}
                                onTimeChange={onPoliceCheckDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.policeCheck}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-friends"></i>&nbsp;Emergency Contact
                            </p>

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.emergencyContactName}
                                label="Full name"
                                onChange={onTextChange}
                                value={emergencyContactName}
                                name="emergencyContactName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.emergencyContactRelationship}
                                label="Relationship"
                                onChange={onTextChange}
                                value={emergencyContactRelationship}
                                name="emergencyContactRelationship"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyContactTelephone}
                                label="Primary Phone"
                                onChange={onTextChange}
                                value={emergencyContactTelephone}
                                name="emergencyContactTelephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyContactAlternativeTelephone}
                                label="Secondary Phone"
                                onChange={onTextChange}
                                value={emergencyContactAlternativeTelephone}
                                name="emergencyContactAlternativeTelephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-server"></i>&nbsp;System
                            </p>

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-success"
                                label="Description"
                                placeholder="Write any additional details here."
                                rows="5"
                                value={description}
                                helpText="This is the description of the staff."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isActive}
                                label="Is active? (*)"
                                name="isActive"
                                onChange={onRadioChange}
                                selectedValue={isActive}
                                options={IS_ACTIVE_TYPE_OF_CHOICES}
                                helpText='Selecting "yes" will grant the staff login ability.'
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.password}
                                label="Password (*)"
                                onChange={onTextChange}
                                value={password}
                                name="password"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.passwordRepeat}
                                label="Repeat Password (*)"
                                onChange={onTextChange}
                                value={passwordRepeat}
                                name="passwordRepeat"
                                type="password"
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onNextClick}>
                                    Proceed to Metrics&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/staff/add/step-5" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default StaffCreateStep6Component;
