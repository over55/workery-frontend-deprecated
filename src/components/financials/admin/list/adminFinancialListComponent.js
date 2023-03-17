import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
// import 'moment-timezone';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { FRONTLINE_ROLE_ID } from "../../../../constants/api";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";

const selectOptions = {
    7: 'Completed and Unpaid',
    8: 'Completed and Paid',
};

class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            financials,

            // Everything else.
            onTableChange, isLoading, user, onNextClick, onPreviousClick,
        } = this.props;

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Job #',
            sort: true,
            formatter: idFormatter
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true
        },{
            dataField: 'invoiceServiceFeePaymentDate',
            text: 'Payment Date',
            sort: true,
            formatter: paymentDateFormatter
        },{
            dataField: 'state',
            text: 'Status',
            formatter: cell => selectOptions[cell],
            filter: selectFilter({
                options: selectOptions
            })
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        // The following code will hide the order details if the
        // authenticated user belongs to the frontline staff.
        if (user && user.roleId === FRONTLINE_ROLE_ID) {
            columns.splice(7, 1);
        }

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];


        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ financials }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no financials at the moment"
                remote
                onTableChange={ onTableChange }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function iconFormatter(cell, row){
    const icons = [];
    if (row.typeOf === 2) {
        icons.push(<i className="fas fa-building"></i>)
    }
    else if (row.typeOf === 1) {
        icons.push(<i className="fas fa-home"></i>)
    }
    else {
        icons.push(<i className="fas fa-question"></i>)
    }
    if (row.isOngoing) {
        icons.push(" ");
        icons.push(<i className="fas fa-redo-alt"></i>)
    }
    return <div>{icons}</div>;
}


function idFormatter(cell, row){
    return (
        row.id && row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}


function clientNameFormatter(cell, row){
    if (row.customerName === null || row.customerName === undefined || row.customerName === "None") { return "-"; }
    return (
        <Link to={`/client/${row.customer}`} target="_blank">
            {row.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
}


function associateNameFormatter(cell, row){
    if (row.associateName === null || row.associateName === undefined || row.associateName === "None") { return "-"; }
    return (
        <Link to={`/associate/${row.associate}`} target="_blank">
            {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
}


function statusFormatter(cell, row){
    return selectOptions[row.state];
}

function paymentDateFormatter(cell, row) {
    return row.invoiceServiceFeePaymentDate ? <Moment format="MM/DD/YYYY">{row.invoiceServiceFeePaymentDate}</Moment> : "-";
}

function startDateFormatter(cell, row){
    return row.startDate ? <Moment format="MM/DD/YYYY">{row.startDate}</Moment> : "-";
}


function assignmentDateFormatter(cell, row){
    return row.assignmentDate ? <Moment format="MM/DD/YYYY">{row.assignmentDate}</Moment> : "-";
}


function externalOrderLinkFormatter(cell, row){
    return (
        <Link to={`/financial/${row.id}`} target="_blank" rel='noopener'>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/financial/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class AdminOrderListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            financialList,

            // Everything else...
            flashMessage, onTableChange, isLoading, user, onNextClick, onPreviousClick,
        } = this.props;

        let financials = [];
        if (financialList && isEmpty(financialList)===false) {
            financials = financialList.results ? financialList.results : [];
        }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Financials
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;Financials</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/financials/add/step-1" className="d-block link-ndecor" title="Orders">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Orders</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/financials/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Orders</span>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            financials={financials}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                            user={user}
                        />

                        <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick} disabled={financials.length === 0 || financials.length < STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION}>
                            <i className="fas fa-check-circle"></i>&nbsp;Next
                        </button>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onPreviousClick} disabled={offset === 0}>
                            <i className="fas fa-check-circle"></i>&nbsp;Previous
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminOrderListComponent;
