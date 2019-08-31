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
            wasSurveyConducted, noSurveyConductedReason, noSurveyConductedReasonOther,
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Survey</h1>

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
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Review</span>
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
                                </div>
                            }

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Comment (*)"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This is the comment will be attached to the order."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                Proceed to Review&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/7/${id}/step-1`}>
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
