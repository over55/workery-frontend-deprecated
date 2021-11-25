import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


class BulletinBoardItemRetrieveComponent extends Component {
    render() {
        const {
            text, createdAt, createdByName, createdFromIp, lastModifiedAt, lastModifiedByName, lastModifiedFromIp, onClick, onBack, isLoading
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/bulletin-board-items"><i className="fas fa-newspaper"></i>&nbsp;Office News</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-binoculars"></i>&nbsp;View
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-binoculars"></i>&nbsp;View Office News</h1>
                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Text</th>
                                    <td>{text}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created At</th>
                                    <td><Moment format="MM/DD/YYYY">{createdAt}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created By</th>
                                    <td>
                                        {createdByName}
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Created from IP</th>
                                    <td>{createdFromIp}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Modified At</th>
                                    <td><Moment format="MM/DD/YYYY">{lastModifiedAt}</Moment></td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Modified By</th>
                                    <td>{lastModifiedByName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Modified from IP</th>
                                    <td>{lastModifiedFromIp}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            {/*
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Confirm & Submit
                            </button>
                            */}

                            <button className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" onClick={onBack}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </button>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default BulletinBoardItemRetrieveComponent;
