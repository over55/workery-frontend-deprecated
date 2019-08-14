// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";
import { BootstrapTextarea } from "../../bootstrap/bootstrapTextarea";
import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { WORK_ORDER_CLOSE_REASON_CHOICES } from "../../../constants/api";


class OrderCloseOperationComponent extends Component {
    render() {
        // Common
        const { id, errors, reason, comment, isLoading, onClick, onTextChange, onSelectChange, order } = this.props;

        return (
            <main id="main" role="main">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/order/${id}/full`}><i className="fas fa-wrench"></i>&nbsp;Order # {id}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-times"></i>&nbsp;Close
                        </li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">

                        <table className="table table-bordered custom-cell-w">
                            <tbody>
                                <tr className="bg-dark">
                                    <th scope="row" colSpan="2" className="text-light">
                                        <i className="fas fa-table"></i>&nbsp;Job Quick Info
                                    </th>
                                </tr>
                                {order.customerFullName &&
                                    <tr>
                                        <th scope="row" className="bg-light">Client</th>
                                        <td>
                                            <Link to={`/customer/${order.customer}`} target="_blank">
                                                {order.customerFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                }
                                <tr>
                                    <th scope="row" className="bg-light">Associate</th>
                                    <td>
                                        {order.associateFullName
                                            ?<Link to={`/customer/${order.associate}`} target="_blank">
                                                {order.associateFullName}&nbsp;<i className="fas fa-external-link-alt"></i>
                                            </Link>
                                            :"-"
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <th scope="row" className="bg-light">Comments</th>
                                    <td>
                                        <Link to={`/order/${order.id}/comments`} target="_blank">
                                            View Comments&nbsp;<i className="fas fa-external-link-alt"></i>
                                        </Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <br />

                        <form>
                            <h1><i className="fas fa-times"></i>&nbsp;Close Order</h1>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="Reason (*)"
                                name="reason"
                                defaultOptionLabel="Please select the reason."
                                options={WORK_ORDER_CLOSE_REASON_CHOICES}
                                value={reason}
                                error={errors.reason}
                                onSelectChange={onSelectChange}
                            />

                            <BootstrapTextarea
                                name="comment"
                                borderColour="border-primary"
                                label="Describe the comment (*)"
                                placeholder="Describe here."
                                rows="5"
                                value={comment}
                                helpText="Maximum 1,000 characters."
                                onChange={onTextChange}
                                error={errors.comment}
                            />

                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" disabled={isLoading} onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/order/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
                                    <i className="fas fa-arrow-circle-left"></i> Back
                                </Link>
                            </div>

                        </form>
                    </div>
                </div>

            </main>
        );
    }
}

export default OrderCloseOperationComponent;
