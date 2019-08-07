// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";


export default class OrderCreateStep5Component extends Component {
    render() {
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Order
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/orders/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/orders/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num">3.</span><span className="">Job Type</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Skills and Description</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Comments</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <h2>
                    <i className="fas fa-sitemap"></i>&nbsp;Select Order Type
                </h2>

                <div className="card-group row">
                    <div className="col-sm-6">
                        <div className="card box-shadow text-center mx-auto">
                            <div className="card-custom-top-2">
                                <i className="fas fa-home fa-3x"></i>
                            </div>
                            <div className="card-body">
                                <h3 className="card-title">Residential / Community Cares</h3>
                                <p className="card-text">Add a residential or community cares order</p>
                                <Link to="/orders/add/step-6" className="btn btn-primary btn-lg">
                                    Select&nbsp;<i className="fas fa-arrow-circle-right"></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="form-group">

                    <Link to="/orders/add/step-4" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                        <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                    </Link>
                </div>

            </main>
        );
    }
}
