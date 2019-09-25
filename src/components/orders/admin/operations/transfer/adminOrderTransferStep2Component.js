import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../../../constants/api';


export default class AdminOrderTransferStep2Component extends Component {
    render() {
        const {
            clients, isLoading, errors, hasNext, onNextClick, hasPrevious, onPreviousClick, onClientClick, orderDetail
        } = this.props;
        const hasNoClients = clients.length <= 0;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/clients`}><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/clients/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-search"></i>&nbsp;Clients Search</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${orderDetail.id}/transfer-step-1`}>
                                <span className="num">1.</span><span className="">Search Clients</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num">2.</span><span className="">Pick Client</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <span className="num">3.</span><span className="">Search Associates</span>
                        </div>
                        <div id="step-4" className="st-grey">
                            <span className="num">4.</span><span className="">Pick Associate</span>
                        </div>
                        <div id="step-5" className="st-grey">
                            <span className="num">5.</span><span className="">Review</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>

                        {hasNoClients
                            ?<div className="jumbotron">
                                <h1 className="display-4">No Results Found</h1>
                                <p className="lead">It appears nothing was found for your search results. Please try again by clicking below.</p>

                                <p className="lead">
                                    <Link className="btn btn-primary btn-lg" to="/clients/search">Try Again&nbsp;<i class="fas fa-chevron-right"></i></Link>
                                </p>
                            </div>
                            :<div className="card-group row">
                                {clients && clients.map(
                                    (client) => <CardComponent client={client} key={client.id} isLoading={isLoading} onClientClick={onClientClick} />)
                                }
                            </div>
                        }

                        <div className="float-right">
                            {hasPrevious &&
                                <Link onClick={onPreviousClick}><i class="fas fa-arrow-circle-left"></i>&nbsp;Previous</Link>
                            }&nbsp;&nbsp;
                            {hasNext &&
                                <Link onClick={onNextClick}>Next&nbsp;<i class="fas fa-arrow-circle-right"></i></Link>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}



class CardComponent extends Component {
    render() {
        const { client, isLoading, onClientClick } = this.props;
        return (
            <div className="col-sm-3">
                <div className="card bg-light">
                    <div className="card-body">
                        <h5 className="card-title">
                            <Link to={`/client/${client.id}`}>
                                <strong>
                                    <i className="fas fa-home"></i>&nbsp;{client.givenName}&nbsp;{client.lastName}
                                    {client.state === 'inactive' && <div>(<i className="fas fa-frown"></i>&nbsp;Deactived)</div>}
                                </strong>
                            </Link>
                        </h5>
                        <p className="card-text">
                            {client.streetAddress}<br />
                            {client.addressLocality}, {client.addressRegion}<br />
                            {client.telephone}
                        </p>
                        <button type="button" className="btn btn-primary btn-lg btn-block" disabled={isLoading} onClick={ (event)=>{ onClientClick(event, client.id, client.givenName, client.lastName) } }>
                            Select&nbsp;<i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
