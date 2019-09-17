import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import isEmpty from 'lodash/isEmpty';
import Moment from 'react-moment';
// import 'moment-timezone';


export default class StaffDashboardComponent extends Component {
    render() {
        const { dashboard } = this.props;
        const {
            customerCount, jobCount, memberCount, tasksCount,
            bulletinBoardItems, lastModifiedJobsByUser, awayLog, lastModifiedJobsByTeam, pastFewDayComments
        } = dashboard;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/clients" className="d-block link-ndecor" title="Clients">
                                        <h1 className="circle-title">{customerCount && customerCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-user-circle"></i>&nbsp;Clients</h4>
                                <div className="text-muted">View your client list</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/orders" className="d-block link-ndecor" title="Jobs">
                                        <h1 className="circle-title">{jobCount && jobCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-wrench"></i>&nbsp;Jobs</h4>
                                <span className="text-muted">View your job history</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/associates" className="d-block link-ndecor" title="Associates">
                                        <h1 className="circle-title">{memberCount && memberCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Associates</h4>
                                <span className="text-muted">View associate data</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">{tasksCount && tasksCount.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View your tasks</span>
                            </div>
                        </section>

                        <BulletinBoardComponent bulletinBoardItems={bulletinBoardItems} />
                        <JobHistoryComponent jobHistory={lastModifiedJobsByUser} />
                        <AwayLogComponent awayLog={awayLog} />
                        <TeamJobHistoryComponent teamJobHistory={lastModifiedJobsByTeam} />
                        <CommentHistoryComponent commentHistory={pastFewDayComments} />

                    </main>
                </div>
            </div>
        );
    }
}


class BulletinBoardComponent extends Component {
    render() {
        const { bulletinBoardItems } = this.props
        if (bulletinBoardItems === null || bulletinBoardItems === undefined || isEmpty(bulletinBoardItems)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Announcements</h1>
                    <p className="lead">There are no announcements. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'text',
                text: 'Messages',
                sort: false
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: newsEditLinkFormatter
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: newsDeleteLinkFormatter
            }];

            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-newspaper"></i>&nbsp;Office News</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ bulletinBoardItems }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent tasks at the moment"
                        />
                        <p class="lead">
                            <Link className="btn btn-success btn-lg px-4" to="/settings/bulletin-board-items/add" role="button">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

    }
}

function newsEditLinkFormatter(cell, row){
    return (
        <Link to={`/settings/bulletin-board-item/${row.id}/update`}>
            <i class="fas fa-pencil-alt"></i>
        </Link>
    );
}

function newsDeleteLinkFormatter(cell, row){
    return (
        <Link className="text-danger" to={`/settings/bulletin-board-item/${row.id}/delete`}>
            <i class="fas fa-times"></i>
        </Link>
    );
}

/**
 *  LATEST ORDERS BY YOU
 */
class JobHistoryComponent extends Component {
    render() {
        const { jobHistory } = this.props
        if (jobHistory === null || jobHistory === undefined || isEmpty(jobHistory)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-wrench"></i>&nbsp;Job History</h1>
                    <p className="lead">There are no jobs. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'id',
                text: 'Job #',
                sort: false,
                formatter: jobHistoryIDFormatter
            },{
                dataField: 'associateName',
                text: 'Associate Name',
                sort: false
            },{
                dataField: 'customerName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'lastModified',
                text: 'Last Modified',
                sort: false,
                formatter: jobHistoryLastModifiedFormatter
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: jobHistoryLinkFormatter
            }];

            return (
                <div>
                    <h1 className="display-4"><i className="fas fa-wrench"></i>&nbsp;Job History</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ jobHistory }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent jobs at the moment"
                        />
                    </div>
                </div>
            );
        }

    }
}


function jobHistoryIDFormatter(cell, row){
    return (
        <Link to={`/order/${row.id}`}>
            {row.id.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        </Link>
    )
}


function jobHistoryLastModifiedFormatter(cell, row){
    return (
        <Moment format="MM/DD/YYYY hh:mm:ss a">{row.lastModified}</Moment>
    )
}


function jobHistoryLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.id}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class AwayLogComponent extends Component {
    render() {
        const { awayLog } = this.props
        if (awayLog === null || awayLog === undefined || isEmpty(awayLog)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Client News</h1>
                    <p className="lead">There are no news. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'associateName',
                text: 'Associate Name',
                sort: false,
                formatter: associateLinkFormatter
            },{
                dataField: 'reason',
                text: 'Reason',
                sort: false,
                formatter: associateReasonFormatter
            },{
                dataField: 'startDate',
                text: 'Start',
                sort: false,
                formatter: associateStartDateFormatter
            },{
                dataField: 'untilDate',
                text: 'Away Until',
                sort: false,
                formatter: associateUntilDateFormatter,
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: associateEditLinkFormatter,
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: associateDeleteLinkFormatter,
            }];

            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Associate News</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ awayLog }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent tasks at the moment"
                        />
                        <p class="lead">
                            <Link className="btn btn-success btn-lg px-4" to="/settings/away-logs/add" role="button">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

    }
}

function associateEditLinkFormatter(cell, row){
    return (
        <Link to={`/settings/away-log/${row.id}/update`}>
            <i class="fas fa-pencil-alt"></i>
        </Link>
    )
}

function associateDeleteLinkFormatter(cell, row){
    return (
        <Link className="text-danger" to={`/settings/away-log/${row.id}/delete`}>
            <i class="fas fa-times"></i>
        </Link>
    )
}

function associateReasonFormatter(cell, row){
    switch (row.reason) {
        case 1:
            return (
                <div>
                    <i class="fas fa-umbrella"></i>&nbsp;{row.reasonOther}
                </div>
            );
            break;
        case 2:
            return (
                <div>
                    <i class="fas fa-plane"></i>&nbsp;Going on vacation
                </div>
            );
            break;
        case 3:
            return (
                <div>
                    <i class="fas fa-home"></i>&nbsp;Personal reasons
                </div>
            );
            break;
        case 4:
            return (
                <div>
                    <i class="fas fa-university"></i>&nbsp;Commercial insurance expired
                </div>
            );
            break;
        case 5:
            return (
                <div>
                    <i class="fas fa-university"></i>&nbsp;Police check expired
                </div>
            );
            break;
        default:
            return (null)
            break;
    }
}


function associateLinkFormatter(cell, row){
    return (
        <Link to={`/associate/${row.associate}`} id={row.associate}>
            {row.associateName}
        </Link>
    )
}

function associateStartDateFormatter(cell, row){
    if (row.startDate === undefined || row.startDate === null) {
        return "-";
    } else {
        return <Moment format="MM/DD/YYYY">{row.startDate}</Moment>;
    }
}


function associateUntilDateFormatter(cell, row){
    if (row.untilDate === undefined || row.untilDate === null) {
        return "Further notice.";
    } else {
        return <Moment format="MM/DD/YYYY">{row.untilDate}</Moment>;
    }
}



class TeamJobHistoryComponent extends Component {
    render() {
        const { teamJobHistory } = this.props
        if (teamJobHistory === null || teamJobHistory === undefined || isEmpty(teamJobHistory)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-users"></i>&nbsp;Team Job History</h1>
                    <p className="lead">There are no jobs. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'id',
                text: 'Job #',
                sort: false,
                formatter: jobHistoryIDFormatter
            },{
                dataField: 'associateName',
                text: 'Associate Name',
                sort: false
            },{
                dataField: 'customerName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'lastModified',
                text: 'Last Modified',
                sort: false,
                formatter: jobHistoryLastModifiedFormatter
            },{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: jobHistoryLinkFormatter
            }];

            return (
                <div>
                    <h1 className="display-4"><i className="fas fa-users"></i>&nbsp;Team Job History</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ teamJobHistory }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent jobs at the moment"
                        />
                    </div>
                </div>
            );
        }

    }
}


function teamJobHistoryLinkFormatter(cell, row){
    return (
        <Link to={`/en/jobs/summary/detail/${row.id}/lite/`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}


class CommentHistoryComponent extends Component {
    render() {
        const { commentHistory } = this.props
        if (commentHistory === null || commentHistory === undefined || isEmpty(commentHistory)) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-comment"></i>&nbsp;Comments Comment</h1>
                    <p className="lead">There are no comments. Feel free to add one.</p>

                    <p className="lead">
                        <Link className="btn btn-success btn-lg" to="/settings/announcements">
                            <i className="fas fa-plus"></i>&nbsp;Add
                        </Link>
                    </p>
                </div>
            );
        } else {
            const columns = [{
                dataField: 'about',
                text: 'Job #',
                sort: false,
                formatter: commentAboutFormatter
            },{
                dataField: 'text',
                text: 'Comment',
                sort: false
            },{
                dataField: 'about',
                text: '',
                sort: false,
                formatter: commentLinkFormatter
            }];

            return (
                <div>
                    <h1 className="display-4"><i className="fas fa-comment"></i>&nbsp;Comment History</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ commentHistory }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent comments at the moment"
                        />
                    </div>
                    <Link to={`/comments`} class="float-right">
                        See more comments&nbsp;<i class="fas fa-chevron-right"></i>
                    </Link>
                </div>
            );
        }

    }
}


function commentAboutFormatter(cell, row){
    return (
        <Link to={`/en/jobs/summary/detail/${row.id}/lite/`}>
            {row && row.about.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}
        </Link>
    )
}


function commentLinkFormatter(cell, row){
    return (
        <Link to={`/order/${row.about}`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}
