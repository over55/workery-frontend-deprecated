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
            tasks,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        // DEVELOPERS NOTE:
        // Where did `2` and `3` values come from? These are the `true` and
        // `false` values specified by `django-rest-framework` in the API.
        const isClosedSelectOptions = {
            3: 'Pending',
            2: 'Closed',
        };

        const typeOfSelectOptions = {
            1: 'Assign associate',
            2: 'Follow up is job complete',
            3: 'Follow up customer survey',
            4: 'Follow up did associate accept job',
            5: 'Follow up was ongoing job updated',
        };

        /*
        ASSIGNED_ASSOCIATE_TASK_ITEM_TYPE_OF_ID = 1
        FOLLOW_UP_IS_JOB_COMPLETE_TASK_ITEM_TYPE_OF_ID = 2
        FOLLOW_UP_CUSTOMER_SURVEY_TASK_ITEM_TYPE_OF_ID = 3
        FOLLOW_UP_DID_ASSOCIATE_ACCEPT_JOB_TASK_ITEM_TYPE_OF_ID = 4
        UPDATE_ONGOING_JOB_TASK_ITEM_TYPE_OF_ID = 5

        TASK_ITEM_TYPE_OF_CHOICES = (
            (ASSIGNED_ASSOCIATE_TASK_ITEM_TYPE_OF_ID, _('Assign associate')),
            (FOLLOW_UP_IS_JOB_COMPLETE_TASK_ITEM_TYPE_OF_ID, _('Follow up is job complete')),
            (FOLLOW_UP_CUSTOMER_SURVEY_TASK_ITEM_TYPE_OF_ID, _('Follow up customer survey')),
            (FOLLOW_UP_DID_ASSOCIATE_ACCEPT_JOB_TASK_ITEM_TYPE_OF_ID, _('Follow up did associate accept job')),
            (UPDATE_ONGOING_JOB_TASK_ITEM_TYPE_OF_ID, _('Follow up was ongoing job updated')),
        )

        */


        const columns = [{
            dataField: 'orderTypeOf',
            text: '',
            sort: false,
            formatter: iconFormatter
        },{
            dataField: 'dueDate',
            text: 'Due Date',
            sort: true,
            formatter: dueDateFormatter,
        },{
            dataField: 'typeOf',
            text: 'Task',
            sort: true,
            filter: selectFilter({
                options: typeOfSelectOptions,
                // defaultValue: 4, // Note: `4` is `pending`.
                // withoutEmptyOption: true
            }),
            formatter: typeOfFormatter,
        },{
            dataField: 'customerName',
            text: 'Client',
            sort: true,
        },{
            dataField: 'associateName',
            text: 'Associate',
            sort: true,
        },{
            dataField: 'isClosed',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: isClosedSelectOptions,
            }),
            formatter: statusFormatter
        },{
            dataField: 'id',
            text: '',
            sort: false,
            formatter: detailLinkFormatter
        }];

        const defaultSorted = [{
            dataField: 'dueDate',
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
                data={ tasks }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no tasks at the moment"
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
    switch(row.orderTypeOf) {
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


function typeOfFormatter(cell, row){
    return row.title
}


function dueDateFormatter(cell, row){
    return row.dueDate ? <Moment format="YYYY/MM/DD">{row.dueDate}</Moment> : "-";
}


function statusFormatter(cell, row){
    switch(row.isClosed) {
        case false:
            return <i className="fas fa-clock"></i>;
            break;
        case true:
            return <i className="fas fa-check-circle"></i>;
            break;
        default:
        return <i className="fas fa-question-circle"></i>;
            break;
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
        <Link to={`/task/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class OrderTaskListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            taskList,

            // Everything else...
            flashMessage, onTableChange, isLoading, id
        } = this.props;

        const tasks = (taskList && taskList.results) ? taskList.results : [];

        return (
            <div>
                <BootstrapPageLoadingAnimation isLoading={isLoading} />
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                           <Link to="/dashboard"><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</Link>
                        </li>
                        <li className="breadcrumb-item" aria-current="page">
                            <Link to={`/orders`}><i className="fas fa-wrench"></i>&nbsp;Orders</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-wrench"></i>&nbsp;Order # {id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
                        </li>
                    </ol>
                </nav>

                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-tasks"></i>&nbsp;Tasks</h1>

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
                        <div id="step-3" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-tasks"></i>&nbsp;</span><span className="">Tasks</span>
                            </strong>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/order/${id}/activity-sheets`}>
                                <span className="num"><i className="fas fa-id-badge"></i>&nbsp;</span><span className="">Activity Sheets</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey">
                            <Link to={`/order/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
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
                            tasks={tasks}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default OrderTaskListComponent;
