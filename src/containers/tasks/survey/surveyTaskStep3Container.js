import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SurveyTaskStep3Component from "../../../components/tasks/survey/surveyTaskStep3Component";
import { pullTaskDetail } from "../../../actions/taskActions";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { postTaskSurveyDetail } from "../../../actions/taskActions";
import {
    localStorageGetIntegerItem, localStorageGetBooleanItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';


class SurveyTaskStep3Container extends Component {
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
            // Misc.
            errors: {},
            isLoading: false,
            id: id,

            // Step 2
            wasSurveyConductedLabel: localStorage.getItem("workery-task-7-wasSurveyConducted-label"),
            wasSurveyConducted: localStorageGetBooleanItem("workery-task-7-wasSurveyConducted"),
            noSurveyConductedReasonLabel: localStorage.getItem("workery-task-7-noSurveyConductedReasonLabel"),
            noSurveyConductedReason: localStorageGetIntegerItem("workery-task-7-noSurveyConductedReason"),
            noSurveyConductedReasonOther: localStorage.getItem("workery-task-7-noSurveyConductedReasonOther"),
            comment: localStorage.getItem("workery-task-7-comment"),
            wasJobSatisfactoryLabel: localStorage.getItem("workery-task-7-wasJobSatisfactory-label"),
            wasJobSatisfactory: localStorageGetBooleanItem("workery-task-7-wasJobSatisfactory"),
            wasJobFinishedOnTimeAndOnBudgetLabel: localStorage.getItem("workery-task-7-wasJobFinishedOnTimeAndOnBudget-label"),
            wasJobFinishedOnTimeAndOnBudget: localStorageGetBooleanItem("workery-task-7-wasJobFinishedOnTimeAndOnBudget"),
            wasAssociatePunctualLabel: localStorage.getItem("workery-task-7-wasAssociatePunctual-label"),
            wasAssociatePunctual: localStorageGetBooleanItem("workery-task-7-wasAssociatePunctual"),
            wasAssociateProfessionalLabel: localStorage.getItem("workery-task-7-wasAssociateProfessional-label"),
            wasAssociateProfessional: localStorageGetBooleanItem("workery-task-7-wasAssociateProfessional"),
            wouldCustomerReferOurOrganizationLabel: localStorage.getItem("workery-task-7-wouldCustomerReferOurOrganization-label"),
            wouldCustomerReferOurOrganization: localStorageGetBooleanItem("workery-task-7-wouldCustomerReferOurOrganization"),
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
        localStorage.removeItem("workery-task-7-comment");
        this.props.setFlashMessage("success", "Survey task has been successfully closed.");
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
            this.props.postTaskSurveyDetail(
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
            <SurveyTaskStep3Component
                wasSurveyConducted={this.state.wasSurveyConducted}
                wasSurveyConductedLabel={this.state.wasSurveyConductedLabel}
                noSurveyConductedReason={this.state.noSurveyConductedReason}
                noSurveyConductedReasonLabel={this.state.noSurveyConductedReasonLabel}
                noSurveyConductedReasonOther={this.state.noSurveyConductedReasonOther}
                comment={this.state.comment}
                wasJobSatisfactoryLabel={this.state.wasJobSatisfactoryLabel}
                wasJobFinishedOnTimeAndOnBudgetLabel={this.state.wasJobFinishedOnTimeAndOnBudgetLabel}
                wasAssociatePunctualLabel={this.state.wasAssociatePunctualLabel}
                wasAssociateProfessionalLabel={this.state.wasAssociateProfessionalLabel}
                wouldCustomerReferOurOrganizationLabel={this.state.wouldCustomerReferOurOrganizationLabel}
                id={this.state.id}
                isLoading={this.state.isLoading}
                errors={this.state.errors}
                task={this.props.taskDetail}
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
        postTaskSurveyDetail: (postData, onSuccessCallback, onFailureCallback) => {
            dispatch(
                postTaskSurveyDetail(postData, onSuccessCallback, onFailureCallback)
            )
        },
        setFlashMessage: (typeOf, text) => {
            dispatch(setFlashMessage(typeOf, text))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyTaskStep3Container);
