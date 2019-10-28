// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import {
    IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES
} from "../../../constants/api";


class StaffContactUpdateComponent extends Component {
    render() {
        const {
            id, givenName, lastName, primaryPhone, primaryPhoneTypeOf, secondaryPhone, secondaryPhoneTypeOf, workEmail, personalEmail, errors,
            onTextChange, onRadioChange, isLoading, onClick, onSelectChange
        } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff/${id}/full`}><i className="fas fa-user"></i>&nbsp;{givenName} {lastName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Edit (Contact)
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Staff (Contact)
                </h1>



                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-tty"></i>&nbsp;Contact
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

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

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Primary Telephone type (*)"
                                name="primaryPhoneTypeOf"
                                defaultOptionLabel="Please select a telephone type."
                                options={PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES}
                                value={primaryPhoneTypeOf}
                                error={errors.primaryPhoneTypeOf}
                                onSelectChange={onSelectChange}
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

                            <BootstrapSingleSelect
                                borderColour="border-success"
                                label="Secondary Telephone type"
                                name="secondaryPhoneTypeOf"
                                defaultOptionLabel="Please select a telephone type."
                                options={SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES}
                                value={secondaryPhoneTypeOf}
                                error={errors.secondaryPhoneTypeOf}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.workEmail}
                                label="Work Email (*)"
                                onChange={onTextChange}
                                value={workEmail}
                                name="workEmail"
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

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/staff/${id}/full`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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

export default StaffContactUpdateComponent;
