import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapAlert } from "../../../bootstrap/bootstrapAlert";
import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BootstrapFiveStarRatingLabel } from "../../../bootstrap/bootstrapFiveStarRatingLabel";
import AwayLogAlertComponent from "../awayLogAlertComponent";


export default class AdminAssociateLiteRetrieveComponent extends Component {
    render() {
        const { id, isLoading, associate, flashMessage } = this.props;
        const { typeOf } = associate;
        const isCommercial = typeOf === 3 || typeOf === 1; // COMMERCIAL_ASSOCIATE_TYPE_OF_ID or UNASSIGNED_ASSOCIATE_TYPE_OF_ID
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.name}
                        </li>
                    </ol>
                </nav>

                <AwayLogAlertComponent associate={associate} />

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.name}</h1>

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
                                <span className="num"><i className="fas fa-id-card-alt"></i>&nbsp;</span><span className="">Activity</span>
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
                        <div id="step-7" className="st-grey">
                            <Link to={`/associate/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row mt-0 pt-3 mb-4 pb-2">
                    <div className="col-md-9 mx-auto rounded bg-light border p-2">
                        <div className="row">
                            <div className="col-sm-4">
                                <Link to={`/associate/${id}/avatar`}>
                                    {associate && associate.avatarFileUrl !== undefined && associate.avatarFileUrl !== null
                                        ? <img src={associate.avatarFileUrl} className="img-fluid rounded" alt="Profile" id={`associate-avatar-${id}`} />
                                        : <img src="/img/placeholder.png" className="img-fluid rounded" alt="Profile" id={`avatar-placeholder`}/>
                                    }
                                    <p><i className="fas fa-edit"></i>Click here to change photo</p>
                                </Link>
                            </div>
                            <div className="col-sm-8 px-4 py-3">
                                {isCommercial &&
                                    <h1>
                                        {associate && associate.organizationName}
                                    </h1>
                                }
                                <h3>{associate && associate.name}</h3>
                                {associate && associate.fullAddressWithPostalCode &&
                                    <p className="text-muted">
                                        <a href={associate && associate.fullAddressUrl}><i className="fas fa-map-marker-alt"></i>&nbsp;{associate && associate.fullAddressWithPostalCode}</a>
                                    </p>
                                }
                                {associate && associate.email &&
                                    <p>
                                        <a href={`mailto:${associate && associate.email}`}><i className="fas fa-envelope"></i>&nbsp;{associate && associate.email}</a>
                                    </p>
                                }
                                {associate && associate.telephone &&
                                    <p>
                                        <a href={`tel:${associate && associate.telephone}`}>
                                            <i className="fas fa-phone-square"></i>&nbsp;{associate && associate.telephone}
                                        </a>
                                    </p>
                                }
                                <p className="m-0"><strong>Skill sets:</strong></p>
                                {associate &&
                                    <p>
                                        {associate.skillsets && associate.skillsets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={skillSet.id} />)
                                        }
                                    </p>
                                }
                                <p className="m-0"><strong>Tags:</strong></p>
                                {associate &&
                                    <p>
                                        {associate && associate.tags && associate.tags.map(
                                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
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
                                    {associate && associate.commercialInsuranceExpiryDate &&
                                        <li>Commercial Insurance Expiry: <Moment format="MM/DD/YYYY">{associate.commercialInsuranceExpiryDate}</Moment></li>
                                    }
                                    {associate && associate.wsibNumber &&
                                        <li>WSIB # {associate.wsibNumber}</li>
                                    }
                                    {associate && associate.wsibInsuranceDate &&
                                        <li>WSIB Expiry: <Moment format="MM/DD/YYYY">{associate.wsibInsuranceDate}</Moment></li>
                                    }
                                    {associate && associate.latestCompletedAndPaidOrder && associate.latestCompletedAndPaidOrder.paidAt &&
                                        <li>
                                        Last service fee paid on <Moment format="MM/DD/YYYY">{associate.latestCompletedAndPaidOrder.paidAt}</Moment> in work order #<Link to={`/order/${associate.latestCompletedAndPaidOrder.id}`}>{associate.latestCompletedAndPaidOrder.id}&nbsp;<i className="fas fa-external-link-alt"></i></Link>.
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
        const { text, id } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
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
