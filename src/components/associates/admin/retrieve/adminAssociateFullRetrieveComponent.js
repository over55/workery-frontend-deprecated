// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BootstrapFiveStarRatingLabel } from "../../../bootstrap/bootstrapFiveStarRatingLabel";
import {
    UNASSIGNED_ASSOCIATE_TYPE_OF_ID,
    COMMERCIAL_ASSOCIATE_TYPE_OF_ID,
    RESIDENTIAL_ASSOCIATE_TYPE_OF_ID
} from '../../../../constants/api';


export default class AdminAssociateFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, associate, flashMessage, errors } = this.props;
        const { typeOf } = associate;
        const typeOfLabel = typeOf === RESIDENTIAL_ASSOCIATE_TYPE_OF_ID ? "Residential" : "Commercial";
        const isCommercial = typeOf === COMMERCIAL_ASSOCIATE_TYPE_OF_ID || typeOf === UNASSIGNED_ASSOCIATE_TYPE_OF_ID;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.fullName}</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/associate/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
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

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Details
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Type of Associate</th>
                                    <td>{typeOfLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        <Link to={`/associate/${id}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {isCommercial &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>
                                            {associate && associate.organizationName
                                                ? associate.organizationName
                                                : "-"
                                            }
                                        </td>
                                    </tr>
                                }
                                {isCommercial &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Type</th>
                                        <td>{associate && associate.organizationTypeOfLabel}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{associate && associate.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${associate && associate.e164Telephone}`}>{associate && associate.telephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Telephone</th>
                                    <td><a href={`tel:${associate && associate.e164OtherTelephone}`}>{associate && associate.otherTelephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${associate && associate.email}`}>{associate && associate.email}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {associate && associate.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {associate && associate.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/associate/${id}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={associate && associate.addressUrl} target="_blank">{associate && associate.fullAddress}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-circle"></i>&nbsp;Account
                                        <Link to={`/associate/${id}/update/account`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill sets</th>
                                    <td>
                                        {associate.prettySkillSets && associate.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Insurance Requirement(s)</th>
                                    <td>
                                        {associate && associate.prettyInsuranceRequirements && associate.prettyInsuranceRequirements.map(
                                            (ir) => <InsuranceRequirementItem ir={ir} key={`ir-${ir.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Hourly salary desired</th>
                                    <td>{associate && associate.hourlySalaryDesired}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Limit Special</th>
                                    <td>{associate && associate.limitSpecial}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Member Dues Expiry</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.duesDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Commercial insurance expiry date</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.commercialInsuranceExpiryDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Auto Insurance Expiry Date</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.autoInsuranceExpiryDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">WSIB #</th>
                                    <td>
                                        {associate && associate.wsibNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">WSIB Insurance Date</th>
                                    <td>
                                        {associate && associate && <Moment format="MM/DD/YYYY">{associate.wsibInsuranceDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Police check date</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.policeCheck}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">HST #</th>
                                    <td>{associate && associate.taxId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Drivers license class(es)</th>
                                    <td>{associate && associate.driversLicenseClass}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Vehicle(s)</th>
                                    <td>
                                        {associate && associate.prettyVehicleTypes && associate.prettyVehicleTypes.map(
                                            (vt) => <VehicleTypeItem vt={vt} key={`vt-${vt.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account Balance</th>
                                    <td>{associate && associate.balanceOwingAmount}</td>
                                </tr>
                                {associate && associate.serviceFee !== undefined && associate.serviceFee !== null &&
                                    <tr>
                                        <th scope="row" className="bg-light">Service Fee</th>
                                        <td>{associate && associate.serviceFeeLabel}</td>
                                    </tr>
                                }

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/associate/${id}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {isCommercial === false && <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {associate && associate.birthdate
                                            ?<Moment format="MM/DD/YYYY">{associate.birthdate}</Moment>
                                            :"-"
                                        }
                                    </td>
                                </tr>}
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{associate && associate.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{associate && associate.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {associate && associate.prettyTags && associate.prettyTags.map(
                                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY">{associate.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{associate.howHearPretty}</td>
                                </tr>
                                {associate &&
                                    <tr>
                                        <th scope="row" className="bg-light">Job Rating</th>
                                        <td><BootstrapFiveStarRatingLabel score={associate.score} /></td>
                                    </tr>
                                }



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account #</th>
                                    <td>{associate && associate.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                         {associate && <Moment format="MM/DD/YYYY hh:mm:ss a">{associate.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{associate && associate.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {associate && <Moment format="MM/DD/YYYY hh:mm:ss a">{associate.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{associate && associate.lastModifiedBy}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        <ul>
                                            <li>
                                                <Link className="btn btn-primary btn-lg" to={`/associate/${id}/operations`}>
                                                    View Account Balance&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="btn btn-orange btn-lg" to={`/associate/${id}/operations`}>
                                                    Change Password&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="btn btn-success btn-lg" to={`/associate/${id}/operations`}>
                                                    Upgrade&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="btn btn-warning btn-lg" to={`/associate/${id}/operations`}>
                                                    Archive&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link className="btn btn-danger btn-lg" to={`/associate/${id}/operations`}>
                                                    Unarchive&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                {/*<Link to={`/associate/${id}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link>*/}
                                <Link to={`/associates`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>

            </main>
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


class InsuranceRequirementItem extends Component {
    render() {
        const { id, text } = this.props.ir;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}


class VehicleTypeItem extends Component {
    render() {
        const { id, text } = this.props.vt;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}
