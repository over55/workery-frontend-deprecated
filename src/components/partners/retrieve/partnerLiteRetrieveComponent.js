import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class PartnerLiteRetrieveComponent extends Component {
    render() {
        const { id, isLoading, partner, flashMessage } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/partners`}><i className="fas fa-handshake"></i>&nbsp;Partners</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-handshake"></i>&nbsp;{partner && partner.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-handshake"></i>&nbsp;{partner && partner.name}</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/partner/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/partner/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/partner/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-5">
                                <Link to={`/partner/${id}/avatar`}>
                                    {partner && partner.avatarUrl !== undefined && partner.avatarUrl !== null
                                        ? <img src={partner.avatarUrl} className="img-fluid rounded" alt="Profile" id={`partner-avatar-${id}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>
                            <div className="col-sm-7 px-4 py-3">
                                <h3>{partner && partner.name}</h3>
                                {partner && partner.address &&
                                    <p className="text-muted">
                                        <a href={partner.addressUrl}>{partner.address}&nbsp;<i className="fas fa-map-marker-alt"></i></a>
                                    </p>
                                }
                                {partner && partner.email &&
                                    <p>
                                        <a href={`mailto:${partner.email}`}><i className="fas fa-envelope"></i>&nbsp;{partner.email}</a>
                                    </p>
                                }
                                {partner && partner.telephone &&
                                    <p>
                                        <a href={`tel:${partner.e164Telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{partner.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {partner &&
                                    <p>
                                        {partner.tags && partner.tags.map(
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
