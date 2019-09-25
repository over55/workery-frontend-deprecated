// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from '../../bootstrap/bootstrapSingleSelect';
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES, GENDER_RADIO_CHOICES } from "../../../constants/api";


class AdminAssociateAccountUpdateComponent extends Component {
    render() {
        const {
            // Step 4
            givenName, lastName,

            // Step 6
            description, hourlySalaryDesired, limitSpecial, taxId, driversLicenseClass,
            skillSets, skillSetOptions, insuranceRequirements, insuranceRequirementOptions,
            vehicleTypes, vehicleTypeOptions, duesDate, wsibNumber,
            commercialInsuranceExpiryDate, autoInsuranceExpiryDate, wsibInsuranceDate, policeCheck, emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone,
            isVehicleTypesLoading, isSkillSetsLoading, isInsuranceRequirementsLoading,

            // Everything else...
            id, errors, onTextChange, onRadioChange, isLoading, onClick, fullName,
            onSelectChange, onBillingCountryChange, onBillingRegionChange,
            onSkillSetMultiChange, onDuesDateChange, onCommercialInsuranceExpiryDate,
            onAutoInsuranceExpiryDateChange, onWsibInsuranceDateChange, onPoliceCheckDateChange,
            onVehicleTypeMultiChange, onInsuranceRequirementMultiChange, onTagMultiChange, onJoinDateChange,
            onDateOfBirthChange,
        } = this.props;
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
                            <i className="fas fa-edit"></i>&nbsp;Edit Associate (Account)
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>
                                <i className="fas fa-edit"></i>&nbsp;Edit Associate
                            </h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-graduation-cap"></i>&nbsp;Skills
                            </p>

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

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-balance-scale"></i>&nbsp;Legality, Insurance, financial, etc
                            </p>

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Insurance Requirements (*)"
                                name="insuranceRequirements"
                                defaultOptionLabel="Please select the insurance requirements."
                                options={insuranceRequirementOptions}
                                selectedOptions={insuranceRequirements}
                                error={errors.insuranceRequirements}
                                onMultiChange={onInsuranceRequirementMultiChange}
                                isLoading={isInsuranceRequirementsLoading}
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.hourlySalaryDesired}
                                label="Hourly Rate (*)"
                                onChange={onTextChange}
                                value={hourlySalaryDesired}
                                name="hourlySalaryDesired"
                                type="number"
                            />

                            <BootstrapTextarea
                                name="limitSpecial"
                                borderColour="border-success"
                                label="Limitation or special consideration"
                                placeholder="Please Write any limitation or special consideration that we must know about."
                                rows="5"
                                value={limitSpecial}
                                helpText="This will be used to help better serve our associates."
                                onChange={onTextChange}
                                error={errors.limitSpecial}
                            />
                            <BootstrapDatePicker
                                label="Member Dues (*)"
                                name="duesDate"
                                dateObj={duesDate}
                                onTimeChange={onDuesDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.duesDate}
                            />

                            <BootstrapDatePicker
                                label="Commercial Insurance Expiry Date (*)"
                                name="commercialInsuranceExpiryDate"
                                dateObj={commercialInsuranceExpiryDate}
                                onTimeChange={onCommercialInsuranceExpiryDate}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.commercialInsuranceExpiryDate}
                            />

                            <BootstrapDatePicker
                                borderColour="border-success"
                                label="Auto Insurance Expiry Date"
                                name="autoInsuranceExpiryDate"
                                dateObj={autoInsuranceExpiryDate}
                                onTimeChange={onAutoInsuranceExpiryDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.autoInsuranceExpiryDate}
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.wsibNumber}
                                label="WSIB #"
                                onChange={onTextChange}
                                value={wsibNumber}
                                name="wsibNumber"
                                type="number"
                            />

                            <BootstrapDatePicker
                                borderColour="border-success"
                                label="WSIB Insurance Date"
                                name="wsibInsuranceDate"
                                dateObj={wsibInsuranceDate}
                                onTimeChange={onWsibInsuranceDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.wsibInsuranceDate}
                            />

                            <BootstrapDatePicker
                                label="Police Check Expiry (*)"
                                name="policeCheck"
                                dateObj={policeCheck}
                                onTimeChange={onPoliceCheckDateChange}
                                datePickerClassName="form-control form-control-lg border"
                                divClassName="form-group p-0 col-md-7 mb-4"
                                error={errors.policeCheck}
                            />
                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.taxId}
                                label="HST #"
                                onChange={onTextChange}
                                value={taxId}
                                name="taxId"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-success"
                                error={errors.driversLicenseClass}
                                label="Drivers license class(es):"
                                onChange={onTextChange}
                                value={driversLicenseClass}
                                name="driversLicenseClass"
                                type="text"
                            />

                            <BootstrapMultipleSelect
                                borderColour="border-success"
                                label="Vehicle Types"
                                name="vehicleTypes"
                                defaultOptionLabel="Please select the vehicle types."
                                options={vehicleTypeOptions}
                                selectedOptions={vehicleTypes}
                                error={errors.vehicleTypes}
                                onMultiChange={onVehicleTypeMultiChange}
                                isLoading={isVehicleTypesLoading}
                            />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-user-friends"></i>&nbsp;Emergency Contact
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

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/associate/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default AdminAssociateAccountUpdateComponent;
