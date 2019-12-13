// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactModal from 'react-modal';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapDatePicker } from "../../../bootstrap/bootstrapDatePicker";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import {
    WORK_ORDER_CLOSE_REASON_CHOICES, WAS_SUCCESSFULLY_FINISHED_CHOICES
} from "../../../../constants/api";


class AdminOrderCloseOperationComponent extends Component {
    render() {
        // Common
        const {
            id, errors, wasSuccessfullyFinished, completionDate, reason, reasonOther, comment, isLoading, onClick, onTextChange, onSelectChange, order,
            showModal, onShowModalClick, onCloseModalClick, onAgreeModalClick, onRadioChange, onCompletionDate
        } = this.props;
        const isReasonOther = reason === 1;

        // Apply our styling for our modal component.
        const customStyles = {
            content : {
                top                   : '50%',
                left                  : '50%',
                right                 : 'auto',
                bottom                : 'auto',
                marginRight           : '-50%',
                transform             : 'translate(-50%, -50%)'
            }
        };

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
                            <i className="fas fa-times"></i>&nbsp;Close Order
                        </li>
                    </ol>
                </nav>

                <ReactModal
                   isOpen={showModal}
                    style={customStyles}
             contentLabel="Minimal Modal Example"
           onRequestClose={onCloseModalClick}>
                   <div>

                        <h1>
                            <i className="fas fa-exclamation-triangle"></i>&nbsp;Confirmation Required
                            { /* <button type="button" className="btn btn-orange btn-lg float-right" onClick={onCloseModalClick}>
                               <span className="fa fa-times"></span>
                            </button> */ }
                        </h1>
                        <div className="row">
                            <div className="col-md-8 mx-auto mt-2">

                                <form className="needs-validation" noValidate>

                                   <p>This will close the job. Do you want to continue?</p>

                                   <button
                                       onClick={onCloseModalClick}
                                       type="button"
                                       className="btn btn-lg btn-danger float-left">
                                       <i className="fas fa-times"></i>&nbsp;No
                                   </button>
                                   <button
                                       onClick={onAgreeModalClick}
                                       type="button"
                                       className="btn btn-lg btn-success float-right">
                                       <i className="fas fa-check-circle"></i>&nbsp;Yes
                                   </button>
                               </form>
                           </div>
                       </div>
                   </div>
                </ReactModal>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Quick Info
                                    </th>
                                </tr>
                                {order.customerFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client</th>
                                        <td>
                                            <Link to={`/customer/${order.customer}`} target="_blank">
                                                {order.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Associate</th>
                                    <td>
                                        {order.associateFullName
                                            ?<Link to={`/customer/${order.associate}`} target="_blank">
                                                {order.associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comments</th>
                                    <td>
                                        <Link to={`/order/${order.id}/comments`} target="_blank">
                                            View Comments&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <br />

                        <form>
                            <h1><i className="fas fa-times"></i>&nbsp;Close Order</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.wasSuccessfullyFinished}
                                label="Was this job successfully completed by the Associate? (*)"
                                name="wasSuccessfullyFinished"
                                onChange={onRadioChange}
                                selectedValue={wasSuccessfullyFinished}
                                options={WAS_SUCCESSFULLY_FINISHED_CHOICES}
                                helpText="Selecting 'yes' will close this job as success."
                            />

                            {wasSuccessfullyFinished === 1 || wasSuccessfullyFinished === "1" &&
                                <div>
                                    <BootstrapDatePicker
                                        label="Completion date (*)"
                                        name="completionDate"
                                        dateObj={completionDate}
                                        onTimeChange={onCompletionDate}
                                        datePickerClassName="form-control form-control-lg border"
                                        divClassName="form-group p-0 col-md-7 mb-4"
                                        error={errors.completionDate}
                                        helpText="If associate promises to complete in a future date, then postpone this order."
                                        maxDate={new Date()}
                                    />
                                </div>
                            }

                            {wasSuccessfullyFinished === 0 || wasSuccessfullyFinished === "0" &&
                                <div>
                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="Reason (*)"
                                        name="reason"
                                        defaultOptionLabel="Please select the reason."
                                        options={WORK_ORDER_CLOSE_REASON_CHOICES}
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
                                </div>
                            }



                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onShowModalClick}>
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

export default AdminOrderCloseOperationComponent;
