// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

import { BootstrapErrorsProcessingAlert } from "../../bootstrap/bootstrapAlert";
import { BootstrapSingleSelect } from "../../bootstrap/bootstrapSingleSelect";


export default class OngoingOrderLiteUpdateComponent extends Component {
    render() {
        const {
            status, id, isLoading, errors,
            onClick, onSelectChange,
        } = this.props;

        return (
            <main id="main" role="main">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/ongoing-orders`}><i className="fas fa-undo-alt"></i>&nbsp;Ongoing Orders</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/ongoing-order/${id}/full`}><i className="fas fa-undo-alt"></i>&nbsp;Ongoing Order # {id && id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-edit"></i>&nbsp;Update
                        </li>
                    </ol>
                </nav>

                <h1>
                    <i className="fas fa-edit"></i>&nbsp;Edit Ongoing Order
                </h1>

                <div className="row">
                    <div className="col-md-5 mx-auto mt-2">
                        <form>
                            <h2>
                                <i className="fas fa-file"></i>&nbsp;Ongoing Order Form
                            </h2>
                            <p>All fields which have the (*) symbol are required to be filled out.</p>

                            <BootstrapErrorsProcessingAlert errors={errors} />

                            <p className="border-bottom mb-3 pb-1 text-secondary">
                                <i className="fas fa-graduation-cap"></i>&nbsp;Skills and Description
                            </p>

                            <BootstrapSingleSelect
                                borderColour="border-primary"
                                label="How did you hear about us? (*)"
                                name="status"
                                defaultOptionLabel="Please select how you heard about us."
                                options={STATE_CHOICES}
                                value={status}
                                error={errors.status}
                                onSelectChange={onSelectChange}
                            />


                            <div className="form-group">
                                <button className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" onClick={onClick}>
                                    <i className="fas fa-check-circle"></i>&nbsp;Save
                                </button>
                                <Link to={`/ongoing-order/${id}/full`} className="btn btn-secondary btn-lg mt-4 float-left pl-4 pr-4">
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


const STATE_CHOICES = [
    {
        selectName: "status",
        value: "running",
        label: "Running"
    },{
        selectName: "status",
        value: "idle",
        label: "Idle"
    },{
        selectName: "status",
        value: "terminated",
        label: "Terminated"
    }
];
