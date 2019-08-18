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
            page, sizePerPage, totalSize,

            // Data
            clients,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            "active": 'Active',
            "inactive": 'Inactive',
        };

        const columns = [{
            dataField: 'icon',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
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
                defaultValue: 'active',
                withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },{
            dataField: 'slug',
            text: 'Financials',
            sort: false,
            formatter: financialExternalLinkFormatter
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
                data={ clients }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no clients at the moment"
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


function financialExternalLinkFormatter(cell, row){
    return (
        <a target="_blank" href={`/financial/${row.id}`}>
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </a>
    )
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/client/${row.id}`} target="_blank">
            View Client&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


export default class ClientSearchResultComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            clientList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const clients = clientList.results ? clientList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/clients`}><i className="fas fa-user-circle"></i>&nbsp;Clients</Link>
                        </li>
                        <li className="breadcrumb-item">
                           <Link to={`/clients/search`}><i className="fas fa-search"></i>&nbsp;Search</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-search"></i>&nbsp;Clients Search</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-list"></i>&nbsp;Search Results
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            clients={clients}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
