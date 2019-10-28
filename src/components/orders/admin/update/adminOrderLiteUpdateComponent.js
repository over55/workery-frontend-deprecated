// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation"
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { HOME_SUPPORT_CHOICES } from '../../../../constants/api';


export default class AdminOrderLiteUpdateComponent extends Component {
    render() {
        const {
            id, isLoading, errors,
            description, isSkillSetsLoading, skillSets, skillSetOptions, onSkillSetMultiChange,
            isTagsLoading, tags, tagOptions, onTagMultiChange, assignmentDate, onAssignmentDateChange, completionDate, onCompletionDateChange,
            homeSupport, onRadioChange,
            onClick, onTextChange, user
        } = this.props;
        const isExecutive = user.groupId === 1;
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
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Order
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file"></i>&nbsp;Order Form
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-graduation-cap"></i>&nbsp;Skills and Description
                            </p>

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-primary"
                                label="Describe the Job:"
                                placeholder="Describe here."
                                rows="5"
                                value={description}
                                helpText="Maximum 1,000 characters."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Skill Set (*)"
                                name="skillSets"
                                defaultOptionLabel="Please select the skills."
                                options={skillSetOptions}
                                selectedOptions={skillSets}
                                error={errors.skillSets}
                                onMultiChange={onSkillSetMultiChange}
                                isLoading={isSkillSetsLoading}
                            />

                            <BootstrapDatePicker
                                label="Assignment date"
                                name="assignmentDate"
                                dateObj={assignmentDate}
                                onTimeChange={onAssignmentDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.assignmentDate}
                                borderClassname="border-success"
                                disabled={isExecutive === false}
                            />

                            <BootstrapDatePicker
                                label="Completion date"
                                name="completionDate"
                                dateObj={completionDate}
                                onTimeChange={onCompletionDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.completionDate}
                                borderClassname="border-success"
                                maxDate={new Date()}
                                disabled={isExecutive === false}
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

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                            </p>

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onTagMultiChange}
                                isLoading={isTagsLoading}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/order/${id}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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
