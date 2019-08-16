// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapMultipleSelect } from "../bootstrap/bootstrapMultipleSelect";


class SkillsetSearchComponent extends Component {
    render() {
        const {
            errors, isLoading, onClick,
            skillSets, skillSetOptions, onSkillSetMultiChange,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-toolbox"></i>&nbsp;Skill Sets
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Associate
                </h1>



                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-crown"></i>&nbsp;Account
                            </h2>
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
                            />

                            <div className="form-group">
                                <button className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-search"></i>&nbsp;Search
                                </button>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default SkillsetSearchComponent;
