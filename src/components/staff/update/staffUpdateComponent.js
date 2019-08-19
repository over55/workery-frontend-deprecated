// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect';
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect';
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES, GENDER_CHOICES,
    TENANT_STAFF_GROUP_MEMBERSHIP_CHOICES, GENDER_RADIO_CHOICES
} from "../../../constants/api";


export default class StaffUpdateComponent extends Component {
    render() {
        const {
            // Step 4
            givenName, lastName, primaryPhone, secondaryPhone, email, personalEmail, isOkToEmail, isOkToText,

            // Step 5
            country, region, locality, postalCode, streetAddress,

            // Step 6
            password, passwordRepeat, description, emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone, isActive, policeCheck,

            // Step 7
            tags, dateOfBirth, gender, howHear, howHearOther, joinDate, comment,
            tagOptions, howHearOptions,

            // Everything else...
            id, errors, isLoading,

            // Functions
            onTextChange, onRadioChange, onClick, onSelectChange, onCountryChange, onRegionChange, onPoliceCheckDateChange, onTagMultiChange, onDateOfBirthChange, onJoinDateChange,
        } = this.props;
        const isOtherHowDidYouHearSelected = howHear === 'Other';
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff`}><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff/${id}/full`}><i className="fas fa-user"></i>&nbsp;{givenName}&nbsp;{lastName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-edit"></i>&nbsp;Update Staff</h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2><i className="fas fa-user-tie"></i>&nbsp;Staff Form</h2>

                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <h4><i className="fas fa-tty"></i>&nbsp;Contact Information</h4>

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.givenName}
                                label="First Name (*)"
                                onChange={onTextChange}
                                value={givenName}
                                name="givenName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.lastName}
                                label="Last Name (*)"
                                onChange={onTextChange}
                                value={lastName}
                                name="lastName"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.primaryPhone}
                                label="Primary Phone (*)"
                                onChange={onTextChange}
                                value={primaryPhone}
                                name="primaryPhone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.secondaryPhone}
                                label="Secondary Phone"
                                onChange={onTextChange}
                                value={secondaryPhone}
                                name="secondaryPhone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Work Email (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.personalEmail}
                                label="Personal Email (*)"
                                onChange={onTextChange}
                                value={personalEmail}
                                name="personalEmail"
                                type="text"
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToEmail}
                                label="Ok to E-Mail? (*)"
                                name="isOkToEmail"
                                onChange={onRadioChange}
                                selectedValue={isOkToEmail}
                                options={IS_OK_TO_EMAIL_CHOICES}
                                helpText='Selecting "yes" will result in staff getting emails from our system.'
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isOkToText}
                                label="Ok to Text? (*)"
                                name="isOkToText"
                                onChange={onRadioChange}
                                selectedValue={isOkToText}
                                options={IS_OK_TO_TEXT_CHOICES}
                                helpText='Selecting "yes" will result in staff getting text-messages on their phone from our system.'
                            />

                            <h4><i className="fas fa-map-marker"></i>&nbsp;Street Address</h4>

                            <BootstrapCountrySelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.country}
                                label="Country (*)"
                                value={country}
                                onChange={onCountryChange}
                                priorityOptions={["CA", "US", "MX"]}
                                name="country"
                            />
                            <BootstrapRegionSelect
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.region}
                                label="Province / state (*)"
                                country={country}
                                value={region}
                                onChange={onRegionChange}
                                name="region"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.locality}
                                label="City (*)"
                                onChange={onTextChange}
                                value={locality}
                                name="locality"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.streetAddress}
                                label="Street address (*)"
                                onChange={onTextChange}
                                value={streetAddress}
                                name="streetAddress"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.postalCode}
                                label="Postal / zip (*)"
                                onChange={onTextChange}
                                value={postalCode}
                                name="postalCode"
                                type="text"
                            />

                            <h4><i className="fas fa-id-card-alt"></i>&nbsp;Account</h4>

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-shield"></i>&nbsp;Policy
                            </p>

                            <BootstrapDatePicker
                                label="Police Check Expiry (*)"
                                name="policeCheck"
                                dateObj={policeCheck}
                                onTimeChange={onPoliceCheckDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.policeCheck}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-clinic-medical"></i>&nbsp;Emergency Contact
                            </p>

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.emergencyContactName}
                                label="Full name"
                                onChange={onTextChange}
                                value={emergencyContactName}
                                name="emergencyContactName"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.emergencyContactRelationship}
                                label="Relationship"
                                onChange={onTextChange}
                                value={emergencyContactRelationship}
                                name="emergencyContactRelationship"
                                type="text"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyContactTelephone}
                                label="Primary Phone"
                                onChange={onTextChange}
                                value={emergencyContactTelephone}
                                name="emergencyContactTelephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.emergencyContactAlternativeTelephone}
                                label="Secondary Phone"
                                onChange={onTextChange}
                                value={emergencyContactAlternativeTelephone}
                                name="emergencyContactAlternativeTelephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-server"></i>&nbsp;System
                            </p>

                            <BootstrapTextarea
                                name="description"
                                borderColour="border-success"
                                label="Description"
                                placeholder="Write any additional details here."
                                rows="5"
                                value={description}
                                helpText="This is the description of the staff."
                                onChange={onTextChange}
                                error={errors.description}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-primary"
                                error={errors.isActive}
                                label="Is active? (*)"
                                name="isActive"
                                onChange={onRadioChange}
                                selectedValue={isActive}
                                options={IS_ACTIVE_TYPE_OF_CHOICES}
                                helpText='Selecting "yes" will grant the staff login ability.'
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.password}
                                label="Password (*)"
                                onChange={onTextChange}
                                value={password}
                                name="password"
                                type="password"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.passwordRepeat}
                                label="Repeat Password (*)"
                                onChange={onTextChange}
                                value={passwordRepeat}
                                name="passwordRepeat"
                                type="password"
                            />


                            <h4><i className="fas fa-user-shield"></i>&nbsp;Metrics</h4>

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Tags"
                                name="tags"
                                defaultOptionLabel="Please select the tag."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onTagMultiChange}
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

                            <BootstrapDatePicker
                                label="Date of Birth (*)"
                                name="dateOfBirth"
                                dateObj={dateOfBirth}
                                onTimeChange={onDateOfBirthChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.dateOfBirth}
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="howHear"
                                defaultOptionLabel="Please select how you heard about us."
                                options={howHearOptions}
                                value={howHear}
                                error={errors.howHear}
                                onSelectChange={onSelectChange}
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
                                name="comment"
                                borderColour="border-success"
                                label="Additional Comments"
                                placeholder="Write any additional comments here."
                                rows="5"
                                value={comment}
                                helpText="This is the comment of the organization."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/staff/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


const IS_ACTIVE_TYPE_OF_CHOICES = [
    {
        id: 'isActive-1-choice',
        selectName: "isActive",
        value: 1,
        label: "Active"
    },{
        id: 'isActive-0-choice',
        selectName: "isActive",
        value: 0,
        label: "Inactive"
    }
];
