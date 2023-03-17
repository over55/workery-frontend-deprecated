import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory from 'react-bootstrap-table2-filter';
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
            deactivatedClients,

            // Everything else.
            onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        const columns = [{
            dataField: 'name',
            text: 'Name',
            sort: true
        },{
            dataField: 'deactivationReasonPlusDeactivationReasonOther',
            text: 'Reason',
            sort: false,
            formatter: deactivationReasonFormatter
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
                data={ deactivatedClients }
                columns={ columns }
                striped
                bordered={ false }
                noDataIndication="There are no deactivatedClients at the moment"
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


function deactivationReasonFormatter(cell, row){

    switch(row.deactivationReason) {
        case 0:
            return <>Not Specified deactivation reason</>;
            break;
        case 1:
            return <>{row.deactivationReasonOther}</>;
            break;
        case 2:
            return <>Blacklisted</>;
            break;
        case 3:
            return <>Moved</>;
            break;
        case 4:
            return <>Deceased</>;
            break;
        case 5:
            return <>Do not contact</>;
            break;
        default:
            return <>Unknown</>;
            break;
    }
}

function detailLinkFormatter(cell, row){
    return (
        <Link to={`/client/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}

class DeactivatedClientListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            deactivatedClientList,

            // Everything else...
            flashMessage, onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        const deactivatedClients = deactivatedClientList.results ? deactivatedClientList.results : [];

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
                            <i className="fas fa-frown"></i>&nbsp;Deactivated Clients
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-frown"></i>&nbsp;Deactivated Clients</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            deactivatedClients={deactivatedClients}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                        <span className="react-bootstrap-table-pagination-total">&nbsp;Total { totalSize } Results</span>

                        <button type="button" className="btn btn-lg float-right pl-4 pr-4 btn-success" onClick={onNextClick} disabled={deactivatedClients.length === 0 || deactivatedClients.length < STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION}>
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

export default DeactivatedClientListComponent;
