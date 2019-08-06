// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";


class AssociateCreateStep6Component extends Component {
    render() {
        const {
            description, hourlySalaryDesired, limitSpecial, onTextChange,
            insuranceRequirements, insuranceRequirementOptions, onInsuranceRequirementMultiChange,
            returnURL, errors, isLoading, onNextClick, onSelectChange, onRadioChange,
            skillSet, skillSetOptions, onSkillSetMultiChange,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/associates"><i className="fas fa-user-circle"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Associate
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/associates/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/associates/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/associates/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={returnURL}>
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/associates/add/step-5">
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
                                <i className="fas fa-user-circle"></i>&nbsp;Account
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Skill Set (*)"
                                name="skillSet"
                                defaultOptionLabel="Please select the skills."
                                options={skillSetOptions}
                                selectedOptions={skillSet}
                                error={errors.skillSet}
                                onMultiChange={onSkillSetMultiChange}
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Insurance Requirements (*)"
                                name="insuranceRequirements"
                                defaultOptionLabel="Please select the insurance requirements."
                                options={insuranceRequirementOptions}
                                selectedOptions={insuranceRequirements}
                                error={errors.insuranceRequirements}
                                onMultiChange={onInsuranceRequirementMultiChange}
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-success"
                                label="Description"
                                placeholder="Write any additional details here."
                                rows="5"
                                value={description}
                                helpText="This is the description of the associate."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.hourlySalaryDesired}
                                label="Hourly Rate (*)"
                                onChange={onTextChange}
                                value={hourlySalaryDesired}
                                name="hourlySalaryDesired"
                                type="number"
                            />

                            <BootstrapTextarea
                                name="limitSpecial"
                                borderColour="border-success"
                                label="Limitation or special consideration"
                                placeholder="Please Write any limitation or special consideration that we must know about."
                                rows="5"
                                value={limitSpecial}
                                helpText="This will be used to help better serve our associates."
                                onChange={onTextChange}
                                error={errors.limitSpecial}
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onNextClick}>
                                    Proceed to Metrics&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/associates/add/step-5" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AssociateCreateStep6Component;
