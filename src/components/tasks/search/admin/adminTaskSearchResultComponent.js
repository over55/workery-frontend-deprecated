import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


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

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Id #',
            sort: true,
            formatter: idFormatter,
        },{
            dataField: 'title',
            text: 'Title',
            sort: true,
        },{
            dataField: 'job',
            text: 'Job #',
            sort: true,
            formatter: jobFormatter,
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true,
            formatter: clientFormatter,
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
            formatter: associateNameFormatter,
        },{
            dataField: 'isClosed',
            text: 'Status',
            sort: false,
            formatter: statusFormatter
        },{
            dataField: 'id',
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


function idFormatter(cell, row){
    return (
        row.id && row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}


function jobFormatter(cell, row){
    return (
        <Link to={`/order/${row.job}`} target="_blank">
            {row.job && row.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
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


function associateNameFormatter(cell, row){
    if (row.associateName === null || row.associateName === undefined || row.associateName === "None") { return "-"; }
    return (
        <Link to={`/associate/${row.associate}`} target="_blank">
            {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
}


function clientFormatter(cell, row){
    if (row.customerName === null || row.customerName === undefined || row.customerName === "None") { return "-"; }
    return (
        <Link to={`/client/${row.customer}`} target="_blank">
            {row.customerName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
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


class AdminTaskSearchResultComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            taskList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const tasks = taskList.results ? taskList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/tasks`}><i className="fas fa-wrench"></i>&nbsp;Tasks</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/tasks/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-search"></i>&nbsp;Tasks Search</h1>


                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
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

export default AdminTaskSearchResultComponent;
