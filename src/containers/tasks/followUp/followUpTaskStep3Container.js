import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';
import * as moment from 'moment';

import FollowUpTaskStep3Component from "../../../components/tasks/followUp/followUpTaskStep3Component";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { pullTaskDetail } from "../../../actions/taskActions";
import { validateTask2Step2Input } from "../../../validators/taskValidator";
import { postTaskFollowUpDetail } from "../../../actions/taskActions";
import { localStorageGetIntegerItem, localStorageRemoveItemsContaining, localStorageGetDateItem } from '../../../helpers/localStorageUtility';


class FollowUpTaskStep3Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            errors: {},
            isLoading: false,
            id: id,
            statusLabel: localStorage.getItem("workery-task-2-status-label"),
            status: localStorage.getItem("workery-task-2-status"),
            meetingDate: localStorageGetDateItem("workery-task-2-meetingDate"),
            comment: localStorage.getItem("workery-task-2-comment"),
            associate: localStorageGetIntegerItem("workery-task-2-associateId"),
            errors: {},
        }

        this.getPostData = this.getPostData.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onTaskDetailSuccessFetchCallback = this.onTaskDetailSuccessFetchCallback.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        let postData = Object.assign({}, this.state);

        postData.task_item = this.state.id;
        postData.hasAgreedToMeet = this.state.status;

        const meetingDateMoment = moment(this.state.meetingDate);
        postData.meetingDate = meetingDateMoment.format("YYYY-MM-DD");

        // Finally: Return our new modified data.
        console.log("getPostData |", postData);
        return postData;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullTaskDetail(this.state.id, this.onTaskDetailSuccessFetchCallback);
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

    onSuccessCallback(profile) {
        localStorageRemoveItemsContaining("workery-task-2-");
        this.props.setFlashMessage("success", "48 hour follow-up task has been successfully closed.");
        this.props.history.push("/tasks");
    }

    onFailureCallback(errors) {
        console.log(errors);
        this.setState({ errors: errors, isLoading: false, });

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    onTaskDetailSuccessFetchCallback(taskDetail) {
        console.log("onTaskDetailSuccessFetchCallback | taskDetail:", taskDetail); // For debugging purposes only.
        if (taskDetail !== undefined && taskDetail !== null && taskDetail !== "") {
            if (taskDetail.isClosed === true || taskDetail.isClosed === "true") {
                this.props.setFlashMessage("danger", "Task has been already been closed.");
                this.props.history.push("/tasks");
            }
        }
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        this.setState({ isLoading: true, errors:{} }, ()=>{
            this.props.postTaskFollowUpDetail(
                this.getPostData(),
                this.onSuccessCallback,
                this.onFailureCallback
            )
        });
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <FollowUpTaskStep3Component
                status={this.state.status}
                statusLabel={this.state.statusLabel}
                meetingDate={this.state.meetingDate}
                comment={this.state.comment}
                isLoading={this.state.isLoading}
                id={this.state.id}
                task={this.props.taskDetail}
                onBack={this.onBack}
                onClick={this.onClick}
                errors={this.state.errors}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        taskDetail: store.taskDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTaskDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTaskDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
        postTaskFollowUpDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postTaskFollowUpDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FollowUpTaskStep3Container);
