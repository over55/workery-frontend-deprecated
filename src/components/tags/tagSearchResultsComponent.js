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

import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../flashMessageComponent";
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../constants/api';


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            associates,

            // Everything else.
            onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        // const selectOptions = {  // DEPRECATED VIA https://github.com/over55/workery-frontend/issues/296
        //     "active": 'Active',
        //     "inactive": 'Archived',
        // };

        const columns = [{
            dataField: 'givenName',
            text: 'First Name',
            sort: true
        },{
            dataField: 'lastName',
            text: 'Last Name',
            sort: true
        },{
            dataField: 'telephone',
            text: 'Phone',
            sort: true
        },{
            dataField: 'email',
            text: 'Email',
            sort: true
        },{
            dataField: 'state',
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
            dataField: 'lastName',
            order: 'asc'
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
                data={ associates }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no associates at the moment"
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
    switch(row.typeOf) {
        case COMMERCIAL_CUSTOMER_TYPE_OF_ID:
            return <i className="fas fa-building"></i>;
            break;
        case RESIDENTIAL_CUSTOMER_TYPE_OF_ID:
            return <i className="fas fa-home"></i>;
            break;
        default:
            return <i className="fas fa-question"></i>;
            break;
    }
}



function statusFormatter(cell, row){
    switch(row.state) {
        case 1:
            return <i className="fas fa-check-circle"></i>;
            break;
        case 0:
            return <i className="fas fa-times-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
    }
}


function telephoneFormatter(cell, row){
    return (
        <a href={`tel:${row.e164Telephone}`}>
            {row.telephone}
        </a>
    )
}


function emailFormatter(cell, row){
    if (row.email === undefined || row.email === null) {
        return ("-");
    } else {
        return (
            <a href={`mailto:${row.email}`}>
                {row.email}
            </a>
        )
    }
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/associate/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


function joinDateFormatter(cell, row){
    return (
        row && row.joinDate ? <Moment format="MM/DD/YYYY">{row.joinDate}</Moment> :"-"
    )
}



class TagSearchResultsComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            associateList,

            // Everything else...
            flashMessage, onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        let associates = [];
        if (associateList && isEmpty(associateList)===false) {
            associates = associateList.results ? associateList.results : [];
        }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/tags">
                                <i className="fas fa-tags"></i>&nbsp;Search Tags
                            </Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-tag"></i>&nbsp;Tag Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1>
                    <i className="fas fa-search"></i>&nbsp;Search Tag Results
                </h1>

                {/*
                <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/associates/add/step-1" className="d-block link-ndecor" title="Associates">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Add</h4>
                                <div className="text-muted">Add Associates</div>
                            </div>
                            <div className="col-sm-6 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/associates/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Associates</span>
                            </div>
                        </section>
                    </div>
                </div>
                */}

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            associates={associates}
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

export default TagSearchResultsComponent;
