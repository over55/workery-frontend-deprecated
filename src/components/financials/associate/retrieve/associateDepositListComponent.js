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
import NumberFormat from 'react-number-format';

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
            depositList,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const columns = [{
            dataField: 'paidToLabel',
            text: 'Paid to',
            sort: false,
        },{
            dataField: 'paidForLabel',
            text: 'Paid for',
            sort: false,
        },{
            dataField: 'paidAt',
            text: 'Paid at',
            sort: false,
            formatter: paidAtFormatter,
        },{
            dataField: 'depositMethodLabel',
            text: 'Deposit method',
            sort: false,
        },{
            dataField: 'amount',
            text: 'Amount',
            sort: false,
            formatter: amountFormatter,
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: functionsFormatter,
        }];

        const paginationOption = {
            page: page,
            sizePerPage: sizePerPage,
            totalSize: totalSize,
            sizePerPageList: [{
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
                data={ depositList }
                columns={ columns }
                striped
                bordered={ false }
                noDataIndication="There are no activity sheets at the moment"
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


function jobFormatter(cell, row){
    if (row.job === null || row.job === undefined || row.job === "None") { return "-"; }
    return (
        <Link to={`/order/${row.job}`} target="_blank">
            {row.job.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}&nbsp;<i className="fas fa-external-link-alt"></i>
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


export default class AssociateOrderActivitySheetListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            depositList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id, order, invoice
        } = this.props;
        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to="/company-financials"><i className="fas fa-credit-card"></i>&nbsp;Financials</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-money-check-alt"></i>&nbsp;Order #{id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-money-check-alt"></i>&nbsp;View Financial Details</h1>

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/company-financial/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-hand-holding-usd"></i>&nbsp;</span><span className="">Payments</span>
                            </strong>
                        </div>
                        <div id="step-3" className="st-grey">
                            <Link to={`/company-financial/${id}/invoice`}>
                                <span className="num"><i className="fas fa-file-invoice"></i>&nbsp;</span><span className="">Invoice</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/company-financial/${id}/operations`}>
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

                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            depositList={depositList}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />

                        <form>
                            <div className="form-group">
                            <Link className="btn btn-success btn-lg mt-4 float-right pl-4 pr-4" to={`/company-financial/${id}/deposit/create/step-1`}>
                                <i className="fas fa-plus"></i>&nbsp;Add Payment
                            </Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        );
    }
}
