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
            bulletinBoardItems, jobHistory
        } = dashboard;
        return (
            <div className="container-fluid">
                <div className="d-flex align-items-stretch">
                    <main id="main">
                        <h1><i className="fas fa-tachometer-alt"></i>&nbsp;Dashboard</h1>
                        <section className="row text-center placeholders">
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-pink">
                                    <Link to="/members" className="d-block link-ndecor" title="Clients">
                                        <h1 className="circle-title">{customerCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-users"></i>&nbsp;Clients</h4>
                                <div className="text-muted">View Clients</div>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dgreen">
                                    <Link to="/watches" className="d-block link-ndecor" title="Jobs">
                                        <h1 className="circle-title">{jobCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-shield-alt"></i>&nbsp;Jobs</h4>
                                <span className="text-muted">View Jobs</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-dblue">
                                    <Link to="/associates" className="d-block link-ndecor" title="Members">
                                        <h1 className="circle-title">{memberCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-crown"></i>&nbsp;Members</h4>
                                <span className="text-muted">View Members</span>
                            </div>
                            <div className="col-sm-3 placeholder">
                                <div className="rounded-circle mx-auto mt-4 mb-4 circle-200 bg-orange">
                                    <Link to="/tasks" className="d-block link-ndecor" title="Items">
                                        <h1 className="circle-title">{taskCount}</h1>
                                    </Link>
                                </div>
                                <h4><i className="fas fa-tasks"></i>&nbsp;Tasks</h4>
                                <span className="text-muted">View Tasks</span>
                            </div>
                        </section>

                        <AnnouncementComponent bulletinBoardItems={bulletinBoardItems} />
                        <JobHistoryComponent jobHistory={jobHistory} />





                    </main>
                </div>
            </div>
        );
    }
}


class AnnouncementComponent extends Component {
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
                dataField: 'clientName',
                text: 'Client Name',
                sort: false
            },{
                dataField: 'associateName',
                text: 'Associate Name',
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



class RecentTaskListComponent extends Component {
    render() {
        const { latestTasks } = this.props;

        const columns = [{
            dataField: 'watchName',
            text: 'Watch Name',
            sort: false
        },{
            dataField: 'prettyTypeOf',
            text: 'Type',
            sort: false
        },{
            dataField: 'slug',
            text: '',
            sort: false,
            formatter: recentTaskLinkFormatter
        }];

        return (
            <div className="row">
                <div className="col-md-12">
                    <h2>
                        <i className="fas fa-list"></i>&nbsp;Recent Task List
                    </h2>

                    <BootstrapTable
                        bootstrap4
                        keyField='slug'
                        data={ latestTasks }
                        columns={ columns }
                        striped
                        bordered={ false }
                        noDataIndication="There are no recent tasks at the moment"
                    />

                    <Link to="/tasks" className="float-right">See more&nbsp;<i className="fas fa-chevron-right"></i></Link>

                </div>
            </div>
        );
    }
}


function recentTaskLinkFormatter(cell, row){
    // DEVELOPERS NOTE:
    // WE ARE ASSIGNING AN ID TO THE URL. THIS IS WHERE WE NEED TO ADD MORE IDS
    // IF HAVE MORE DIFFERENT TYPES.
    let typeOfID = 0;
    switch(row.typeOf) {
        case "unassigned-watch-associate":
            typeOfID = 1;
            break;
        case "unassigned-watch-area-coordinator":
            typeOfID = 2;
            break;
        default:
           typeOfID = 0;
           break;
    }
    return (
        <Link to={`/task/${typeOfID}/${row.slug}/step-1`}>
            View&nbsp;<i className="fas fa-chevron-right"></i>
        </Link>
    )
}
