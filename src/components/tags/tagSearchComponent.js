// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../bootstrap/bootstrapAlert";
import { BootstrapMultipleSelect } from "../bootstrap/bootstrapMultipleSelect";


class TagSearchComponent extends Component {
    render() {
        const {
            errors, isLoading, onClick,
            tags, tagOptions, onTagMultiChange, isTagLoading,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tags"></i>&nbsp;Tags
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-search"></i>&nbsp;Search Tags
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-tags"></i>&nbsp;Tags
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapMultipleSelect
                                borderColour="border-primary"
                                label="Tag (*)"
                                name="tags"
                                defaultOptionLabel="Please select the tags."
                                options={tagOptions}
                                selectedOptions={tags}
                                error={errors.tags}
                                onMultiChange={onTagMultiChange}
                                isLoading={isTagLoading}
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

export default TagSearchComponent;
