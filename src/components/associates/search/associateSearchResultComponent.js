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
            associates,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            1: 'Active',
            0: 'Inactive',
        };

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
            sort: true,
            formatter: telephoneFormatter
        },{
            dataField: 'email',
            text: 'Email',
            sort: true,
            formatter: emailFormatter,
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions,
                defaultValue: 1,
                withoutEmptyOption: true
            }),
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
                data={ associates }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no associates at the moment"
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


class AssociateSearchResultComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            associateList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const associates = associateList.results ? associateList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/associates`}><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/associates/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-search"></i>&nbsp;Associates Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            associates={associates}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default AssociateSearchResultComponent;
