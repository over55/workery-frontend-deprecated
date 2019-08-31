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
            orders,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            "running": 'Running',
            "idle": 'Idle',
            "terminated": 'Terminated',
        };

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Job #',
            sort: true,
            formatter: idFormatter,
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
            formatter: associateNameFormatter,
        },{
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions,
                defaultValue: 'running',
                withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },{
            dataField: 'slug',
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
                data={ orders }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no orders at the moment"
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
        row.id && row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })
    );
}


function associateNameFormatter(cell, row){
    if (row.associateName === null || row.associateName === undefined || row.associateName === "None") { return "-"; }
    return (
        <Link to={`/associate/${row.associate}`} target="_blank">
            {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    );
}


function statusFormatter(cell, row){
    return row.prettyState;
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/ongoing-order/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class OngoingOrderListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            ongoingOrderList,

            // Everything else...
            flashMessage, onTableChange, isLoading
        } = this.props;

        const orders = ongoingOrderList.results ? ongoingOrderList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-undo-alt"></i>&nbsp;Ongoing Orders
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-undo-alt"></i>&nbsp;Ongoing Orders</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            orders={orders}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OngoingOrderListComponent;
