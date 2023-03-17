import isEmpty from "lodash/isEmpty";
import Moment from 'react-moment';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
// import overlayFactory from 'react-bootstrap-table2-overlay';
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            awayLogs,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            2: 'Deleted',
            3: 'Active',
        };

        const columns = [{
            dataField: 'associateName',
            text: 'Associate Name',
            sort: true
        },{
            dataField: 'startDate',
            text: 'Start Date',
            sort: true,
            formatter: startDateFormatter,
        },{
            dataField: 'untilDate',
            text: 'Until Date',
            sort: true,
            formatter: untilDateFormatter
        },{
            dataField: 'state',
            text: 'Status',
            sort: true,
            filter: selectFilter({
                options: selectOptions,
                // defaultValue: 3, // aka `Active`.
                // withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'startDate',
            order: 'asc'
        }];

        // const paginationOption = {
        //     offset: offset,
        //     limit: limit,
        //     totalSize: totalSize,
        //     limitList: [{
        //         text: '25', value: 25
        //     }, {
        //         text: '50', value: 50
        //     }, {
        //         text: '100', value: 100
        //     }, {
        //         text: 'All', value: totalSize
        //     }],
        //     showTotal: true,
        //     paginationTotalRenderer: customTotal,
        //     firstPageText: 'First',
        //     prePageText: 'Back',
        //     nextPageText: 'Next',
        //     lastPageText: 'Last',
        //     nextPageTitle: 'First offset',
        //     prePageTitle: 'Pre offset',
        //     firstPageTitle: 'Next offset',
        //     lastPageTitle: 'Last offset',
        // };

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ awayLogs }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no away logs at the moment"
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

function statusFormatter(cell, row){
    switch(row.state) {
        case 0:
            return <i className="fas fa-times-circle" style={{ color: 'red' }}></i>;
            break;
        case 1:
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function startDateFormatter(cell, row){
    return (
        row && row.startDate ? <Moment format="MM/DD/YYYY">{row.startDate}</Moment> :"-"
    )
}

function untilDateFormatter(cell, row){
    return (
        row && row.untilDate && row.untilFurtherNotice === false ? <Moment format="MM/DD/YYYY">{row.untilDate}</Moment> :"-"
    )
}

function detailLinkFormatter(cell, row){
    return (
        <div>
            <Link to={`/settings/away-log/${row.id}/update`} className="btn btn-primary pl-4 pr-4">
                <i className="fas fa-edit"></i>&nbsp;Edit
            </Link>&nbsp;&nbsp;&nbsp;
            <Link to={`/settings/away-log/${row.id}/delete`} className="btn btn-danger pl-4 pr-4">
                <i className="fas fa-minus"></i>&nbsp;Remove
            </Link>
        </div>
    )
}


class AwayLogListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            awayLogList,

            // Everything else...
            flashMessage, onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        let awayLogs = [];
        if (awayLogList && isEmpty(awayLogList)===false) {
            awayLogs = awayLogList.results ? awayLogList.results : [];
        }

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
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-bullhorn"></i>&nbsp;Away Logs
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-bullhorn"></i>&nbsp;Away Logs</h1>

                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/settings/away-logs/add" className="d-block link-ndecor" title="Add Away Log">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Away Log</div>
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
                            awayLogs={awayLogs}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />

                        <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick} disabled={awayLogs.length === 0 || awayLogs.length < STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION}>
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

export default AwayLogListComponent;
