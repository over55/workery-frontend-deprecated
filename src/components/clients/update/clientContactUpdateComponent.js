// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { BootstrapCountrySelect } from '../../bootstrap/bootstrapCountrySelect'
import { BootstrapRegionSelect } from '../../bootstrap/bootstrapRegionSelect'
import { BootstrapDatePicker } from '../../bootstrap/bootstrapDatePicker';
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapMultipleSelect } from "../../bootstrap/bootstrapMultipleSelect";
import {
    IS_OK_TO_EMAIL_CHOICES,
    IS_OK_TO_TEXT_CHOICES,
    GENDER_RADIO_CHOICES
} from "../../../constants/api";


export default class ClientContactUpdateComponent extends Component {
    render() {
        const {
            // STEP 3
            typeOf,

            // STEP 4 - REZ
            givenName, lastName, telephone, otherTelephone, email, isOkToText, isOkToEmail,

            // EVERYTHING ELSE
            id, errors, isLoading, onClick, onTextChange, onRadioChange, onBillingCountryChange, onBillingRegionChange,
            onMultiChange, onDateOfBirthChange, onSelectChange, onJoinDateChange,
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
                            <Link to={`/clients`}><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/client/${id}/full`}><i className="fas fa-user"></i>&nbsp;{givenName} {lastName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Update Residential Client</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            { /* -------------------------------------------------------------------------------------- */}
                            <h4><i className="fas fa-id-card"></i>&nbsp;Personal Information</h4>
                            { /* -------------------------------------------------------------------------------------- */}

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.givenName}
                                label="Given Name (*)"
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
                                error={errors.telephone}
                                label="Telephone (*)"
                                onChange={onTextChange}
                                value={telephone}
                                name="telephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapTelephoneInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-success"
                                error={errors.otherTelephone}
                                label="Other Telephone"
                                onChange={onTextChange}
                                value={otherTelephone}
                                name="otherTelephone"
                                type="text"
                                placeholder="+1 (xxx) xxx-xxxx"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.email}
                                label="Email (*)"
                                onChange={onTextChange}
                                value={email}
                                name="email"
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
                                helpText='Selecting "yes" will result in client getting emails from our system.'
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
                                helpText='Selecting "yes" will result in client getting text-messages on their phone from our system.'
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/client/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
