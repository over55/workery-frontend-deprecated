import isEmpty from "lodash/isEmpty";
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

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import { getAccessTokenFromLocalStorage, getRefreshTokenFromLocalStorage } from '../../../../helpers/jwtUtility';
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";




const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            organizations,

            // Everything else.
            onTableChange, isLoading,  onPreviousClick, onNextClick,
        } = this.props;

        const columns = [{
            dataField: 'schemaName',
            text: 'Schema',
            sort: false,
        },{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
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
                data={ organizations }
                columns={ columns }
                striped
                bordered={ false }
                noDataIndication="There are no organizations at the moment"
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


function detailLinkFormatter(cell, row){
    const { schemaName, name } = row;
    const accessToken = getAccessTokenFromLocalStorage();
    const refreshToken = getRefreshTokenFromLocalStorage();

    // Generate our redirect address.
    const absoluteUrl =  process.env.REACT_APP_WWW_PROTOCOL + "://" +process.env.REACT_APP_WWW_DOMAIN+"/dashboard"+"-redirect/"+accessToken+"/"+refreshToken+"/"+schemaName;

    return (
        <div>
            <a href={`/organization/${row.id}/update`}><i className="fas fa-edit"></i>&nbsp;Edit</a>&nbsp;&nbsp;&nbsp;&nbsp;
            <a href={absoluteUrl}>View&nbsp;<i className="fas fa-chevron-right"></i></a>
        </div>
    )
}


class SharedOrganizationListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            tenantList,

            // Everything else...
            flashMessage, onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;
        const organizations = tenantList.results ? tenantList.results : [];
        return (
            <div className="container-fluid">
                <BootstrapPageLoadingAnimation isLoading={isLoading} />

                <div className="d-flex align-items-stretch">
                    <main id="main" role="main">
                <h1><i className="fas fa-building"></i>&nbsp;Organizations</h1>

                <FlashMessageComponent object={flashMessage} />

                <div className="col-sm-12 mx-auto mt-4 pt-4">

                    <section className="row text-center placeholders">
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                <Link to="/organization/add" className="d-block link-ndecor" title="add">
                                    <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                </Link>
                            </div>
                            <h4>Add</h4>
                            <div className="text-muted">Add an organization</div>
                        </div>
                        { /*
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                <Link to="#" className="d-block link-ndecor" title="Jobs">
                                    <h1 className="circle-title">10,000</h1>
                                </Link>
                            </div>
                            <h4>Jobs</h4>
                            <span className="text-muted">View your job history</span>
                        </div>
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                <Link to="#" className="d-block link-ndecor" title="Members">
                                    <h1 className="circle-title">2,200</h1>
                                </Link>
                            </div>
                            <h4>Client Members</h4>
                            <span className="text-muted">View Member Data</span>
                        </div>
                        <div className="col-sm-3 placeholder">
                            <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                <Link to="#" className="d-block link-ndecor" title="Tasks">
                                    <h1 className="circle-title">12</h1>
                                </Link>
                            </div>
                            <h4>Tasks</h4>
                            <span className="text-muted">View your tasks</span>
                        </div>
                        */ }
                    </section>

                    <RemoteListComponent
                        offset={offset}
                        limit={limit}
                        totalSize={totalSize}
                        organizations={organizations}
                        onTableChange={onTableChange}
                        isLoading={isLoading}
                    />

                    <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                    <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick} disabled={organizations.length === 0 || organizations.length < STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION}>
                        <i className="fas fa-check-circle"></i>&nbsp;Next
                    </button>

                    <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onPreviousClick} disabled={offset === 0}>
                        <i className="fas fa-check-circle"></i>&nbsp;Previous
                    </button>
                </div>
            </main>
                </div>
            </div>
        );
    }
}

export default SharedOrganizationListComponent;
