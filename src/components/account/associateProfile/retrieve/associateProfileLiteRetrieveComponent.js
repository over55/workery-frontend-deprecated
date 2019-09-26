import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BootstrapFiveStarRatingLabel } from "../../../bootstrap/bootstrapFiveStarRatingLabel";


export default class AssociateProfileLiteRetrieveComponent extends Component {
    render() {
        const { id, user, flashMessage } = this.props;
        const { typeOf } = user;
        const isCommercial = typeOf === 3;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user-circle"></i>&nbsp;Profile
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user-circle"></i>&nbsp;Profile</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </strong>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/profile/associate/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        {/*
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
                        <div id="step-6" className="st-grey">
                            <Link to={`/associate/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        */}
                    </div>
                </div>

                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-5">
                                <Link to={`/profile/associate/${id}/avatar`}>
                                    {user && user.avatarUrl !== undefined && user.avatarUrl !== null
                                        ? <img src={user.avatarUrl} className="img-fluid rounded" alt="Profile" id={`user-avatar-${id}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>
                            <div className="col-sm-7 px-4 py-3">
                                {isCommercial &&
                                    <h1>{user.organizationName}</h1>
                                }
                                <h3>{user && user.fullName}</h3>
                                {user && user.address &&
                                    <p className="text-muted">
                                        <a href={user.addressUrl}><i className="fas fa-map-marker-alt"></i>&nbsp;{user.address}</a>
                                    </p>
                                }
                                {user && user.email &&
                                    <p>
                                        <a href={`mailto:${user.email}`}><i className="fas fa-envelope"></i>&nbsp;{user.email}</a>
                                    </p>
                                }
                                {user && user.telephone &&
                                    <p>
                                        <a href={`tel:${user.e164Telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{user.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Skill sets:</strong></p>
                                {user &&
                                    <p>
                                        {user.prettySkillSets && user.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {user &&
                                    <p>
                                        {user.tags && user.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </p>
                                }
                                <div className="col-sm-12 p-0">
                                    <p className="m-0"><strong>Ratings:</strong></p>
                                    {user &&
                                        <BootstrapFiveStarRatingLabel score={user.score} />
                                    }
                                </div>

                                <p class="m-0"><strong>Notes:</strong></p>
                                <p class="mb-2">
                                    <ul>
                                    {user.commercialInsuranceExpiryDate &&
                                        <li>Commercial Insurance Expiry: <Moment format="MM/DD/YYYY">{user.commercialInsuranceExpiryDate}</Moment></li>
                                    }
                                    {user.wsibNumber &&
                                        <li>WSIB # {user.wsibNumber}</li>
                                    }
                                    {user.wsibInsuranceDate &&
                                        <li>WSIB Expiry: <Moment format="MM/DD/YYYY">{user.wsibInsuranceDate}</Moment></li>
                                    }
                                    {user.latestCompletedAndPaidOrder && user.latestCompletedAndPaidOrder.paidAt &&
                                        <li>
                                        Last service fee paid on <Moment format="MM/DD/YYYY">{user.latestCompletedAndPaidOrder.paidAt}</Moment> in work order #<Link to={`/order/${user.latestCompletedAndPaidOrder.id}`}>{user.latestCompletedAndPaidOrder.id}&nbsp;<i className="fas fa-external-link-alt"></i></Link>.
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
