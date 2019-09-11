import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { FlashMessageComponent } from "../../flashMessageComponent";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';

export default class ClientLiteRetrieveComponent extends Component {
    render() {
        const { id, client, flashMessage } = this.props;
        const isCompany = client && client.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/clients`}><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{client && client.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Client</h1>

                {client.state === 'inactive' &&
                    <div className="alert alert-danger" role="alert">
                        <strong><i className="fas fa-exclamation-triangle"></i>&nbsp;Warning</strong> - Client is deactivated in our system and cannot produce work orders to associates.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/client/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/client/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/client/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-5">
                                <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" />
                            </div>
                            <div className="col-sm-7 px-4 py-3">
                                {isCompany &&
                                    <h1>{client.organizationName}</h1>
                                }
                                <h3>
                                    {client && client.fullName}
                                </h3>
                                {client && client.address &&
                                    <p className="text-muted">
                                        <a href={client.addressUrl}>{client.address}&nbsp;<i className="fas fa-map-marker-alt"></i></a>
                                    </p>
                                }
                                {client && client.email &&
                                    <p>
                                        <a href={`mailto:${client.email}`}><i className="fas fa-envelope"></i>&nbsp;{client.email}</a>
                                    </p>
                                }
                                {client && client.telephone &&
                                    <p>
                                        <a href={`tel:${client.e164Telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{client.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {client &&
                                    <p>
                                        {client.tags && client.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                                <div className="col-sm-12 p-0">
                                    <p className="m-0"><strong>Ratings:</strong></p>
                                    <div className="star-rating" data-rating="4.5">
                                        <span className="far fa-star" data-rating="1"></span>
                                        <span className="far fa-star" data-rating="2"></span>
                                        <span className="far fa-star" data-rating="3"></span>
                                        <span className="far fa-star" data-rating="4"></span>
                                        <span className="far fa-star" data-rating="5"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        );
    }
}



class TagItem extends Component {
    render() {
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}
