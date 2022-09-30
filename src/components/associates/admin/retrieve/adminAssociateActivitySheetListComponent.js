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
import Moment from 'react-moment';
// import 'moment-timezone';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import AwayLogAlertComponent from "../awayLogAlertComponent";


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);

const selectOptions = {
    0: 'Error',
    1: 'Accepted',
    2: 'Declined',
    3: 'Pending',
};

class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            activitySheetItems,

            // Everything else.
            onTableChange, isLoading, onNextClick, onPreviousClick,
        } = this.props;

        const columns = [{
            dataField: 'orderId',
            text: 'Job #',
            sort: false,
            formatter: jobFormatter,
        },{
            dataField: 'state',
            text: 'Has Accepted?',
            sort: false,
            filter: selectFilter({
                options: selectOptions
            }),
            formatter: stateFormatter,
        },{
            dataField: 'createdAt',
            text: 'Created At',
            sort: false,
            formatter: createdAtFormatter,
        },{
            dataField: 'comment',
            text: 'Reason',
            sort: false
        }];

        const defaultSorted = [{
            dataField: 'id',
            order: 'desc'
        }];

        return (
            <BootstrapTable
                bootstrap4
                keyField='id'
                data={ activitySheetItems }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no activity sheets at the moment"
                remote
                onTableChange={ onTableChange }
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function jobFormatter(cell, row){
    if (row.orderId === null || row.orderId === undefined || row.orderId === "None" || row.orderId === "") {
        if (row.ongoingOrderId === null || row.ongoingOrderId === undefined || row.orderId === "None" || row.ongoingOrderId === "") {
            return "-";
        }
        return (
            <Link to={`/ongoing-order/${row.ongoingOrderId}`} target="_blank">
                (<i className="fas fa-redo-alt"></i>)&nbsp;
                {row.ongoingOrderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
            </Link>
        )
    }
    return (
        <Link to={`/order/${row.orderId}`} target="_blank">
            {row.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}



function stateFormatter(cell, row){
    switch(row.state) {
        case 3:
            return <><i className="fas fa-pause-circle"></i>&nbsp;Pending</>;
            break;
        case 2:
            return <><i className="fas fa-times-circle"></i>&nbsp;Rejected</>;
            break;
        case 1:
            return <><i className="fas fa-check-circle"></i>&nbsp;Accepted</>;
            break;
        case 0:
            return <><i className="fas fa-times-circle"></i>&nbsp;Rejected</>;
            break;
        default:
            return <><i className="fas fa-question"></i></>;
            break;
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


function associateNameFormatter(cell, row){
    if (row.associateName === null || row.associateName === undefined || row.associateName === "None") { return "-"; }
    return (
        <Link to={`/associate/${row.associate}`} target="_blank">
            {row.associateName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function statusFormatter(cell, row){
    return row.prettyState;
}

function createdAtFormatter(cell, row){
    return <Moment format="MM/DD/YYYY hh:mm:ss a">{row.createdAt}</Moment>;
}

export default class AdminAssociateActivitySheetListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            activitySheetItemList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, associate, onNextClick, onPreviousClick,
        } = this.props;

        let activitySheetItems = [];
        if (activitySheetItemList && isEmpty(activitySheetItemList)===false) {
            activitySheetItems = activitySheetItemList.results ? activitySheetItemList.results : [];
        }

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="offset">
                            <Link to="/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="offset">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.name}
                        </li>
                    </ol>
                </nav>

                <AwayLogAlertComponent associate={associate} />

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.name}</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/associate/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/associate/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card-alt"></i>&nbsp;</span><span className="">Activity</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/associate/${id}/orders`}>
                                <span className="num"><i className="fas fa-wrench"></i>&nbsp;</span><span className="">Jobs</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/associate/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/associate/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/associate/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-chart-line"></i>&nbsp;Activity
                        </h2>
                        <RemoteListComponent
                            offset={offset}
                            limit={limit}
                            totalSize={totalSize}
                            activitySheetItems={activitySheetItems}
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
