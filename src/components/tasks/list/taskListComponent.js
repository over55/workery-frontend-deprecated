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
            tasks,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        // DEVELOPERS NOTE:
        // Where did `2` and `3` values come from? These are the `true` and
        // `false` values specified by `django-rest-framework` in the API.
        const isClosedSelectOptions = {
            3: 'Pending',
            2: 'Closed',
        };

        const typeOfSelectOptions = {
            0: 'All',
            1: 'Unassigned',
            2: '48 Hour Follow Ups',
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
            filter: selectFilter({
                options: typeOfSelectOptions,
                defaultValue: 0,
                withoutEmptyOption: true
            }),
            formatter: typeOfFormatter,
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
        },
        // {
        //     dataField: 'isClosed',
        //     text: 'Status',
        //     sort: false,
        //     filter: selectFilter({
        //         options: isClosedSelectOptions,
        //         defaultValue: 3, // Note: `3` is `pending`.
        //         withoutEmptyOption: true
        //     }),
        //     formatter: statusFormatter
        // },
        {
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'dueDate',
            order: 'asc'
        }];


        const paginationOption = {
            page: page,
            sizePerPage: sizePerPage,
            totalSize: totalSize,
            sizePerPageList: [{
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
                data={ tasks }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no tasks at the moment"
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
    if (row && row.associateAwayLog !== undefined && row.associateAwayLog !== null) {
        return <i className="fas fa-sun"></i>;
    }
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


function typeOfFormatter(cell, row){
    return row.title
}


function dueDateFormatter(cell, row){
    return row.dueDate ? <Moment format="MM/DD/YYYY">{row.dueDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    switch(row.isClosed) {
        case false:
            return <i className="fas fa-clock"></i>;
            break;
        case true:
            return <i className="fas fa-check-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
    }
}


function customerFormatter(cell, row){
    if (row.customer === "" || row.customer === null || row.customer === "null" || row.customer === undefined) {
        return "-";
    }
    return (
        <a target="_blank" href={`/client/${row.customer}`}>
            <strong>
                {row.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
            </strong>
        </a>
    )
}


function associateFormatter(cell, row){
    if (row.associate === "" || row.associate === null || row.associate === "null" || row.associate === undefined) {
        return "-";
    }
    return (
        <a target="_blank" href={`/associate/${row.associate}`}>
            <strong>
                {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
            </strong>
        </a>
    )
}


function financialExternalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/financial/${row.id}`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


function detailLinkFormatter(cell, row){
    if (row.typeOf === 3) { // Add code to prevent the deprecated task from being accessible.
        return (
            <div>
                <i className="fas fa-lock"></i>&nbsp;Locked
            </div>
        );
    }
    if (row.isClosed === true) { return "Closed"; }
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
            page, sizePerPage, totalSize,

            // Data
            taskList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const tasks = (taskList && taskList.results) ? taskList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tasks"></i>&nbsp;Tasks
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                           {/*
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/tasks/add/step-1" className="d-block link-ndecor" title="Tasks">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Tasks</div>
                            </div>
                            */}
                            <div className="col-sm-12 placeholder">
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
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            tasks={tasks}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default TaskListComponent;
