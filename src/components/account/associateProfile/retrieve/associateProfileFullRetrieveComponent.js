// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../../constants/api';
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { BootstrapFiveStarRatingLabel } from "../../../bootstrap/bootstrapFiveStarRatingLabel";


export default class AssociateProfileFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, user, flashMessage, errors } = this.props;
        const { typeOf } = user;
        const typeOfLabel = typeOf === 2 ? "Residential" : "Commercial";
        const isCommercial = typeOf === 3;
        return (
            <main id="main" role="main">
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
                        <div id="step-1" className="st-grey">
                            <Link to={`/profile/associate/lite`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
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
                                        <Link to={`/profile/associate/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                {isCommercial &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{user.organizationName}</td>
                                    </tr>
                                }
                                {isCommercial &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Type</th>
                                        <td>{user.organizationTypeOfLabel}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{user.fullName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${user.e164Telephone}`}>{user.telephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Telephone</th>
                                    <td><a href={`tel:${user.e164OtherTelephone}`}>{user.otherTelephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {user.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {user.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        <Link to={`/profile/associate/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={user.addressUrl} target="_blank">{user.fullAddress}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-circle"></i>&nbsp;Account
                                        <Link to={`/profile/associate/update/account`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Skill sets</th>
                                    <td>
                                        {user.prettySkillSets && user.prettySkillSets.map(
                                            (skillSet) => <SkillSetItem skillSet={skillSet} key={`skillset-${skillSet.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Insurance Requirement(s)</th>
                                    <td>
                                        {user.prettyInsuranceRequirements && user.prettyInsuranceRequirements.map(
                                            (ir) => <InsuranceRequirementItem ir={ir} key={`ir-${ir.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Hourly salary desired</th>
                                    <td>{user.hourlySalaryDesired}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Limit Special</th>
                                    <td>{user.limitSpecial}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Member Dues Expiry</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.duesDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Commercial insurance expiry date</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.commercialInsuranceExpiryDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Auto Insurance Expiry Date</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.autoInsuranceExpiryDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">WSIB #</th>
                                    <td>
                                        {user.wsibNumber}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">WSIB Insurance Date</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.wsibInsuranceDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Police check date</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.policeCheck}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">HST #</th>
                                    <td>{user.taxId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Drivers license class(es)</th>
                                    <td>{user.driversLicenseClass}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Vehicle(s)</th>
                                    <td>
                                        {user.prettyVehicleTypes && user.prettyVehicleTypes.map(
                                            (vt) => <VehicleTypeItem vt={vt} key={`vt-${vt.id}`} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account Balance</th>
                                    <td>{user.balanceOwingAmount}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        <Link to={`/profile/associate/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                            <i className="fas fa-edit"></i>&nbsp;
                                        </Link>
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {user && user.birthdate && <Moment format="MM/DD/YYYY">{user.birthdate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{user.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{user.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {user.prettyTags && user.prettyTags.map(
                                            (tag) => <TagItem tag={tag} key={`tags-${tag.id}`}/>)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY">{user.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{user.howHearPretty}</td>
                                </tr>
                                {user &&
                                    <tr>
                                        <th scope="row" className="bg-light">Job Rating</th>
                                        <td><BootstrapFiveStarRatingLabel score={user.score} /></td>
                                    </tr>
                                }



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account #</th>
                                    <td>{user.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                         {user && <Moment format="MM/DD/YYYY hh:mm:ss a">{user.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{user.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {user && <Moment format="MM/DD/YYYY hh:mm:ss a">{user.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{user.lastModifiedBy}</td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <Link to={`/dashboard`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
