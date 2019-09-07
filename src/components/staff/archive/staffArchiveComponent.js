import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";


class StaffArchiveComponent extends Component {
    render() {
        const { id, givenName, lastName, errors, isLoading, onClick, isArchived } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/staff"><i className="fas fa-user-tie"></i>&nbsp;Staff</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/staff/${id}/full`}><i className="fas fa-user"></i>&nbsp;{givenName} {lastName}</Link>
                        </li>
                        {isArchived
                            ? <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-archive"></i>&nbsp;Unarchied</li>
                            : <li className="breadcrumb-item active" aria-current="page"><i className="fas fa-archive"></i>&nbsp;Archived</li>
                        }
                    </ol>
                </nav>

                <h1><i className="fas fa-minus"></i>&nbsp;{isArchived ? "Unarchive Staff" : "Archive Staff" }</h1>
                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <p><strong>Please confirm these details before deleting the staff</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Given Name</th>
                                    <td>{givenName}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Last Name</th>
                                    <td>{lastName}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Confirm & Submit
                            </button>

                            <Link className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4" to={`/staff/${id}/full`}>
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default StaffArchiveComponent;
