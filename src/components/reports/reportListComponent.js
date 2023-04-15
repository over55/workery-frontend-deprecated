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
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-cash-register fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Due Service Fees</h3>
                                                <p className="card-text">List due service fees for associates.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/1" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-address-card fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Active Associate Jobs</h3>
                                                <p className="card-text">List jobs by Associate whom are active.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/2" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-user-alt-slash fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Inactive Associate Jobs</h3>
                                                <p className="card-text">List jobs by Associate whom are inactive.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/18" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>


                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-hand-holding-usd fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Service Fees by Skills</h3>
                                                <p className="card-text">List revenue by skill sets.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/3" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-ban fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Cancelled Jobs</h3>
                                                <p className="card-text">List all cancelled jobs.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/4" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-clock fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Insurance</h3>
                                                <p className="card-text">List insurance due dates.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/5" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>
                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-shield-alt fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Police Check</h3>
                                                <p className="card-text">List police check due dates.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/6" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-birthday-cake fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Birthdays</h3>
                                                <p className="card-text">List associates by birthdate.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/7" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-hand-holding fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Skill Set</h3>
                                                <p className="card-text">List associate skill sets.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/8" className="btn btn-success btn-lg">
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
                                                <h3 className="card-title">Client Addresses</h3>
                                                <p className="card-text">List client addresses.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/9" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-wrench fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Jobs</h3>
                                                <p className="card-text">List all jobs.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/10" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-building fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Commercial Jobs</h3>
                                                <p className="card-text">List only commercial jobs.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/11" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-toolbox fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Skill Sets</h3>
                                                <p className="card-text">List of all skill sets.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/12" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-random fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Leads by Skill</h3>
                                                <p className="card-text">List of jobs by skill set.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/13" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-handshake fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Ongoing Jobs</h3>
                                                <p className="card-text">List of ongoing jobs.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/14" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-calendar-times fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Expiry Dates</h3>
                                                <p className="card-text">List upcoming expiry dates.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/15" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-globe fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">How Users Find Us (long)</h3>
                                                <p className="card-text">List how users discovered us.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/16" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-globe fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">How Users Find Us (short)</h3>
                                                <p className="card-text">List how users discovered us.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/17" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-tags fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Job Tags by Assignment Dates</h3>
                                                <p className="card-text">List jobs by tags using assignment dates as a filter.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/19" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-tags fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Job Tags by Completion Dates</h3>
                                                <p className="card-text">List jobs by tags using complation dates as a filter.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/22" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-search-dollar fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Payments</h3>
                                                <p className="card-text">List all payments.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/20" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-mail-bulk fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Marketing Emails</h3>
                                                <p className="card-text">List all emails of consenting customer's email addresses.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/21" className="btn btn-success btn-lg">
                                                    Go&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                                </Link>
											</div>
                                        </div>
                                    </div>

                                    <div className="col-sm-3 mb-4">
                                        <div className="card box-shadow text-center mx-auto h-100">
                                            <div className="card-custom-top-2">
                                                <i className="fas fa-mail-bulk fa-3x"></i>
                                            </div>
                                            <div className="card-body">
                                                <h3 className="card-title">Associate Emails</h3>
                                                <p className="card-text">List all emails of consenting associate's email addresses.</p>
                                            </div>
											<div className="card-footer bg-transparent border-0">
												<Link to="/report/23" className="btn btn-success btn-lg">
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
