import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../flashMessageComponent";
import { BootstrapFiveStarRatingLabel } from "../../bootstrap/bootstrapFiveStarRatingLabel";


export default class AssociateLiteRetrieveComponent extends Component {
    render() {
        const { id, associate, flashMessage } = this.props;
        const { typeOf } = associate;
        const isCommercial = typeOf === 3;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Associate</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/associate/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/associate/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-card-alt"></i>&nbsp;</span><span className="">Activity Sheets</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/associate/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/associate/${id}/comments`}>
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
                                {isCommercial &&
                                    <h1>{associate.organizationName}</h1>
                                }
                                <h3>{associate && associate.fullName}</h3>
                                {associate && associate.address &&
                                    <p className="text-muted">
                                        <a href={associate.addressUrl}>{associate.address}&nbsp;<i className="fas fa-map-marker-alt"></i></a>
                                    </p>
                                }
                                {associate && associate.email &&
                                    <p>
                                        <a href={`mailto:${associate.email}`}><i className="fas fa-envelope"></i>&nbsp;{associate.email}</a>
                                    </p>
                                }
                                {associate && associate.telephone &&
                                    <p>
                                        <a href={`tel:${associate.e164Telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{associate.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Skill sets:</strong></p>
                                {associate &&
                                    <p>
                                        {associate.prettySkillSets && associate.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {associate &&
                                    <p>
                                        {associate.tags && associate.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                                <div className="col-sm-12 p-0">
                                    <p className="m-0"><strong>Ratings:</strong></p>
                                    {associate &&
                                        <BootstrapFiveStarRatingLabel score={associate.score} />
                                    }
                                </div>

                                <p class="m-0"><strong>Notes:</strong></p>
                                <p class="mb-2">
                                    <ul>
                                    {associate.commercialInsuranceExpiryDate &&
                                        <li>Commercial Insurance Expiry: <Moment format="YYYY/MM/DD">{associate.commercialInsuranceExpiryDate}</Moment></li>
                                    }
                                    {associate.wsibNumber &&
                                        <li>WSIB # {associate.wsibNumber}</li>
                                    }
                                    {associate.wsibInsuranceDate &&
                                        <li>WSIB Expiry: <Moment format="YYYY/MM/DD">{associate.wsibInsuranceDate}</Moment></li>
                                    }
                                    {associate.latestCompletedAndPaidOrder && associate.latestCompletedAndPaidOrder.paidAt &&
                                        <li>
                                        Last service fee paid on <Moment format="YYYY/MM/DD">{associate.latestCompletedAndPaidOrder.paidAt}</Moment> in work order #<Link to={`/order/${associate.latestCompletedAndPaidOrder.id}`}>{associate.latestCompletedAndPaidOrder.id}&nbsp;<i className="fas fa-external-link-alt"></i></Link>.
                                        </li>
                                    }
                                    </ul>
                                </p>
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


class SkillSetItem extends Component {
    render() {
        const { subCategory, value } = this.props.skillSet;
        return (
            <span className="badge badge-info badge-lg" value={value}>{subCategory}</span>
        );
    };
}
