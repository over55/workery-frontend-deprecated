// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


class OrderTransferOperationComponent extends Component {
    render() {
        const {
            associate, associateOptions, isAssociatesLoading,
            client, clientOptions, isClientLoading,
            reason, errors, id, order, isLoading, onTextChange, onSelectChange } = this.props;
        return (
            <main id="main" role="main">
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

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default OrderTransferOperationComponent;
