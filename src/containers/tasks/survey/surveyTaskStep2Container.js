import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import SurveyTaskStep2Component from "../../../components/tasks/survey/surveyTaskStep2Component";
import { pullTaskDetail } from "../../../actions/taskActions";
import { validateTask7Step2Input } from "../../../validators/taskValidator";
import { postTaskSurveyDetail } from "../../../actions/taskActions";
import {
    localStorageGetIntegerItem, localStorageGetBooleanOrNullItem, localStorageSetObjectOrArrayItem
} from '../../../helpers/localStorageUtility';


class SurveyTaskStep2Container extends Component {
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
            wasSurveyConducted: localStorageGetBooleanOrNullItem("workery-task-7-wasSurveyConducted"),
            noSurveyConductedReason: localStorageGetIntegerItem("workery-task-7-noSurveyConductedReason"),
            noSurveyConductedReasonOther: localStorage.getItem("workery-task-7-noSurveyConductedReasonOther"),
            comment: localStorage.getItem("workery-task-7-comment"),
            wasJobSatisfactoryLabel: localStorage.getItem("workery-task-7-wasJobSatisfactory-label"),
            wasJobSatisfactory: localStorageGetBooleanOrNullItem("workery-task-7-wasJobSatisfactory"),
            wasJobFinishedOnTimeAndOnBudgetLabel: localStorage.getItem("workery-task-7-wasJobFinishedOnTimeAndOnBudget-label"),
            wasJobFinishedOnTimeAndOnBudget: localStorageGetBooleanOrNullItem("workery-task-7-wasJobFinishedOnTimeAndOnBudget"),
            wasAssociatePunctualLabel: localStorage.getItem("workery-task-7-wasAssociatePunctual-label"),
            wasAssociatePunctual: localStorageGetBooleanOrNullItem("workery-task-7-wasAssociatePunctual"),
            wasAssociateProfessionalLabel: localStorage.getItem("workery-task-7-wasAssociateProfessional-label"),
            wasAssociateProfessional: localStorageGetBooleanOrNullItem("workery-task-7-wasAssociateProfessional"),
            wouldCustomerReferOurOrganizationLabel: localStorage.getItem("workery-task-7-wouldCustomerReferOurOrganization-label"),
            wouldCustomerReferOurOrganization: localStorageGetBooleanOrNullItem("workery-task-7-wouldCustomerReferOurOrganization"),
        }

        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onClick = this.onClick.bind(this);
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

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
        localStorage.setItem('workery-task-7-'+[e.target.name], e.target.value);
    }

    onRadioChange(e) {
        // Get the values.
        const storageValueKey = "workery-task-7-"+[e.target.name];
        const storageLabelKey =  "workery-task-7-"+[e.target.name].toString()+"-label";
        const value = e.target.value;
        const label = e.target.dataset.label; // Note: 'dataset' is a react data via https://stackoverflow.com/a/20383295
        const storeValueKey = [e.target.name].toString();
        const storeLabelKey = [e.target.name].toString()+"Label";

        // Save the data.
        this.setState({ [e.target.name]: value, }); // Save to store.
        this.setState({ storeLabelKey: label, }); // Save to store.
        localStorage.setItem(storageValueKey, value) // Save to storage.
        localStorage.setItem(storageLabelKey, label) // Save to storage.

        // For the debugging purposes only.
        console.log({
            "STORE-VALUE-KEY": storageValueKey,
            "STORE-VALUE": value,
            "STORAGE-VALUE-KEY": storeValueKey,
            "STORAGE-VALUE": value,
            "STORAGE-LABEL-KEY": storeLabelKey,
            "STORAGE-LABEL": label,
        });
    }

    onSelectChange(option) {
        console.log(option);
        const optionKey = [option.selectName]+"Option";
        this.setState(
            { [option.selectName]: option.value, [optionKey]: option, },
            ()=>{
                localStorage.setItem('workery-task-7-'+[option.selectName].toString(), option.value);
                localStorage.setItem('workery-task-7-'+[option.selectName].toString()+"Label", option.label);
                localStorageSetObjectOrArrayItem('workery-task-7-'+optionKey, option);
                console.log([option.selectName], optionKey, "|", this.state); // For debugging purposes only.
            }
        );
    }

    onClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        // Perform client-side validation.
        const { errors, isValid } = validateTask7Step2Input(this.state);

        // CASE 1 OF 2: Validation passed successfully.
        if (isValid) {
            this.props.history.push("/task/7/"+this.state.id+"/step-3");

        // CASE 2 OF 2: Validation was a failure.
        } else {
            console.log(errors);
            this.setState({ errors: errors, isLoading: false, });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }

    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <SurveyTaskStep2Component
                id={this.state.id}
                wasSurveyConducted={this.state.wasSurveyConducted}
                noSurveyConductedReason={this.state.noSurveyConductedReason}
                noSurveyConductedReasonOther={this.state.noSurveyConductedReasonOther}
                comment={this.state.comment}
                wasJobSatisfactory={this.state.wasJobSatisfactory}
                wasJobFinishedOnTimeAndOnBudget={this.state.wasJobFinishedOnTimeAndOnBudget}
                wasAssociatePunctual={this.state.wasAssociatePunctual}
                wasAssociateProfessional={this.state.wasAssociateProfessional}
                wouldCustomerReferOurOrganization={this.state.wouldCustomerReferOurOrganization}
                isLoading={this.state.isLoading}
                task={this.props.taskDetail}
                errors={this.state.errors}
                onBack={this.onBack}
                onClick={this.onClick}
                onTextChange={this.onTextChange}
                onSelectChange={this.onSelectChange}
                onRadioChange={this.onRadioChange}
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
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SurveyTaskStep2Container);
