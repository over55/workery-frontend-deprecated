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


export default class OrderCompletionTaskStep2Component extends Component {
    render() {
        const {
            task, status, id, comment, reason, reasonOther, onSelectChange, invoiceDate, onClick, onBack, errors, isLoading, onRadioChange, onTextChange, onInvoiceDateChange
        } = this.props;
        const isCancelled = status === false || status === "false";
        const isCompleted = status === true || status === "true";
        const isOtherHowDidYouHearSelected = reason === 'Other';
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
                        <div id="step-2" className="st-grey active">
                            <span className="num">2.</span><span className="">Status</span>
                        </div>
                        <div id="step-3" className="st-grey">
                            <strong>
                                <span className="num">3.</span><span className="">Financials</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-calendar-check"></i>&nbsp;Status
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
                                error={errors.status}
                                label="Was this job successfully completed by the Associate? (*)"
                                name="status"
                                onChange={onRadioChange}
                                selectedValue={status}
                                options={STATUS_CHOICES}
                                helpText='Selecting "yes" will close this job as success.'
                            />
                            {/*
                            <!--------------------------------------------->
                            <!--            end YES/NO CHOICE            -->
                            <!--------------------------------------------->
                            */}

                            {/*
                            <!--------------------------------------------->
                            <!--          FAILURE REASON SUVERY          -->
                            <!--------------------------------------------->
                            */}

                            {isCancelled &&
                                <div>
                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="How did you hear about us? (*)"
                                        name="reason"
                                        defaultOptionLabel="Please select how you heard about us."
                                        options={ORDER_CANCEL_REASON_CHOICES}
                                        value={reason}
                                        error={errors.reason}
                                        onSelectChange={onSelectChange}
                                    />

                                    {isOtherHowDidYouHearSelected &&
                                        <BootstrapInput
                                            inputClassName="form-control form-control-lg"
                                            borderColour="border-primary"
                                            error={errors.reasonOther}
                                            label="Other (*)"
                                            onChange={onTextChange}
                                            value={reasonOther}
                                            name="reasonOther"
                                            type="text"
                                        />
                                    }

                                </div>
                            }

                            {/*
                            <!--------------------------------------------->
                            <!--        end FAILURE REASON SUVERY        -->
                            <!--------------------------------------------->
                            */}

                            {/*
                            <!--------------------------------------------->
                            <!--              FINANCIAL DATA             -->
                            <!--------------------------------------------->
                            */}
                            {isCompleted &&
                                <div>
                                    <BootstrapDatePicker
                                        label="Completion date (*)"
                                        name="invoiceDate"
                                        dateObj={invoiceDate}
                                        onTimeChange={onInvoiceDateChange}
                                        datePickerClassName="form-control form-control-lg border"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                        error={errors.invoiceDate}
                                    />
                                </div>
                            }
                            {/*
                            <!--------------------------------------------->
                            <!--           end FINANCIAL DATA            -->
                            <!--------------------------------------------->
                            */}

                            {/*
                            <!--------------------------------------------->
                            <!--           ADDITIONAL COMMENTS           -->
                            <!--------------------------------------------->
                            */}

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

                            {/*
                            <!--------------------------------------------->
                            <!--         end ADDITIONAL COMMENTS         -->
                            <!--------------------------------------------->
                            */}

                        </form>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick} isLoading={isLoading}>
                                Proceed to Financials&nbsp;<i className="fas fa-arrow-circle-right"></i>
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/task/6/${id}/step-1`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}


const STATUS_CHOICES = [
    {
        id: 'status-m-choice',
        name: "status",
        value: true,
        label: "Yes"
    },{
        id: 'status-f-choice',
        name: "status",
        value: false,
        label: "No"
    }
];
