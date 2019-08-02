import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';

import { FlashMessageComponent } from "../../flashMessageComponent";
import { BootstrapTableLoadingAnimation } from "../../bootstrap/bootstrapTableLoadingAnimation";


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            orders,

            // Everything else.
            onTableChange
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
            sort: true
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true
        },{
            dataField: 'assignmentDate',
            text: 'Assign Date',
            sort: true
        },{
            dataField: 'startDate',
            text: 'Start Date',
            sort: true
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

        return (
            <BootstrapTable
                bootstrap4
                keyField='slug'
                data={ orders }
                columns={ columns }
                striped
                bordered={ false }
                noDataIndication="There are no orders at the moment"
                remote
                onTableChange={ onTableChange }
                pagination={ paginationFactory({ page, sizePerPage, totalSize }) }
                filter={ filterFactory() }
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


function statusFormatter(cell, row){
    switch(row.state) {
        case "active":
            return <i className="fas fa-check-circle"></i>;
            break;
        case "inactive":
            return <i className="fas fa-times-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
    }
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.slug}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


export default class OrderListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            orderList,

            // Everything else...
            flashMessage, onTableChange
        } = this.props;
        return (
            <div>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user-circle"></i>&nbsp;Orders
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user-circle"></i>&nbsp;Orders</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/orders/add/step-1" className="d-block link-ndecor" title="Orders">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Orders</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/orders/search" className="d-block link-ndecor" title="Search">
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
                        {orderList.results
                            ?<RemoteListComponent
                                page={page}
                                sizePerPage={sizePerPage}
                                totalSize={totalSize}
                                orders={orderList.results}
                                onTableChange={onTableChange}
                            />
                            :<BootstrapTableLoadingAnimation />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
