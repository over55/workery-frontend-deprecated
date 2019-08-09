// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from "../../../bootstrap/bootstrapDatePicker";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { AWAY_LOG_REASON_CHOICES } from '../../../../constants/api';


class AwayLogCreateComponent extends Component {
    render() {
        const {
            associate, associateOptions, startDate, reason, reasonOther, untilFurtherNotice,
            errors, onTextChange, onSelectChange, onStartDateChange, isLoading, onClick
        } = this.props;
        const isOtherReasonSelected = reason === 1;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/away-logs"><i className="fas fa-bullhorn"></i>&nbsp;AwayLogs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Create New AwayLogs</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Associate? (*)"
                                name="associate"
                                defaultOptionLabel="Please select the associate."
                                options={associateOptions}
                                value={associate}
                                error={errors.associate}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapDatePicker
                                label="Start date (*)"
                                name="startDate"
                                dateObj={startDate}
                                onTimeChange={onStartDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.startDate}
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Reason (*)"
                                name="reason"
                                defaultOptionLabel="Please select a reason."
                                options={AWAY_LOG_REASON_CHOICES}
                                value={reason}
                                error={errors.reason}
                                onSelectChange={onSelectChange}
                            />
                            {isOtherReasonSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.reasonOther}
                                    label="Reason Other (*)"
                                    onChange={onTextChange}
                                    value={reasonOther}
                                    name="reasonOther"
                                    type="text"
                                />
                            }

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/settings/away-logs" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AwayLogCreateComponent;
