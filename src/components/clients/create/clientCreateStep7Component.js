// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { COMMERCIAL_CUSTOMER_TYPE_OF_ID } from '../../../constants/api';


export default class ClientCreateStep7Component extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const {
            // Step 3
            typeOf,
            typeOfLabel,

            // Step 4 - Residential & Business
            givenName,
            lastName,
            primaryPhone,
            secondaryPhone,
            email,
            isOkToEmail,
            isOkToEmailLabel,
            isOkToText,
            isOkToTextLabel,
            organizationName,
            organizationTypeOf,

            // Step 5 - Address
            country,
            region,
            locality,
            postalCode,
            streetAddress,

            // Step 6 - Metrics
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
            errors,
            isLoading,
            onSubmitClick,
        } = this.props;
        const isBizTypeOf = typeOf === COMMERCIAL_CUSTOMER_TYPE_OF_ID;

        // // Set the how did you hear.
        // let howDidYouHearFinalLabel = howDidYouHearLabel;
        // if (howDidYouHear === "other") {
        //     howDidYouHearFinalLabel = howDidYouHearOther;
        // }
        //
        // // This code checks to see if we need to display the household count fields.
        // let showHouseholdCount = false;
        // try {
        //     showHouseholdCount = parseInt(anotherHouseholdClientRegistered) === 0;
        // } catch (error) {
        //     // Do nothing.
        // }

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/clients"><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-plus"></i>&nbsp;Add Client
                </h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to="/clients/add/step-1">
                                <span className="num">1.</span><span className="">Search</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to="/clients/add/step-2">
                                <span className="num">2.</span><span className="">Results</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to="/clients/add/step-3">
                                <span className="num">3.</span><span className="">Type</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to="/clients/add/step-4">
                                <span className="num">4.</span><span className="">Contact</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to="/clients/add/step-5">
                                <span className="num">5.</span><span className="">Address</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to="/clients/add/step-6">
                                <span className="num">6.</span><span className="">Metrics</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey active">
                            <strong>
                                <span className="num">7.</span><span className="">Review</span>
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
                        <p><strong>Please confirm these details before adding the client:</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-sitemap"></i>&nbsp;Type
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Clientship Class</th>
                                    <td>{typeOfLabel}</td>
                                </tr>

                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-id-card"></i>&nbsp;Contact
                                    </th>
                                </tr>
                                {isBizTypeOf &&
                                    <tr>
                                        <th scope="row" className="bg-light">Company Name</th>
                                        <td>{organizationName}</td>
                                    </tr>
                                }
                                {isBizTypeOf
                                    ?<tr>
                                        <th scope="row" className="bg-light">Contact First Name</th>
                                        <td>{givenName}</td>
                                    </tr>
                                    :<tr>
                                        <th scope="row" className="bg-light">First Name</th>
                                        <td>{givenName}</td>
                                    </tr>
                                }
                                {isBizTypeOf
                                    ?<tr>
                                        <th scope="row" className="bg-light">Contact Last Name</th>
                                        <td>{lastName}</td>
                                    </tr>
                                    :<tr>
                                        <th scope="row" className="bg-light">Last Name</th>
                                        <td>{lastName}</td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Primary Phone #</th>
                                    <td>{primaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Secondary Phone #</th>
                                    <td>{secondaryPhone}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Email</th>
                                    <td>{email}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ok to email?</th>
                                    <td>{isOkToEmailLabel}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Is Ok to text?</th>
                                    <td>{isOkToTextLabel}</td>
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
                                        <Moment format="YYYY/MM/DD">{dateOfBirth}</Moment>
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
                                    <td><Moment format="YYYY/MM/DD">{joinDate}</Moment></td>
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
                                <Link to="/clients/add/step-6" className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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
