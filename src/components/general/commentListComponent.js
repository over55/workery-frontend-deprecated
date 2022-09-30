import isEmpty from "lodash/isEmpty";
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

import { BootstrapPageLoadingAnimation } from "../bootstrap/bootstrapPageLoadingAnimation";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            comments,

            // Everything else.
            onTableChange, isLoading, user, onNextClick, onPreviousClick,
        } = this.props;

        const columns = [{
            dataField: 'orderId',
            text: 'Job #',
            sort: true,
            formatter: idFormatter,
        },{
            dataField: 'text',
            text: 'Text',
            sort: true,
        },{
            dataField: 'orderId',
            text: 'Details',
            sort: false,
            formatter: detailLinkFormatter
        }];

        // // The following code will hide the financial details if the
        // // authenticated user belongs to the frontline staff.
        // if (user && user.roleId === FRONTLINE_ROLE_ID) {
        //     columns.splice(7, 1);
        // }

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        // const paginationOption = {
        //     offset: offset,
        //     sizePerPage: sizePerPage,
        //     totalSize: totalSize,
        //     sizePerPageList: [{
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
                data={ comments }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no orders at the moment"
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
        row.orderId && row.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}

function detailLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.orderId}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class CommentListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            orderCommentList,

            // Everything else...
            flashMessage, onTableChange, isLoading, user, onNextClick, onPreviousClick,
        } = this.props;

        let comments = [];
        if (orderCommentList && isEmpty(orderCommentList)===false) {
            comments = orderCommentList.results ? orderCommentList.results : [];
        }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="offset">
                            <i className="fas fa-comment"></i>&nbsp;Comments
                        </li>
                    </ol>
                </nav>

                <h1><i className="fas fa-comment"></i>&nbsp;Comments</h1>


                { /*<div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/comments/search" className="d-block link-ndecor" title="Search">
                                        <span className="r-circle"><i className="fas fa-search fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Search</h4>
                                <span className="text-muted">Search Comments</span>
                            </div>
                        </section>
                    </div>
                </div>*/}

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            comments={comments}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                            user={user}
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

export default CommentListComponent;
