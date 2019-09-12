// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapInput } from "../../bootstrap/bootstrapInput";
import {
    DEACTIVATION_REASON_CHOICES
} from '../../../constants/api';


export default class ClientPermanentDeleteOperationComponent extends Component {
    render() {
        // Common
        const { clientId, errors, onTextChange, isLoading, onClick, client } = this.props;
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
                            <Link to={`/client/${client.id}/full`}><i className="fas fa-user"></i>&nbsp;{client && client.fullName}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-smile-beam"></i>&nbsp;PermanentDelete
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h1><i className="fas fa-skull-crossbones"></i>&nbsp;Permanent Delete Client</h1>
                            <p>Warning, you are about to permanently delete this customer from the system. This action cannot be undone!</p>
                            <p>To acknowledge that you understand this, please write in the client ID value of <strong>{client.id}</strong> in the textfield below and then click the delete button. Once the button has been clicked, there is no going back.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapInput
                                inputClassName="form-control"
                                borderColour="border-primary"
                                error={errors.clientId}
                                label="Client ID (*)"
                                onChange={onTextChange}
                                value={clientId}
                                name="clientId"
                                type="text"
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/client/${client.id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
