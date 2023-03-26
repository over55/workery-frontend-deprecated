// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
    EXECUTIVE_ROLE_ID
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class StaffFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, staff, flashMessage, errors, onStaffClick, user, onAddJobClick } = this.props;
        const { typeOf } = staff;
        const typeOfLabel = typeOf === 2 ? "Residential" : "Commercial"
        const isActiveState = staff.state === 1;
        const isRezStaff = typeOf === 2;
        const isCompany = staff && staff.typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;
        const canDeleteStaff = user.roleId === EXECUTIVE_ROLE_ID;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.name}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{staff && staff.name}</h1>

                {staff.state === 0 &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This staff is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/staff/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/staff/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/staff/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/staff/${id}/operations`}>
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
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                        {staff.state === 1
                                            ? <Link to={`/staff/${id}/update/contact`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                            : <button disabled={true} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </button>
                                        }
                                    </th>
                                </tr>
                                {isCompany &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{staff.organizationName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{staff.name}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Telephone</th>
                                    <td><a href={`tel:${staff.e164Telephone}`}>{staff.telephone ? staff.telephone : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Telephone</th>
                                    <td><a href={`tel:${staff.otherTelephone}`}>{staff.otherTelephone ? staff.otherTelephone : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${staff.email}`}>{staff.email ? staff.email : "-"}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Email?</th>
                                    <td>
                                        {staff.isOkToEmail
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Ok to Text?</th>
                                    <td>
                                        {staff.isOkToText
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-map-marker-alt"></i>&nbsp;Postal Address
                                        {staff.state === 1
                                            ? <Link to={`/staff/${id}/update/address`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                            : <button disabled={true} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </button>
                                        }
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={staff.fullAddressUrl} target="_blank">{staff.fullAddressWithoutPostalCode}&nbsp;<i className="fas fa-external-link-alt"></i></a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-tie"></i>&nbsp;Account
                                        {staff.state === 1
                                            ? <Link to={`/staff/${id}/update/account`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                            : <button disabled={true} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </button>
                                        }
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Police Check Expiry</th>
                                    <td>
                                        {staff.policeCheck
                                            ? <Moment format="MM/DD/YYYY">{staff.policeCheck}</Moment>
                                            : "-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Full-Name</th>
                                    <td>{staff.emergencyContactName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Relationship</th>
                                    <td>{staff.emergencyContactRelationship}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Contact Telephone</th>
                                    <td>{staff.emergencyContactTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Alternative Telephone</th>
                                    <td>{staff.emergencyContactAlternativeTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{staff.description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Account Active?</th>
                                    <td>
                                        {staff.state
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>




                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                        {staff.state === 1
                                            ? <Link to={`/staff/${id}/update/metrics`} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </Link>
                                            : <button disabled={true} className="btn btn-success btn-sm  float-right pl-4 pr-4">
                                                <i className="fas fa-edit"></i>&nbsp;
                                            </button>
                                        }
                                    </th>
                                </tr>
                                {typeOf !== COMMERCIAL_CUSTOMER_TYPE_OF_ID && <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        {staff && staff.birthdate
                                            ?<Moment format="MM/DD/YYYY">{staff.birthdate}</Moment>
                                            :"-"
                                        }
                                    </td>
                                </tr>}
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{staff.gender ? staff.gender : "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{staff.description ? staff.description : "-"}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tag(s)</th>
                                    <td>
                                        {staff.tags && staff.tags.map(
                                            (tag) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY">{staff.joinDate}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{staff.howHearText ? staff.howHearText : "-"}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account #</th>
                                    <td>{staff && staff.id && staff.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY hh:mm:ss a">{staff.created}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{staff.createdByName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>
                                        {staff && <Moment format="MM/DD/YYYY hh:mm:ss a">{staff.lastModified}</Moment>}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{staff.lastModifiedByName}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-project-diagram"></i>&nbsp;Functions
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Available Choices</th>
                                    <td>
                                        {isActiveState
                                            ?<div>
                                                <Link to={`/staff/${id}/archive`} className="btn btn-primary btn-lg mt-4 pl-4 pr-4">
                                                    <i className="fas fa-archive"></i>&nbsp;Archive
                                                </Link>
                                            </div>
                                            :<div>
                                                <Link to={`/staff/${id}/unarchive`} className="btn btn-primary btn-lg mt-4 pl-4 pr-4">
                                                    Unarchive&nbsp;<i className="fas fa-box-open"></i>
                                                </Link>
                                            </div>
                                        }
                                        {canDeleteStaff &&
                                            <div>
                                                {staff.state === 1
                                                    ? <Link to={`/staff/${id}/delete`} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-trash"></i>&nbsp;Permanently Delete Staff
                                                    </Link>
                                                    : <button disabled={true} className="btn btn-danger btn-lg mt-4 pl-4 pr-4">
                                                        <i className="fas fa-trash"></i>&nbsp;Permanently Delete Staff
                                                    </button>
                                                }
                                            </div>
                                        }
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                { /*
                                <Link to={`/staff/${id}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link> */ }
                                <Link to={`/staff`} className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4">
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
        const { id, text } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={id}>{text}</span>
        );
    };
}
