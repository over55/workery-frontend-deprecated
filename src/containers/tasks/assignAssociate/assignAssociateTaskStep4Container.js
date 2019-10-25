import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssignAssociateTaskStep4Component from "../../../components/tasks/assignAssociate/assignAssociateTaskStep4Component";
import { pullTaskDetail } from "../../../actions/taskActions";
import { postTaskAssignAssociateDetail } from "../../../actions/taskActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { localStorageGetIntegerItem, localStorageRemoveItemsContaining } from '../../../helpers/localStorageUtility';


class AssignAssociateTaskStep4Container extends Component {
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
            id: id,
            statusLabel: localStorage.getItem("workery-task-1-status-label"),
            status: localStorage.getItem("workery-task-1-status"),
            comment: localStorage.getItem("workery-task-1-comment"),
            associateId: localStorageGetIntegerItem("workery-task-1-associateId"),
            associateFullName: localStorage.getItem("workery-task-1-associateFullName"),
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
        postData.state = this.state.status;
        postData.associate = this.state.associateId;

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
        localStorageRemoveItemsContaining("workery-task-1-");
        this.props.setFlashMessage("success", "Assign associate task has been successfully closed.");
        this.props.history.push("/order/"+this.props.taskDetail.job);
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
            this.props.postTaskAssignAssociateDetail(
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
            <AssignAssociateTaskStep4Component
                id={this.state.id}
                associateId={this.state.associateId}
                associateFullName={this.state.associateFullName}
                status={this.state.status}
                statusLabel={this.state.statusLabel}
                comment={this.state.comment}
                task={this.props.taskDetail}
                errors={this.state.errors}
                isLoading={this.state.isLoading}
                onBack={this.onBack}
                onClick={this.onClick}
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
        postTaskAssignAssociateDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postTaskAssignAssociateDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignAssociateTaskStep4Container);
