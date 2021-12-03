import isEmpty from "lodash/isEmpty";
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css';
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
            offset, limit, totalSize,

            // Data
            activitySheetItems,

            // Everything else.
            onTableChange, isLoading
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
    if (row.orderId === null || row.orderId === undefined || row.orderId === "None") { return "-"; }
    return (
        <Link to={`/order/${row.orderId}`} target="_blank">
            {row.orderId.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
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


function orderNameFormatter(cell, row){
    if (row.orderName === null || row.orderName === undefined || row.orderName === "None") { return "-"; }
    return (
        <Link to={`/order/${row.orderId}`} target="_blank">
            {row.orderName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


function stateFormatter(cell, row){
    return row.state === 1 ? "Accepted" : "Declined";
}

function createdAtFormatter(cell, row){
    return <Moment format="MM/DD/YYYY hh:mm:ss a">{row.createdAt}</Moment>;
}


export default class AdminOrderActivitySheetListComponent extends Component {
    render() {
        const {
            // Pagination
            offset, limit, totalSize,

            // Data
            activitySheetItems,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, order
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="offset">
                            <Link to="/orders"><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="offset">
                            <i className="fas fa-wrench"></i>&nbsp;Order # {order.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-wrench"></i>&nbsp;View Order</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/order/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/order/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/order/${id}/tasks`}>
                                <span className="num"><i className="fas fa-tasks"></i>&nbsp;</span><span className="">Tasks</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-id-card-alt"></i>&nbsp;</span><span className="">Activity</span>
                            </strong>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/order/${id}/files`}>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </Link>
                        </div>
                        <div id="step-7" className="st-grey">
                            <Link to={`/order/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        {isEmpty(order)===false &&
                            <RemoteListComponent
                                offset={offset}
                                limit={limit}
                                totalSize={totalSize}
                                activitySheetItems={activitySheetItems}
                                onTableChange={onTableChange}
                                isLoading={isLoading}
                            />
                        }
                    </div>
                </div>
            </div>
        );
    }
}
