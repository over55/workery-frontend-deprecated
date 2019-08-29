import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { ORDER_CANCEL_REASON_CHOICES } from "../../../constants/api";


export default class OrderCompletionTaskStep3Component extends Component {
    render() {
        const {
            task, hasInputtedFinancials, id, onClick, onBack, errors, isLoading, onRadioChange, onTextChange
        } = this.props;
        const isNotInputted = hasInputtedFinancials === false || hasInputtedFinancials === "false";
        const isInputted = hasInputtedFinancials === true || hasInputtedFinancials === "true";
        // const isOtherHowDidYouHearSelected = reason === 'Other';
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
                            <i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-thumbtack"></i>&nbsp;Task # {task && task.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })} - Order Completion</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/task/6/${id}/step-1`}>
                                <span className="num">1.</span><span className="">Info</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/task/6/${id}/step-2`}>
                                <span className="num">2.</span><span className="">Status</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Financials</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Comment</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-credit-card"></i>&nbsp;Financials
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {/*
                            <!--------------------------------------------->
                            <!--            end YES/NO CHOICE            -->
                            <!--------------------------------------------->
                            */}

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.hasInputtedFinancials}
                                label="Was there financials inputted? (*)"
                                name="hasInputtedFinancials"
                                onChange={onRadioChange}
                                selectedValue={hasInputtedFinancials}
                                options={HAS_INPUTTED_FINANCIALS_CHOICES}
                                helpText='Selecting "yes" will require you to ask the financials and input it here.'
                            />
                            {/*
                            <!--------------------------------------------->
                            <!--            end YES/NO CHOICE            -->
                            <!--------------------------------------------->
                            */}


                            {/*
                            <!--------------------------------------------->
                            <!--              FINANCIAL DATA             -->
                            <!--------------------------------------------->
                            */}

                            {isInputted &&
                                <div>test
                                </div>
                            }

                            {/*
                            <!--------------------------------------------->
                            <!--           end FINANCIAL DATA            -->
                            <!--------------------------------------------->
                            */}

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                Proceed to Comment&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/6/${id}/step-2`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}


const HAS_INPUTTED_FINANCIALS_CHOICES = [
    {
        id: 'hasInputtedFinancials-m-choice',
        name: "hasInputtedFinancials",
        value: true,
        label: "Yes"
    },{
        id: 'hasInputtedFinancials-f-choice',
        name: "hasInputtedFinancials",
        value: false,
        label: "No"
    }
];
