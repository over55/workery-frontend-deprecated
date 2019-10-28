// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";


class AdminOrderTransferStep5Component extends Component {
    render() {
        const {
            clientGivenName, clientLastName, associateGivenName, associateLastName, onSubmitClick,
            associate, client, reason, errors, id, order, isLoading, onTextChange, onSelectChange, onClick, orderDetail
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
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/order/${id}/full`}><i className="fas fa-wrench"></i>&nbsp;Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-exchange-alt"></i>&nbsp;Transfer
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Associates Search</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${orderDetail.id}/transfer-step-1`}>
                                <span className="num">1.</span><span className="">Search Clients</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/order/${orderDetail.id}/transfer-step-2`}>
                                <span className="num">2.</span><span className="">Pick Client</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/order/${orderDetail.id}/transfer-step-3`}>
                                <span className="num">3.</span><span className="">Search Associates</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/order/${orderDetail.id}/transfer-step-4`}>
                                <span className="num">4.</span><span className="">Pick Associate</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num">5.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before transforing the order:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Order
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Order #</th>
                                    <td>{id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-circle"></i>&nbsp;Client
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Full-Name</th>
                                    <td>{clientGivenName}&nbsp;{clientLastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Client ID</th>
                                    <td>{client && client.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-crown"></i>&nbsp;Associate
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Full-Name</th>
                                    <td>{associateGivenName}&nbsp;{associateLastName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate ID</th>
                                    <td>{associate && associate.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="form-group">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onSubmitClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Save
                            </button>
                            <Link to={`/order/${orderDetail.id}/transfer-step-4`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>
                    </div>
                </div>

            </main>
        );
    }
}

export default AdminOrderTransferStep5Component;
