// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


export default class StaffCreateStep8Component extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const {
            // Step 3
            accountTypeLabel,

            // Step 4 - Residential & Business
            givenName,
            lastName,
            primaryPhone,
            secondaryPhone,
            workEmail,
            personalEmail,
            isOkToEmail,
            isOkToEmailLabel,
            isOkToText,
            isOkToTextLabel,

            // Step 5 - Address
            country,
            region,
            locality,
            postalCode,
            streetAddress,

            // Step 6 - Account
            description,
            emergencyContactName, emergencyContactRelationship, emergencyContactTelephone, emergencyContactAlternativeTelephone,
            isActive,
            policeCheck,

            // Step 7 - Metrics
            tags,
            dateOfBirth,
            gender,
            genderLabel,
            howHear,
            howHearLabel,
            howHearOption,
            howHearOther,
            joinDate,
            comment,

            // Everything else
            returnURL,
            errors,
            isLoading,
            onSubmitClick,
        } = this.props;
        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Staff
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/staff/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/staff/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/staff/add/step-3">
                                <span className="num">3.</span><span className="">Group</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/staff/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/staff/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to="/staff/add/step-6">
                                <span className="num">6.</span><span className="">Account</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to="/staff/add/step-7">
                                <span className="num">7.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num">8.</span><span className="">Review</span>
                            </strong>
                        </div>
                    </div>
                </div>

                <div className="row pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">

                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Review
                        </h2>

                        <BootstrapErrorsProcessingAlert errors={errors} />
                        <p><strong>Please confirm these details before adding the staff:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Group Membership</th>
                                    <td>{accountTypeLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Contact
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Primary Phone #</th>
                                    <td>{primaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Phone #</th>
                                    <td>{secondaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Work Email</th>
                                    <td>{workEmail}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Personal Email</th>
                                    <td>{personalEmail}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ok to email?</th>
                                    <td>
                                        {isOkToEmailLabel}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ok to text?</th>
                                    <td>
                                        {isOkToTextLabel}
                                    </td>
                                </tr>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-address-book"></i>&nbsp;Address
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Street Address</th>
                                    <td>{streetAddress}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Locality</th>
                                    <td>{locality}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Region</th>
                                    <td>{region}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Country</th>
                                    <td>{country}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Postal Code</th>
                                    <td>{postalCode}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-user-tie"></i>&nbsp;Account
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Police Check Expiry</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY">{policeCheck}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Full-Name</th>
                                    <td>{emergencyContactName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Relationship</th>
                                    <td>{emergencyContactRelationship}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Contact Telephone</th>
                                    <td>{emergencyContactTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Emergency Contact Alternative Telephone</th>
                                    <td>{emergencyContactAlternativeTelephone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Description</th>
                                    <td>{description}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Account Active?</th>
                                    <td>
                                        {isActive
                                            ?"Yes"
                                            :"No"
                                        }
                                    </td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-chart-pie"></i>&nbsp;Metrics
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Tags</th>
                                    <td>
                                        {tags && tags.map(
                                            (tag, i) => <TagItem tag={tag} key={tag.id} />)
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Date of Birth</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY">{dateOfBirth}</Moment>
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Gender</th>
                                    <td>{genderLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">How did you hear about us?</th>
                                    <td>{howHearLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Join Date</th>
                                    <td><Moment format="MM/DD/YYYY">{joinDate}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comment(s)</th>
                                    <td>{comment}</td>
                                </tr>

                            </tbody>
                        </table>
                        <form>
                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onSubmitClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to="/staff/add/step-7" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
