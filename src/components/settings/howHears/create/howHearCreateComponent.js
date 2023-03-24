// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
// import { BootstrapCheckbox } from "../bootstrap/bootstrapCheckbox";
import { BootstrapInput } from "../../../bootstrap/bootstrapInput";
import { BootstrapRadio } from "../../../bootstrap/bootstrapRadio";


function getBooleanOptions(selectName) {
    return [
        {
            id: 'howHear-'+selectName+'-1-choice',
            selectName: selectName,
            value: 1,
            label: "Yes"
        },{
            id: 'howHear-'+selectName+'-0-choice',
            selectName: selectName,
            value: 0,
            label: "No"
        }
    ];
}

class HowHearCreateComponent extends Component {
    render() {
        const {
            text, sortNumber, onTextChange,
            isForAssociate, isForCustomer, isForStaff, onRadioChange,
            errors, isLoading, onClick
        } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/how-hears"><i className="fas fa-tty"></i>&nbsp;How did you hear?</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1>Create New Option</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.text}
                                label="Text (*)"
                                onChange={onTextChange}
                                value={text}
                                name="text"
                                type="text"
                            />

                            <BootstrapInput
                                inputClassName="form-control form-control-lg"
                                borderColour="border-primary"
                                error={errors.sortNumber}
                                label="Sort # (*)"
                                onChange={onTextChange}
                                value={sortNumber}
                                name="sortNumber"
                                type="number"
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.isForAssociate}
                                label="Is for associate?"
                                name="isForAssociate"
                                onChange={onRadioChange}
                                selectedValue={isForAssociate}
                                options={getBooleanOptions("isForAssociate")}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.isForCustomer}
                                label="Is for customer?"
                                name="isForCustomer"
                                onChange={onRadioChange}
                                selectedValue={isForCustomer}
                                options={getBooleanOptions("isForCustomer")}
                            />

                            <BootstrapRadio
                                inputClassName="form-check-input form-check-input-lg"
                                borderColour="border-success"
                                error={errors.isForStaff}
                                label="Is for staff?"
                                name="isForStaff"
                                onChange={onRadioChange}
                                selectedValue={isForStaff}
                                options={getBooleanOptions("isForStaff")}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/settings/how-hears" className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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

export default HowHearCreateComponent;
