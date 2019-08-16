// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class StaffFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, staff, flashMessage, errors, onStaffClick } = this.props;
        const { typeOf } = staff;
        const typeOfLabel = typeOf === 2 ? "Residential" : "Commercial"
        const isActiveState = staff.state === "active";
        const isRezStaff = typeOf === 2;
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
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Staff</h1>

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
                        <div id="step-3" className="st-grey">
                            <Link to={`/staff/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/staff/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
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
                                    <th scope="row" className="bg-light">Type of Staff</th>
                                    <td>{typeOfLabel}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-tie"></i>&nbsp;Identification
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Full Name</th>
                                    <td>{staff.fullName}</td>
                                </tr>


                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-phone"></i>&nbsp;Contact
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Telephone</th>
                                    <td><a href={`tel:${staff.e164Telephone}`}>{staff.telephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Other Telephone</th>
                                    <td><a href={`tel:${staff.e164OtherTelephone}`}>{staff.otherTelephone}</a></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td><a href={`mailto:${staff.email}`}>{staff.email}</a></td>
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
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Location</th>
                                    <td>
                                        <a href={staff.addressUrl}>{staff.fullAddress}</a>
                                    </td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>{staff.birthdate}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{staff.gender}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{staff.description}</td>
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
                                    <td>{staff.joinDate}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did they discover us?</th>
                                    <td>{staff.howHearPretty}</td>
                                </tr>



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Account #</th>
                                    <td>{staff.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td>{staff.created}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>{staff.createdBy}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified At</th>
                                    <td>{staff.lastModified}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Modified By</th>
                                    <td>{staff.lastModifiedBy}</td>
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
                                                <Link onClick={onStaffClick}>
                                                    Add Job Order&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                            <li>
                                                {isActiveState
                                                    ?<Link to={`/staff/${id}/deactivation`}>
                                                        Deactivate Staff&nbsp;<i className="fas fa-chevron-right"></i>
                                                    </Link>
                                                    :<Link to={`/staff/${id}/activation`}>
                                                        Activate Staff&nbsp;<i className="fas fa-chevron-right"></i>
                                                    </Link>
                                                }

                                            </li>
                                            {isRezStaff &&
                                                <li>
                                                    <Link to={`/staff/${id}/rez-upgrade`}>
                                                        Upgrade Staff&nbsp;<i className="fas fa-chevron-right"></i>
                                                    </Link>
                                                </li>
                                            }
                                            <li>
                                                <Link to={`/staff/${id}/delete`}>
                                                    Delete Staff&nbsp;<i className="fas fa-chevron-right"></i>
                                                </Link>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <Link to={`/staff/${id}/update`} className="btn btn-primary btn-lg mt-4 float-right pl-4 pr-4">
                                    <i className="fas fa-edit"></i>&nbsp;Update
                                </Link>
                                <Link to={`/staff`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
        const { label, value } = this.props.tag;
        return (
            <span className="badge badge-info badge-lg" value={value}>{label}</span>
        );
    };
}
