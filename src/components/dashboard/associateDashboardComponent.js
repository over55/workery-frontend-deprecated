import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../flashMessageComponent";


export default class AssociateDashboardComponent extends Component {
    render() {
        const { dashboard } = this.props;

        // The following code will generate a balance warning banner if the
        // associate has a balance besides zero in the sytem.
        let flashMessage;
        const balanceOwingAmount = parseFloat(dashboard.balanceOwingAmount);
        if (balanceOwingAmount > 0) {
            flashMessage = {
                typeOf: "warning", text: "Your account balance is $"+dashboard.balanceOwingAmount+"."
            };
        } else if (balanceOwingAmount < 0) {
            flashMessage = {
                typeOf: "success", text: "Your account balance is $"+dashboard.balanceOwingAmount+"."
            };
        }

        // Render the associate dashboard.
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>

                        <div className="row">
                            <div className="col-md-12">
                                {flashMessage &&
                                    <FlashMessageComponent object={flashMessage} />
                                }
                                <div className="card-group row">
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-wrench fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Jobs</h3>
                                                <p className="card-text">View My Jobs.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/jobs" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-credit-card fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Financials</h3>
                                                <p className="card-text">Update My Financials/Invoices.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/company-financials" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-tasks fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Tasks</h3>
                                                <p className="card-text">View My Tasks.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/tasks" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-user-circle fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Profile</h3>
                                                <p className="card-text">Metrics and Account should be read only. Also, can we add a section below (on in) contact info with Emergency Contacts.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/profile/associate/lite" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        );
    }
}
