// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from '../../../bootstrap/bootstrapSingleSelect';
import { BootstrapTelephoneInput } from "../../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";
import { BootstrapCountrySelect } from '../../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../../bootstrap/bootstrapRegionSelect'
import { BootstrapMultipleSelect } from "../../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../../bootstrap/bootstrapDatePicker';
import {
    IS_OK_TO_EMAIL_CHOICES,
    IS_OK_TO_TEXT_CHOICES,
    GENDER_RADIO_CHOICES,
    COMMERCIAL_ASSOCIATE_TYPE_OF_ID
} from "../../../../constants/api";


class AdminAssociateMetricsUpdateComponent extends Component {
    render() {
        const {
            typeOf, givenName, lastName,

            // Step 7
            isTagsLoading, tags, tagOptions, dateOfBirth, gender, isHowHearLoading, howHear, howHearOptions, howHearOther, joinDate, description,

            // Everything else...
            id, errors, onTextChange, onRadioChange, isLoading, onClick, fullName,
            onSelectChange, onTagMultiChange, onJoinDateChange,
            onDateOfBirthChange,
        } = this.props;
        const isOtherHowDidYouHearSelected = howHear === 'Other';
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associate/${id}/full`}><i className="fas fa-user"></i>&nbsp;{fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Edit Associate (Metrics)
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>
                                <i className="fas fa-edit"></i>&nbsp;Edit Associate (Metrics)
                            </h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.gender}
                                label="Please select your gender (*)"
                                name="gender"
                                onChange={onRadioChange}
                                selectedValue={gender}
                                options={GENDER_RADIO_CHOICES}
                            />

                            {typeOf !== COMMERCIAL_ASSOCIATE_TYPE_OF_ID && <BootstrapDatePicker
                                label="Date of Birth (*)"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDateOfBirthChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                            />}

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="howHear"
                                defaultOptionLabel="Please select how you heard about us."
                                options={howHearOptions}
                                value={howHear}
                                error={errors.howHear}
                                onSelectChange={onSelectChange}
                                isLoading={isHowHearLoading}
                            />

                            {isOtherHowDidYouHearSelected &&
                                <BootstrapInput
                                    inputClassName="form-control form-control-lg"
                                    borderColour="border-primary"
                                    error={errors.howHearOther}
                                    label="Other (*)"
                                    onChange={onTextChange}
                                    value={howHearOther}
                                    name="howHearOther"
                                    type="text"
                                />
                            }

                            <BootstrapDatePicker
                                label="Join date (*)"
                                name="joinDate"
                                dateObj={joinDate}
                                onTimeChange={onJoinDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.joinDate}
                            />

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-success"
                                label="Description"
                                placeholder="Please a description of the associate."
                                rows="5"
                                value={description}
                                helpText=""
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/associate/${id}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminAssociateMetricsUpdateComponent;
