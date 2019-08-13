// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import {
    RESIDENCE_TYPE_OF,
    BUSINESS_TYPE_OF,
    COMMUNITY_CARES_TYPE_OF
} from '../../../constants/api';
import { FlashMessageComponent } from "../../flashMessageComponent";


export default class OrderFullRetrieveComponent extends Component {
    // Not using the following: streetTypeOption, streetDirectionOption, howDidYouHearOption
    render() {
        const { id, order, errors, flashMessage } = this.props;
        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Order # {id}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;View Order</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/order/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-badge"></i>&nbsp;</span><span className="">Activity Sheets</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
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

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Job Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{order.id}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Phone Number (Landline)</th>
                                    <td>{order.id}</td>
                                </tr>

                                { /*

                                    Job Details
                                    Job #	26,733
                                    Client	john doe
                                    Phone Number (Landline)	(226) 222-2222
                                    Description	test
                                    Skill Sets	-
                                    Assigned Associate	-
                                    Associate Phone Number	-
                                    Assignment Date	-
                                    Is Home Support Service	False
                                    Is ongoing?	False
                                    Status	New
                                    Start date	Aug. 14, 2019
                                    Completion date	-
                                    Hours	0.0
                                    Required Task	Assign an Associate
                                    Financial Details
                                    Invoice Date	-
                                    Invoice ID(s) #	-
                                    Invoice Quote	-
                                    Invoice Labour	-
                                    Invoice Material	-
                                    Invoice Total	-
                                    Invoice Service Fee	-
                                    Invoice Service Fee Payment Date	-
                                    System
                                    Created at	Aug. 7, 2019, 12:24 p.m.
                                    Created by	Fran S
                                    Created from	127.0.0.1
                                    Modified at	Aug. 7, 2019, 12:24 p.m.
                                    Modified by	Fran S
                                    Modified from	127.0.0.1

                                */ }



                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-wrench"></i>&nbsp;Financial Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{order.id}</td>
                                </tr>

                                { /*

                                    Invoice Date	-
                                    Invoice ID(s) #	-
                                    Invoice Quote	-
                                    Invoice Labour	-
                                    Invoice Material	-
                                    Invoice Total	-
                                    Invoice Service Fee	-
                                    Invoice Service Fee Payment Date

                                */}






                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-server"></i>&nbsp;System Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Name</th>
                                    <td>{order.id}</td>
                                </tr>

                                { /*

                                    Created at	Aug. 7, 2019, 12:24 p.m.
                                    Created by	Fran S
                                    Created from	127.0.0.1
                                    Modified at	Aug. 7, 2019, 12:24 p.m.
                                    Modified by	Fran S
                                    Modified from	127.0.0.1

                                */}


                            </tbody>
                        </table>
                    </div>
                </div>


            </main>
        );
    }
}


/**
 *  Function will take the tag value which was selected and find print it with
 *  the label from the tagOptions data.
 */
class TagItem extends Component {
    render() {
        const { tag, tagOptions } = this.props;
        for (let i = 0; i < tagOptions.length; i++) {
            let tagOption = tagOptions[i];
            if (tagOption.value === tag) {
                return (
                    <span className="badge badge-info badge-lg" value={tag}>{tagOption.label}</span>
                );
            }
        }
        return (null);
    };
}


/**
 *  Function will take the howDidYouHear value which was selected and find
 * print it with the label from the howDidYouHearOptions data.
 */
class HowDidYouHearText extends Component {
    render() {
        const { howDidYouHear, howDidYouHearOther, howDidYouHearOptions } = this.props;
        if (howDidYouHearOther !== null && howDidYouHearOther !== undefined && howDidYouHearOther !== "") {
            return howDidYouHearOther;
        }
        for (let i = 0; i < howDidYouHearOptions.length; i++) {
            let howDidYouHearOption = howDidYouHearOptions[i];
            if (howDidYouHearOption.value === howDidYouHear) {
                return (
                    <span value={howDidYouHear}>{howDidYouHearOption.label}</span>
                );
            }
        }
        return (null);
    };
}
