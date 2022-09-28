import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';


class AwayLogDeleteComponent extends Component {
    render() {
        const {
            associateId, associateOptions, startDate, reason, reasonOther, untilFurtherNotice, untilDate,
            onClick, onBack
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to="/settings"><i className="fas fa-cogs"></i>&nbsp;Settings</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/settings/away-logs"><i className="fas fa-bullhorn"></i>&nbsp;Away Logs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-minus"></i>&nbsp;Remove
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-minus"></i>&nbsp;Remove Away Log</h1>
                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <p><strong>Please confirm these details before deleting the away log</strong></p>
                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Details
                                    </th>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Associate #</th>
                                    <td>{associateId}</td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Start Date</th>
                                    <td>
                                        <Moment format="MM/DD/YYYY">{startDate}</Moment>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Confirm & Submit
                            </button>

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

export default AwayLogDeleteComponent;
