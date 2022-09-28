import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    EXECUTIVE_ROLE_ID,
    MANAGEMENT_ROLE_ID,
    FRONTLINE_ROLE_ID,
    ASSOCIATE_ROLE_ID,
//     AREA_COORDINATOR_ROLE_ID,
//     MEMBER_ROLE_ID
} from '../../constants/api';
import AdminDashboardComponent from "../../components/dashboard/adminDashboardComponent";
import AssociateDashboardComponent from "../../components/dashboard/associateDashboardComponent";
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
        this.props.pullDashboard(
            getSubdomain(),
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
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

    onSuccessfulSubmissionCallback(dashboardObj) {
        console.log("DashboardContainer|onSuccessfulSubmissionCallback|dashboardObj:\n", dashboardObj);
        // console.log("props.dashboard --->", this.props.dashboard);
        // console.log("dashboardObj    --->", dashboardObj);
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
        const { roleId } = this.props.user;
        if (roleId === EXECUTIVE_ROLE_ID || roleId === MANAGEMENT_ROLE_ID || roleId === FRONTLINE_ROLE_ID) {
            return (
                <AdminDashboardComponent
                    user={this.props.user}
                    dashboard={this.props.dashboard}
                />
            );
        }
        if (roleId === ASSOCIATE_ROLE_ID) {
            return (
                <AssociateDashboardComponent
                    user={this.props.user}
                    dashboard={this.props.dashboard}
                />
            );
        }
        return <p>Forbidden: Invalid group ID.</p>

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
        pullDashboard: (schema, successCallback, failureCallback) => {
            dispatch(pullDashboard(schema, successCallback, failureCallback))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardContainer);
