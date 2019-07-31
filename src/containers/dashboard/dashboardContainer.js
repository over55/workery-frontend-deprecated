import React, { Component } from 'react';
import { connect } from 'react-redux';

// import {
//     EXECUTIVE_GROUP_ID,
//     MANAGEMENT_GROUP_ID,
//     FRONTLINE_STAFF_GROUP_ID,
//     ASSOCIATE_GROUP_ID,
//     AREA_COORDINATOR_GROUP_ID,
//     MEMBER_GROUP_ID
// } from '../../constants/api';
import StaffDashboardComponent from "../../components/dashboard/staffDashboardComponent";
import { pullProfile } from "../../actions/profileAction";
import { pullDashboard } from "../../actions/dashboardActions";
import { getSubdomain } from '../../helpers/urlUtility';


class DashboardContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        this.state = {
            referrer: '',
        }

        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        this.props.pullProfile(this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        this.props.pullDashboard(getSubdomain(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(profile) {
        console.log(profile);
    }

    onFailedSubmissionCallback(errors) {
        this.setState({
            errors: errors
        })

        // // The following code will cause the screen to scroll to the top of
        // // the page. Please see ``react-scroll`` for more information:
        // // https://github.com/fisshy/react-scroll
        // var scroll = Scroll.animateScroll;
        // scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const dashboard = {
            customerCount: 17099,
            jobCount: 109,
            memberCount: 42,
            taskCount: 119,
            bulletinBoardItems: [
                {
                    id: 1,
                    text: "July 2, 2019: As of today's date we have no plumber or electrician available. Alvaro's commercial insurance has expired and Tom is too busy to take new jobs.",
                }, {
                    id: 2,
                    text: "TO ALL STAFF: Please do not call Frank Herbert for 48 hour updates & job completion. Rei (Franks's wife) emails me with all the updates.",
                }, {
                    id: 3,
                    text: "6/18/19 - TO ALL STAFF - Do not follow up on Harkonan or Ix jobs. Speak to Paul, or Leto in the office prior to taking any actions."
                }
            ],
            jobHistory: [
                {
                    id: 1,
                    clientName: "Frank Herbert",
                    associateName: "Vladimir Harkonan",
                    lastModified: "2019-01-01"
                }
            ],
            associateNews: [],
            teamJobHistory: [],
            commentsHistory: [],
        }
        return (
            <StaffDashboardComponent
                // dashboard={this.props.dashboard}
                user={this.props.user}
                dashboard={dashboard}
            />
        );
    };
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        dashboard: store.dashboardState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullProfile: (successCallback, failureCallback) => {
            dispatch(pullProfile(successCallback, failureCallback))
        },
        pullDashboard: (schema, successCallback, failureCallback) => {
            dispatch(pullDashboard(schema, successCallback, failureCallback))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
