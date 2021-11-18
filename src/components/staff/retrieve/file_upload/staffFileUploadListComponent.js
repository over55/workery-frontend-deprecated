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
import {
    RESIDENTIAL_CUSTOMER_TYPE_OF_ID,
    COMMERCIAL_CUSTOMER_TYPE_OF_ID,
} from '../../../../constants/api';


const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">&nbsp;Showing { from } to { to } of { size } Results</span>
);


class RemoteListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            staffFiles,

            // Everything else.
            onTableChange, isLoading
        } = this.props;

        const selectOptions = {
            3: 'Active',
            2: 'Archived',
        };

        const columns = [
        {
            dataField: 'state',
            text: 'Status',
            sort: false,
            filter: selectFilter({
                options: selectOptions,
                defaultValue: 3,
                withoutEmptyOption: true
            }),
            formatter: statusFormatter
        },
        {
            dataField: 'title',
            text: 'Title',
            sort: false
        },
        {
            dataField: 'description',
            text: 'Description',
            sort: false
        },
        {
            dataField: 'createdAt',
            text: 'Created At',
            sort: true,
            formatter: createdAtFormatter
        },
        {
            dataField: 'fileUrl',
            text: 'File',
            sort: false,
            formatter: fileFormatter
        },
        // {
        //     dataField: 'email',
        //     text: 'Email',
        //     sort: true,
        //     formatter: emailFormatter,
        // },{
        //     dataField: 'slug',
        //     text: 'Financials',
        //     sort: false,
        //     formatter: financialExternalLinkFormatter
        // },{
        //     dataField: 'id',
        //     text: 'Details',
        //     sort: false,
        //     formatter: detailLinkFormatter
        // }
        ];

        const defaultSorted = [{
            dataField: 'createdAt',
            order: 'asc'
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
                data={ staffFiles }
                columns={ columns }
                defaultSorted={ defaultSorted }
                striped
                bordered={ false }
                noDataIndication="There are no staff at the moment"
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
        case 0:
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        case 1:
            return <i className="fas fa-check-circle" style={{ color: 'green' }}></i>;
            break;
        case 2:
            return <i className="fas fa-archive" style={{ color: 'blue' }}></i>;
            break;
        default:
            return <i className="fas fa-question-circle" style={{ color: 'blue' }}></i>;
            break;
    }
}


function fileFormatter(cell, row){
    return (
        <div>
            {row.state === 0 &&
                <strong>
                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                </strong>
            }
            {row.state === 1 &&
                <a href={row.fileUrl} target="_blank">
                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                </a>
            }
            {row.state === 2 &&
                <strong>
                    <i className="fas fa-cloud-download-alt"></i>&nbsp;Download
                </strong>
            }
            &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
            {row.state === 0 &&
                <strong>
                    <i className="fas fa-archive"></i>&nbsp;Archived
                </strong>
            }
            {row.state === 1 &&
                <Link to={`/staff/${row.staffId}/file/archive/${row.id}`}>
                    <i className="fas fa-archive"></i>&nbsp;Archive
                </Link>
            }
            {row.state === 2 &&
                <strong>
                    <i className="fas fa-archive"></i>&nbsp;Archived
                </strong>
            }
        </div>
    )
}


function createdAtFormatter(cell, row){
    return <Moment format="MM/DD/YYYY hh:mm:ss a">{row.createdAt}</Moment>
}


class StaffFileUploadListComponent extends Component {
    render() {
        const {
            // Pagination
            page, sizePerPage, totalSize,

            // Data
            staffFiles, staff, id,

            // Everything else...
            flashMessage, onTableChange, isLoading
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
                            <Link to="/staff"><i className="fas fa-user-circle"></i>&nbsp;Staffs</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            <i className="fas fa-user"></i>&nbsp;{staff && staff.name}
                        </li>
                    </ol>
                </nav>
                <FlashMessageComponent object={flashMessage} />

                <h1><i className="fas fa-user"></i>&nbsp;{staff && staff.name}</h1>

                {staff.state === 0 &&
                    <div className="alert alert-info" role="alert">
                        <strong><i className="fas fa-archive"></i>&nbsp;Archived</strong> - This staff is archived and is read-only.
                    </div>
                }

                <div className="row">
                    <div className="step-navigation">
                        <div id="step-1" className="st-grey">
                            <Link to={`/staff/${id}`}>
                                <span className="num"><i className="fas fa-portrait"></i>&nbsp;</span><span className="">Summary</span>
                            </Link>
                        </div>
                        <div id="step-2" className="st-grey">
                            <Link to={`/staff/${id}/full`}>
                                <span className="num"><i className="fas fa-id-card"></i>&nbsp;</span><span className="">Details</span>
                            </Link>
                        </div>
                        <div id="step-4" className="st-grey">
                            <Link to={`/staff/${id}/comments`}>
                                <span className="num"><i className="fas fa-comments"></i>&nbsp;</span><span className="">Comments</span>
                            </Link>
                        </div>
                        <div id="step-5" className="st-grey active">
                            <strong>
                                <span className="num"><i className="fas fa-cloud"></i>&nbsp;</span><span className="">Files</span>
                            </strong>
                        </div>
                        <div id="step-6" className="st-grey">
                            <Link to={`/staff/${id}/operations`}>
                                <span className="num"><i className="fas fa-ellipsis-h"></i>&nbsp;</span><span className="">Operations</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {staff.state === 1 && <div className="row">
                    <div className="col-md-12">
                        <section className="row text-center placeholders">
                            <div className="col-sm-12 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to={`/staff/${id}/file/add`} className="d-block link-ndecor" title="Staffs">
                                        <span className="r-circle"><i className="fas fa-plus fa-3x"></i></span>
                                    </Link>
                                </div>
                                <h4>Upload</h4>
                                <div className="text-muted">Upload a file</div>
                            </div>
                        </section>
                    </div>
                </div>}

                <div className="row">
                    <div className="col-md-12">
                        <h2>
                            <i className="fas fa-table"></i>&nbsp;List
                        </h2>
                        <RemoteListComponent
                            page={page}
                            sizePerPage={sizePerPage}
                            totalSize={totalSize}
                            staffFiles={staffFiles}
                            onTableChange={onTableChange}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default StaffFileUploadListComponent;
