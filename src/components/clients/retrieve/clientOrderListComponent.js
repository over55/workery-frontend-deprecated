import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import Moment from 'react-moment';
// import 'moment-timezone';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            orders,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            "new": 'New',
            "declined": 'Declined',
            "pending": 'Pending',
            "cancelled": 'Cancelled',
            "ongoing": 'Ongoing',
            "in_progress": 'In-progress',
            "completed_and_unpaid": 'Completed and Unpaid',
            "completed_and_paid": 'Completed and Paid',
            "archived": 'Archived',
        };

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Job #',
            sort: true,
            formatter: idFormatter,
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
            formatter: associateNameFormatter,
        },{
            dataField: 'assignmentDate',
            text: 'Assign Date',
            sort: true,
            formatter: assignmentDateFormatter,
        },{
            dataField: 'startDate',
            text: 'Start Date',
            sort: true,
            formatter: startDateFormatter,
        },{
            dataField: 'completionDate',
            text: 'Completion Date',
            sort: true,
            formatter: completionDateFormatter,
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions
            }),
            formatter: statusFormatter
        },{
            dataField: 'slug',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        const paginationOption = {
            page: page,
            sizePerPage: sizePerPage,
            totalSize: totalSize,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '25', value: 25
            }, {
                text: '50', value: 50
            }, {
                text: '100', value: 100
            }, {
                text: 'All', value: totalSize
            }],
            showTotal: true,
            paginationTotalRenderer: customTotal,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
        };

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ orders }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no orders at the moment"
                remote
                onTableChange={ onTableChange }
                pagination={ paginationFactory(paginationOption) }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function iconFormatter(cell, row){
    switch(row.typeOf) {
        case 2:
            return <i className="fas fa-building"></i>;
            break;
        case 1:
            return <i className="fas fa-home"></i>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}


function idFormatter(cell, row){
    return (
        row.id && row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}


function associateNameFormatter(cell, row){
    if (row.associateName === null || row.associateName === undefined || row.associateName === "None") { return "-"; }
    return (
        <Link to={`/associate/${row.associate}`} target="_blank">
            {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function startDateFormatter(cell, row){
    return row.startDate ? <Moment format="MM/DD/YYYY">{row.startDate}</Moment> : "-";
}


function assignmentDateFormatter(cell, row){
    return row.assignmentDate ? <Moment format="MM/DD/YYYY">{row.assignmentDate}</Moment> : "-";
}


function completionDateFormatter(cell, row){
    return row.completionDate ? <Moment format="MM/DD/YYYY">{row.completionDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    return row.prettyState;
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


export default class ClientOrderListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            orderList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, client
        } = this.props;

        const orders = orderList.results ? orderList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/clients"><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{client && client.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;Orders</h1>

                {client.state === 'inactive' &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This client is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/client/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/client/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/client/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            orders={orders}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
