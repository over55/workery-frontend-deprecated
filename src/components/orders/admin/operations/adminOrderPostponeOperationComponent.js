// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import { WORK_ORDER_POSTPONE_REASON_CHOICES } from "../../../../constants/api";


class AdminOrderReopenOperationComponent extends Component {
    render() {
        const {
            id, errors, reason, reasonOther, startDate, comment, isLoading, onClick, onTextChange, onSelectChange, onStartDateTimeChange, order
        } = this.props;
        const isReasonOther = reason === 1;
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
                            <i className="fas fa-clock"></i>&nbsp;Postpone
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">

                        <form>
                            <h1><i className="fas fa-clock"></i>&nbsp;Postpone Order</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Reason (*)"
                                name="reason"
                                defaultOptionLabel="Please select the reason."
                                options={WORK_ORDER_POSTPONE_REASON_CHOICES}
                                value={reason}
                                error={errors.reason}
                                onSelectChange={onSelectChange}
                            />

                            {isReasonOther &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.reasonOther}
                                    label="Reason (Other) (*)"
                                    onChange={onTextChange}
                                    value={reasonOther}
                                    name="reasonOther"
                                    type="text"
                                />
                            }

                            <BootstrapDatePicker
                                label="Start Date (*)"
                                name="startDate"
                                dateObj={startDate}
                                onTimeChange={onStartDateTimeChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.startDate}
                            />

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Describe the comment (*)"
                                placeholder="Describe here."
                                rows="5"
                                value={comment}
                                helpText="Maximum 1,000 characters."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/order/${id}/operations`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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
export default AdminOrderReopenOperationComponent;
