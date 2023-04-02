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
import NumberFormat from 'react-number-format';

import { BootstrapPageLoadingAnimation } from "../../../bootstrap/bootstrapPageLoadingAnimation";
import { FlashMessageComponent } from "../../../flashMessageComponent";
import AwayLogAlertComponent from "../awayLogAlertComponent";


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

        const columns = [
            {
            dataField: 'paidToLabel',
            text: 'Paid to',
            sort: false,
            formatter: paidToFormatter,
        },
        {
            dataField: 'paidForLabel',
            text: 'Paid for',
            sort: false,
            formatter: paidForFormatter,
        },{
            dataField: 'paidAt',
            text: 'Paid at',
            sort: false,
            formatter: paidAtFormatter,
        },{
            dataField: 'depositMethodLabel',
            text: 'Deposit method',
            sort: false,
            formatter: depositFormatter,
        },{
            dataField: 'amount',
            text: 'Amount',
            sort: false,
            formatter: amountFormatter,
        },
        {
            dataField: 'id',
            text: '',
            sort: false,
            formatter: functionsFormatter,
        }];

        const defaultSorted = [{
            dataField: 'created_time',
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


function jobFormatter(cell, row){
    if (row.job === null || row.job === undefined || row.job === "None") { return "-"; }
    return (
        <Link to={`/order/${row.job}`} target="_blank">
            {row.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}

function paidToFormatter(cell, row){
    switch(row.paidTo) {
        case 1:
            return "Organization";
            break;
        case 2:
            return "Associate";
            break;
        default:
            return "-";
            break;
    }
}

function paidForFormatter(cell, row){
    switch(row.paidFor) {
        case 1:
            return "Labour";
            break;
        case 2:
            return "Materials";
            break;
        case 3:
            return "Other Costs";
            break;
        default:
            return "-";
            break;
    }
}

function depositFormatter(cell, row){
    switch(row.depositMethod) {
        case 1:
            return "Debit";
            break;
        case 2:
            return "Credit";
            break;
        case 3:
            return "Cheque";
            break;
        case 4:
            return "Cash";
            break;
        default:
            return "-";
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


function orderNameFormatter(cell, row){
    if (row.orderName === null || row.orderName === undefined || row.orderName === "None") { return "-"; }
    return (
        <Link to={`/order/${row.order}`} target="_blank">
            {row.orderName}&nbsp;<i className="fas fa-external-link-alt"></i>
        </Link>
    )
}

function amountFormatter(cell, row){
    return <NumberFormat value={row.amount} displayType={'text'} thousandSeparator={true} prefix={'$'} />;
}

function paidAtFormatter(cell, row){
    return <Moment format="MM/DD/YYYY">{row.paidAt}</Moment>;
}

function functionsFormatter(cell, row){
    return <Link className="btn btn-danger btn-xs" to={`/payment/${row.id}/delete`}>
        <i className="fas fa-trash"></i>&nbsp;Delete
    </Link>
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
                            <i className="fas fa-user"></i>&nbsp;{associate && associate.name}
                        </li>
                    </ol>
                </nav>

                <AwayLogAlertComponent associate={associate} />
                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{associate && associate.name}</h1>

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
