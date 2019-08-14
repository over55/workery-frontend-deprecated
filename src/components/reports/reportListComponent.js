import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../flashMessageComponent";


class ReportListComponent extends Component {
    render() {
        const { flashMessage } = this.props;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">

                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                   <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    <i className="fas fa-chart-bar"></i>&nbsp;Reports
                                </li>
                            </ol>
                        </nav>

                        <FlashMessageComponent object={flashMessage} />

                        <h1><i className="fas fa-chart-bar"></i>&nbsp;Reports</h1>
                        <div className="row">
                            <div className="col-md-12">

                                <div className="card-group row">
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-cash-register fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Due Service Fees</h3>
                                                <p className="card-text">List due service fees for associates.</p>
                                                <Link to="/report/1" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-address-card fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Jobs</h3>
                                                <p className="card-text">List jobs by Associate.</p>
                                                <Link to="/report/2" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-hand-holding-usd fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Service Fees by Skills</h3>
                                                <p className="card-text">List revenue by skill sets.</p>
                                                <Link to="/report/3" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-ban fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Cancelled Jobs</h3>
                                                <p className="card-text">List all cancelled jobs.</p>
                                                <Link to="/report/4" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-clock fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Insurance</h3>
                                                <p className="card-text">List insurance due dates.</p>
                                                <Link to="/report/5" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-shield-alt fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Police Check</h3>
                                                <p className="card-text">List police check due dates.</p>
                                                <Link to="/report/6" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-birthday-cake fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Birthdays</h3>
                                                <p className="card-text">List associates by birthdate.</p>
                                                <Link to="/report/7" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-hand-holding fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Skill Set</h3>
                                                <p className="card-text">List associate skill sets.</p>
                                                <Link to="/report/8" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-user-circle fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Client Addresses</h3>
                                                <p className="card-text">List client addresses.</p>
                                                <Link to="/report/9" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-wrench fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Jobs</h3>
                                                <p className="card-text">List all jobs.</p>
                                                <Link to="/report/10" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3">
                                        <div className="card box-shadow text-center mx-auto">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-building fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Jobs</h3>
                                                <p className="card-text">List only commercial jobs.</p>
                                                <Link to="/report/11" className="btn btn-success btn-lg">
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

export default ReportListComponent;
