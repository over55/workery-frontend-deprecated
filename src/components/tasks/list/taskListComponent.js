import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Moment from 'react-moment';
// import 'moment-timezone';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';

import { BootstrapPageLoadingAnimation } from "../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../constants/api';


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            tasks,

            // Everything else.
            onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        const typeOfSelectOptions = {
            0: 'All',
            1: 'Unassigned',
            2: '48 Hour Follow Ups',
            4: 'Pending',
            6: 'Completion',
            7: 'Survey',
        };

        const columns = [{
            dataField: 'orderTypeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'dueDate',
            text: 'Due Date',
            sort: true,
            formatter: dueDateFormatter,
        },{
            dataField: 'typeOf',
            text: 'Task',
            sort: true,
            formatter: cell => typeOfSelectOptions[cell],
            filter: selectFilter({
                options: typeOfSelectOptions
            }),
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true,
            formatter: customerFormatter,
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
            formatter: associateFormatter,
        },{
            dataField: 'id',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'dueDate',
            order: 'desc'
        }];

        // const paginationOption = {
        //     page: offset,
        //     sizePerPage: limit,
        //     totalSize: totalSize,
        //     showTotal: true,
        //
        //     // paginationTotalRenderer: customTotal,
        //     withFirstAndLast: false,
        //     nextPageText: "Next",
        //     prePageText: "Previous",
        // };

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ tasks }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no tasks at the moment"
                remote
                onTableChange={ onTableChange }
                // pagination={ paginationFactory(paginationOption) }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function iconFormatter(cell, row){
    switch(row.orderTypeOf) {
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

function dueDateFormatter(cell, row){
    return row.dueDate ? <Moment format="MM/DD/YYYY">{row.dueDate}</Moment> : "-";
}

function statusFormatter(cell, row){
    switch(row.state) {
        case "active":
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case "inactive":
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        default:
        return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function customerFormatter(cell, row){
    if (row.customerId === "" || row.customerId === null || row.customerId === "null" || row.customerId === undefined) {
        return "-";
    }
    return (
        <a target="_blank" href={`/client/${row.customerId}`}>
            <strong>
                {row.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
            </strong>
        </a>
    )
}


function associateFormatter(cell, row){
    if (row.associateId === "" || row.associateId === null || row.associateId === "null" || row.associateId === undefined) {
        return "-";
    }
    return (
        <a target="_blank" href={`/associate/${row.associateId}`}>
            <strong>
                {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
            </strong>
        </a>
    )
}

function detailLinkFormatter(cell, row){
    return (
        <Link to={`/task/${row.typeOf}/${row.id}/step-1`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class TaskListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            taskList,

            // Everything else...
            flashMessage, onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        let tasks = [];
        if (taskList && isEmpty(taskList)===false) {
            tasks = taskList.results ? taskList.results : [];
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
                            <i className="fas fa-user-circle"></i>&nbsp;Tasks
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user-circle"></i>&nbsp;Tasks</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/tasks/add/step-1" className="d-block link-ndecor" title="Tasks">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Tasks</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/tasks/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Tasks</span>
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
                            tasks={tasks}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />

                        <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick}>
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

export default TaskListComponent;
