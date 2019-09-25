import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    EXECUTIVE_GROUP_ID,
    MANAGEMENT_GROUP_ID,
    FRONTLINE_GROUP_ID,
    ASSOCIATE_GROUP_ID,
//     AREA_COORDINATOR_GROUP_ID,
//     MEMBER_GROUP_ID
} from '../../constants/api';
import AdminDashboardComponent from "../../components/dashboard/adminDashboardComponent";
import AssociateDashboardComponent from "../../components/dashboard/associateDashboardComponent";
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
        const { groupId } = this.props.user;
        if (groupId === EXECUTIVE_GROUP_ID || groupId === MANAGEMENT_GROUP_ID || groupId === FRONTLINE_GROUP_ID) {
            return (
                <AdminDashboardComponent
                    user={this.props.user}
                    dashboard={this.props.dashboard}
                />
            );
        }
        if (groupId === ASSOCIATE_GROUP_ID) {
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
