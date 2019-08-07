// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


class CardComponent extends Component {
    render() {
        const { partner, isLoading } = this.props;
        return (
            <div className="col-sm-3">
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/partner/${partner.id}`}>
                                <strong><i className="fas fa-home"></i>&nbsp;{partner.givenName}&nbsp;{partner.lastName}</strong>
                            </Link>
                        </h5>
                        <p className="card-text">
                            {partner.streetAddress}<br />
                            {partner.addressLocality}, {partner.addressRegion}<br />
                            {partner.telephone}
                        </p>
                        <Link to={`/partner/${partner.id}`} type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading}>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default class PartnerCreateStep2Component extends Component {
    render() {
        const { partners, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/partners"><i className="fas fa-user-circle"></i>&nbsp;Partners</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-plus"></i>&nbsp;Add Partner</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/partners/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Results</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Contact</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Address</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Metrics</span>
                        </div>
                        <div id="step-6" className="st-grey">
                            <span className="num">6.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Please select the partner.</h5>
                </div>

                <div className="card-group row">
                    {partners && partners.map(
                        (partner) => <CardComponent partner={partner} key={partner.id} isLoading={isLoading} />)
                    }
                </div>

                <div className="float-right">
                    {hasPrevious &&
                        <Link onClick={onPreviousClick}><i class="fas fa-arrow-circle-left"></i>&nbsp;Previous</Link>
                    }&nbsp;&nbsp;
                    {hasNext &&
                        <Link onClick={onNextClick}>Next&nbsp;<i class="fas fa-arrow-circle-right"></i></Link>
                    }
                </div>

                <div class="col-sm-12 mx-auto mt-3 mb-3 text-center">
            		<h5>Would you like to add a NEW partner?</h5>
                    <Link to="/partners/add/step-1">
            		    <button type="button" class="btn btn-lg btn-dark m-3">
                            <i class="fas fa-arrow-circle-left"></i>&nbsp;No - use search again
            		    </button>
                    </Link>
            		<Link to="/partners/add/step-3">
            		    <button type="button" class="btn btn-lg btn-success m-3">
            		       <i class="fas fa-user"></i>&nbsp;Yes - add a new partner
            		    </button>
                    </Link>
                </div>


            </main>
        );
    }
}
