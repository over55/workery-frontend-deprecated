// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTelephoneInput } from "../../bootstrap/bootstrapTelephoneInput";
import { BootstrapRadio } from "../../bootstrap/bootstrapRadio";
import { IS_OK_TO_EMAIL_CHOICES, IS_OK_TO_TEXT_CHOICES, COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    PRIMARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES, SECONDARY_PHONE_CONTACT_POINT_TYPE_OF_CHOICES,
    ORGANIZATION_TYPE_OF_CHOICES
} from "../../../constants/api";

class ClientCreateStep4Component extends Component {
    render() {
        const {
            typeOf, organizationName, organizationTypeOf, givenName, lastName, primaryPhone, primaryPhoneTypeOf, secondaryPhone, secondaryPhoneTypeOf, email, isOkToEmail, isOkToText, errors,
            onTextChange, onRadioChange, isLoading, onClick, onSelectChange,
        } = this.props;
        const isCommercial = typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/clients"><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Client
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/clients/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/clients/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/clients/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num">4.</span><span className="">Contact</span>
                            </strong>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Address</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-7" className="st-grey">
                            <span className="num">7.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-id-card"></i>&nbsp;Contact
                            </h2>
                            <p className="text-secondary font-italic">All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            {isCommercial &&
                                <div>
                                    <BootstrapInput
                                        inputClassName="form-control form-control-lg"
                                        borderColour="border-primary"
                                        error={errors.organizationName}
                                        label="Organization Name (*)"
                                        onChange={onTextChange}
                                        value={organizationName}
                                        name="organizationName"
                                        type="text"
                                    />

                                    <BootstrapSingleSelect
                                        borderColour="border-primary"
                                        label="Organization Type (*)"
                                        name="organizationTypeOf"
                                        defaultOptionLabel="Please select a telephone type."
                                        options={ORGANIZATION_TYPE_OF_CHOICES}
                                        value={organizationTypeOf}
                                        error={errors.organizationTypeOf}
                                        onSelectChange={onSelectChange}
                                    />
                                </div>
                            }

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
                                borderColour="border-success"
                                error={errors.email}
                                label="Email"
                                onChange={onTextChange}
                                value={email}
                                name="email"
                                type="text"
                                helpText="This field is optional only for customers."
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
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    Address&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </button>
                                <Link to="/clients/add/step-3" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default ClientCreateStep4Component;
