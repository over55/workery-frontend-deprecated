import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { NO_SURVEY_CONDUCTED_REASON_CHOICES } from "../../../constants/api";


export default class SurveyTaskStep2Component extends Component {
    render() {
        const {
            wasSurveyConducted, noSurveyConductedReason, noSurveyConductedReasonOther, wasJobSatisfactory, wasJobFinishedOnTimeAndOnBudget, wasAssociatePunctual, wasAssociateProfessional, wouldCustomerReferOurOrganization,
            task, id, comment, onClick, onBack, errors, isLoading, onRadioChange, onTextChange, onSelectChange
        } = this.props;

        const isCancelled = wasSurveyConducted === false || wasSurveyConducted === "false";
        const isCompleted = wasSurveyConducted === true || wasSurveyConducted === "true";
        const isOtherSelected = noSurveyConductedReason === 1;

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/tasks`}><i className="fas fa-tasks"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.orderId && task.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/7/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Survey</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-user-check"></i>&nbsp;Review
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.wasSurveyConducted}
                                label="Was there a survey conducted? (*)"
                                name="wasSurveyConducted"
                                onChange={onRadioChange}
                                selectedValue={wasSurveyConducted}
                                options={WAS_SURVEY_CONDUCTED_CHOICES}
                            />

                            <hr />

                            {isCancelled &&
                                <div>
                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="Please select why the survey was not conducted? (*)"
                                        name="noSurveyConductedReason"
                                        defaultOptionLabel="Please select how you heard about u."
                                        options={NO_SURVEY_CONDUCTED_REASON_CHOICES}
                                        value={noSurveyConductedReason}
                                        error={errors.noSurveyConductedReason}
                                        onSelectChange={onSelectChange}
                                    />

                                    {isOtherSelected &&
                                        <BootstrapInput
                                            inputClassName="form-control form-control-lg"
                                            borderColour="border-primary"
                                            error={errors.noSurveyConductedReasonOther}
                                            label="Other (*)"
                                            onChange={onTextChange}
                                            value={noSurveyConductedReasonOther}
                                            name="noSurveyConductedReasonOther"
                                            type="text"
                                        />
                                    }
                                </div>
                            }

                            {isCompleted &&
                                <div>
                                    <BootstrapRadio
                                        inputClassName="form-check-input form-check-input-lg"
                                        borderColour="border-primary"
                                        error={errors.wasJobSatisfactory}
                                        label="Was the quality of the work satisfactory? (*)"
                                        name="wasJobSatisfactory"
                                        onChange={onRadioChange}
                                        selectedValue={wasJobSatisfactory}
                                        options={WAS_JOB_SATISFACTORY_CHOICES}
                                    />
                                    <BootstrapRadio
                                        inputClassName="form-check-input form-check-input-lg"
                                        borderColour="border-primary"
                                        error={errors.wasJobFinishedOnTimeAndOnBudget}
                                        label="Was the work completed on time and on budget? (*)"
                                        name="wasJobFinishedOnTimeAndOnBudget"
                                        onChange={onRadioChange}
                                        selectedValue={wasJobFinishedOnTimeAndOnBudget}
                                        options={WAS_JOB_FINISHED_ON_TIME_AND_ON_BUDGET_CHOICES}
                                    />
                                    <BootstrapRadio
                                        inputClassName="form-check-input form-check-input-lg"
                                        borderColour="border-primary"
                                        error={errors.wasAssociatePunctual}
                                        label="Was the Associate Member punctual? (*)"
                                        name="wasAssociatePunctual"
                                        onChange={onRadioChange}
                                        selectedValue={wasAssociatePunctual}
                                        options={WAS_ASSOCIATE_PUNCTUAL_CHOICES}
                                    />
                                    <BootstrapRadio
                                        inputClassName="form-check-input form-check-input-lg"
                                        borderColour="border-primary"
                                        error={errors.wasAssociateProfessional}
                                        label="Was the Associate Member professional? (*)"
                                        name="wasAssociateProfessional"
                                        onChange={onRadioChange}
                                        selectedValue={wasAssociateProfessional}
                                        options={WAS_ASSOCIATE_PROFESSIONAL_CHOICES}
                                    />
                                    <BootstrapRadio
                                        inputClassName="form-check-input form-check-input-lg"
                                        borderColour="border-primary"
                                        error={errors.wouldCustomerReferOurOrganization}
                                        label="Would you refer Over55 to a friend of family member? (*)"
                                        name="wouldCustomerReferOurOrganization"
                                        onChange={onRadioChange}
                                        selectedValue={wouldCustomerReferOurOrganization}
                                        options={WOULD_CUSTOMER_REFER_OUR_ORGANIZATIONL_CHOICES}
                                    />
                                </div>
                            }

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Comment (*)"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This comment will be attached to the order."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                Next&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to={`/task/7/${id}/step-1`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


const WAS_SURVEY_CONDUCTED_CHOICES = [
    {
        id: 'wasSurveyConducted-m-choice',
        name: "wasSurveyConducted",
        value: true,
        label: "Yes"
    },{
        id: 'wasSurveyConducted-f-choice',
        name: "wasSurveyConducted",
        value: false,
        label: "No"
    }
];


const WAS_JOB_SATISFACTORY_CHOICES = [
    {
        id: 'wasJobSatisfactory-m-choice',
        name: "wasJobSatisfactory",
        value: true,
        label: "Yes"
    },{
        id: 'wasJobSatisfactory-f-choice',
        name: "wasJobSatisfactory",
        value: false,
        label: "No"
    }
];


const WAS_JOB_FINISHED_ON_TIME_AND_ON_BUDGET_CHOICES = [
    {
        id: 'wasJobFinishedOnTimeAndOnBudget-m-choice',
        name: "wasJobFinishedOnTimeAndOnBudget",
        value: true,
        label: "Yes"
    },{
        id: 'wasJobFinishedOnTimeAndOnBudget-f-choice',
        name: "wasJobFinishedOnTimeAndOnBudget",
        value: false,
        label: "No"
    }
];


const WAS_ASSOCIATE_PUNCTUAL_CHOICES = [
    {
        id: 'wasAssociatePunctual-m-choice',
        name: "wasAssociatePunctual",
        value: true,
        label: "Yes"
    },{
        id: 'wasAssociatePunctual-f-choice',
        name: "wasAssociatePunctual",
        value: false,
        label: "No"
    }
];


const WAS_ASSOCIATE_PROFESSIONAL_CHOICES = [
    {
        id: 'wasAssociateProfessional-m-choice',
        name: "wasAssociateProfessional",
        value: true,
        label: "Yes"
    },{
        id: 'wasAssociateProfessional-f-choice',
        name: "wasAssociateProfessional",
        value: false,
        label: "No"
    }
];


const WOULD_CUSTOMER_REFER_OUR_ORGANIZATIONL_CHOICES = [
    {
        id: 'wouldCustomerReferOurOrganization-m-choice',
        name: "wouldCustomerReferOurOrganization",
        value: true,
        label: "Yes"
    },{
        id: 'wouldCustomerReferOurOrganization-f-choice',
        name: "wouldCustomerReferOurOrganization",
        value: false,
        label: "No"
    }
];
