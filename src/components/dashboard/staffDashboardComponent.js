import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import isEmpty from 'lodash/isEmpty';


export default class StaffDashboardComponent extends Component {
    render() {
        const { dashboard } = this.props;
        const {
            customerCount, jobCount, memberCount, taskCount,
            bulletinBoardItems, jobHistory, clientNews, teamJobHistory, commentHistory
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
                                        <h1 className="circle-title">{customerCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-user-circle"></i>&nbsp;Clients</h4>
                                <div className="text-muted">View your client list</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/watches" className="d-block link-ndecor" title="Jobs">
                                        <h1 className="circle-title">{jobCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-shield-alt"></i>&nbsp;Jobs</h4>
                                <span className="text-muted">View your job history</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/clients" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">{memberCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Members</h4>
                                <span className="text-muted">View Member Data</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">{taskCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View your tasks</span>
                            </div>
                        </section>

                        <BulletinBoardComponent bulletinBoardItems={bulletinBoardItems} />
                        <JobHistoryComponent jobHistory={jobHistory} />
                        <ClientNewsComponent clientNews={clientNews} />
                        <TeamJobHistoryComponent teamJobHistory={teamJobHistory} />
                        <CommentHistoryComponent commentHistory={commentHistory} />

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
                            <Link className="btn btn-primary btn-lg px-4" to="#" role="button">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

    }
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
                dataField: 'jobID',
                text: 'Job #',
                sort: false
            },{
                dataField: 'clientName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'clientName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'lastModified',
                text: 'Last Modified',
                sort: false
            },,{
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


function jobHistoryLinkFormatter(cell, row){
    return (
        <Link to={`/en/jobs/summary/detail/${row.id}/lite/`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}



class ClientNewsComponent extends Component {
    render() {
        const { clientNews } = this.props
        if (clientNews === null || clientNews === undefined || isEmpty(clientNews)) {
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
                dataField: 'clientName',
                text: 'Assocate Name',
                sort: false,
                formatter: clientLinkFormatter
            },{
                dataField: 'reason',
                text: 'Reason',
                sort: false
            },{
                dataField: 'start',
                text: 'Start',
                sort: false
            },{
                dataField: 'awayUntil',
                text: 'Away Until',
                sort: false
            }];

            return (
                <div className="jumbotron">
                    <h1 className="display-4"><i className="fas fa-bullhorn"></i>&nbsp;Client News</h1>
                    <div class="table-responsive-sm my-3">
                        <BootstrapTable
                            bootstrap4
                            keyField='id'
                            data={ clientNews }
                            columns={ columns }
                            striped
                            bordered={ false }
                            noDataIndication="There are no recent tasks at the moment"
                        />
                        <p class="lead">
                            <Link className="btn btn-primary btn-lg px-4" to="#" role="button">
                                <i className="fas fa-plus"></i>&nbsp;Add
                            </Link>
                        </p>
                    </div>
                </div>
            );
        }

    }
}


function clientLinkFormatter(cell, row){
    return (
        <Link to={`/en/jobs/summary/detail/${row.id}/lite/`}>
            {row.clientName}
        </Link>
    )
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
                dataField: 'jobID',
                text: 'Job #',
                sort: false
            },{
                dataField: 'clientName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'clientName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'lastModified',
                text: 'Last Modified',
                sort: false
            },,{
                dataField: 'id',
                text: '',
                sort: false,
                formatter: teamJobHistoryLinkFormatter
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
                dataField: 'jobID',
                text: 'Job #',
                sort: false
            },{
                dataField: 'text',
                text: 'Comment',
                sort: false
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
                </div>
            );
        }

    }
}


function commentHistoryLinkFormatter(cell, row){
    return (
        <Link to={`/en/jobs/summary/detail/${row.id}/lite/`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}
