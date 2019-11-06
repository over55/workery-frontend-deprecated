import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { BootstrapErrorsProcessingAlert } from "../../../bootstrap/bootstrapAlert";


class HowHearDeleteComponent extends Component {
    render() {
        const { text, sortNumber, isForAssociate, isForCustomer, isForPartner, isForStaff, errors, isLoading, onClick } = this.props;
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
                            <Link to="/settings/how-hears"><i className="fas fa-tty"></i>&nbsp;How did you hear?</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-minus"></i>&nbsp;Remove
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-minus"></i>&nbsp;Remove</h1>
                <div className="row mt-4 pt-3 mb-4 pb-2">
                    <div className="col-md-10 mx-auto p-2">
                        <p><strong>Please confirm these details before deleting the how did you hear about us option.</strong></p>
                        <BootstrapErrorsProcessingAlert errors={errors} />
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
                                <th scope="row" className="bg-light">Sort #</th>
                                <td>{sortNumber}</td>
                            </tr>
                            </tbody>
                        </table>

                        <div className="form-group col-md-12 mb-3 p-0 mx-auto text-center">
                            <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                <i className="fas fa-check-circle"></i>&nbsp;Confirm & Submit
                            </button>

                            <Link className="btn btn-orange btn-lg mt-4 float-left pl-4 pr-4" to="/settings/how-hears">
                                <i className="fas fa-arrow-circle-left"></i>&nbsp;Back
                            </Link>
                        </div>

                    </div>
                </div>


            </div>
        );
    }
}

export default HowHearDeleteComponent;
