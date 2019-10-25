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

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";


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

        const columns = [{
            dataField: 'typeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'id',
            text: 'Job #',
            // sort: true,
            formatter: idFormatter,
        },{
            dataField: 'invoiceServiceFeePaymentDate',
            text: 'Service Fee Payment Date',
            // sort: true,
            formatter: completionDateFormatter,
        },{
            dataField: 'invoiceLabourAmount',
            text: 'Actual Labour',
            // sort: true,
            // formatter: idFormatter,
        },{
            dataField: 'invoiceServiceFee',
            text: 'Service Fee Type',
            // sort: true,
            // formatter: idFormatter,
        },{
            dataField: 'invoiceServiceFeeAmount',
            text: 'Service Fee Owing',
            // sort: true,
            // formatter: idFormatter,
        },{
            dataField: 'invoiceActualServiceFeeAmountPaid',
            text: 'Service Fee Paid',
            // sort: true,
            // formatter: idFormatter,
        },{
            dataField: 'invoiceBalanceOwingAmount',
            text: 'Balance',
            // sort: true,
            // formatter: idFormatter,
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
                filter={ filterFactory() }
                loading={ isLoading }
                // overlay={ overlayFactory({ spinner: true, styles: { overlay: (base) => ({...base, background: 'rgba(0, 128, 128, 0.5)'}) } }) }
            />
        );
    }
}


function iconFormatter(cell, row){
    const icons = [];
    if (row.typeOf === 2) {
        icons.push(<i className="fas fa-building"></i>)
    }
    else if (row.typeOf === 1) {
        icons.push(<i className="fas fa-home"></i>)
    }
    else {
        icons.push(<i className="fas fa-question"></i>)
    }
    if (row.isOngoing) {
        icons.push(" ");
        icons.push(<i className="fas fa-redo-alt"></i>)
    }
    return <div>{icons}</div>;
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
    )
}


function startDateFormatter(cell, row){
    return row.startDate ? <Moment format="MM/DD/YYYY">{row.startDate}</Moment> : "-";
}


function assignmentDateFormatter(cell, row){
    return row.assignmentDate ? <Moment format="MM/DD/YYYY">{row.assignmentDate}</Moment> : "-";
}


function completionDateFormatter(cell, row){
    return row.completionDate ? <Moment format="MM/DD/YYYY">{row.completionDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    return row.prettyState;
}


function detailLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.id}`} target="_blank">
            View&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}


export default class AdminAssociateBalanceOperationComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            orderList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, associate
        } = this.props;

        const orders = orderList.results ? orderList.results : [];
        console.log("orderList >>>", orderList)

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/associates"><i className="fas fa-crown"></i>&nbsp;Associates</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.fullName}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.fullName}</h1>

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;Account Balance List
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
