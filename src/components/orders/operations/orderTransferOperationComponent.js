// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


class OrderTransferOperationComponent extends Component {
    render() {
        const {
            associate, associateOptions, isAssociatesLoading,
            client, clientOptions, isClientLoading,
            reason, errors, id, order, isLoading, onTextChange, onSelectChange, onClick } = this.props;
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
                            <Link to={`/order/${id}/full`}><i className="fas fa-wrench"></i>&nbsp;Order # {id}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-exchange-alt"></i>&nbsp;Transfer
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-exchange-alt"></i>&nbsp;Transfer Order</h1>
                            <p>You are about to <strong>transfer the ownership</strong> of this job for the <strong>associate</strong> or the <strong>client</strong>.</p>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Associate (*)"
                                name="associate"
                                defaultOptionLabel="Please select the associate."
                                options={associateOptions}
                                value={associate}
                                error={errors.associate}
                                onSelectChange={onSelectChange}
                                isLoading={isAssociatesLoading}
                            />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Client (*)"
                                name="client"
                                defaultOptionLabel="Please select the client."
                                options={clientOptions}
                                value={client}
                                error={errors.client}
                                onSelectChange={onSelectChange}
                                isLoading={isClientLoading}
                            />

                            <BootstrapTextarea
                                name="reason"
                                borderColour="border-primary"
                                label="Describe the reason (*)"
                                placeholder="Describe here."
                                rows="5"
                                value={reason}
                                helpText="Maximum 1,000 characters."
                                onChange={onTextChange}
                                error={errors.reason}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/order/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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

export default OrderTransferOperationComponent;