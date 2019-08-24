import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import AssignAssociateTaskStep2Component from "../../../components/tasks/assignAssociate/assignAssociateTaskStep2Component";
import { validateTask1Step2Input } from "../../../validators/taskValidator";
import { setFlashMessage } from "../../../actions/flashMessageActions";
import { pullTaskDetail } from "../../../actions/taskActions";
import { pullTaskItemAvailableAssociateList } from '../../../actions/associateActions';
import { pullActivitySheetList } from '../../../actions/activitySheetActions';
import {
    localStorageGetObjectItem, localStorageSetObjectOrArrayItem, localStorageGetArrayItem
} from '../../../helpers/localStorageUtility';


class TaskUpdateContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        // Since we are using the ``react-routes-dom`` library then we
        // fetch the URL argument as follows.
        const { id } = this.props.match.params;

        this.state = {
            errors: {},
            isLoading: false,
            id: id,
        }

        this.onClick = this.onClick.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        const parametersMap = new Map();
        parametersMap.set('available_for_task_item', this.state.id);
        parametersMap.set('o', 'last_name');
        this.props.pullTaskItemAvailableAssociateList(this.state.id);

        const parametersMap2 = new Map();
        parametersMap2.set('task_item', this.state.id);
        parametersMap2.set('o', 'associate_name');
        this.props.pullActivitySheetList(1, 1000, parametersMap2);

        this.props.pullTaskDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(taskDetail) {
        console.log("onSuccessCallback | taskDetail:", taskDetail); // For debugging purposes only.
        if (taskDetail !== undefined && taskDetail !== null && taskDetail !== "") {
            if (taskDetail.isClosed === true || taskDetail.isClosed === "true") {
                this.props.setFlashMessage("danger", "Task has been already been closed.");
                this.props.history.push("/tasks");
            }
        }
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */


    onClick(e, associateId) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();
        console.log("onClick | associateId:", associateId); // For debugging purposes.
        localStorage.setItem("workery-task-1-associateId", associateId);
        this.props.history.push("/task/1/"+this.state.id+"/step-3");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { isLoading, errors, id, } = this.state;
        const associates = this.props.associateList ? this.props.associateList.results : [];
        const activitySheetItems = this.props.activitySheetItemList ? this.props.activitySheetItemList.results : [];
        return (
            <AssignAssociateTaskStep2Component
                associates={associates}
                activitySheetItems={activitySheetItems}
                task={this.props.taskDetail}
                id={id}
                isLoading={isLoading}
                errors={errors}
                onClick={this.onClick}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        activitySheetItemList: store.activitySheetItemListState,
        associateList: store.associateListState,
        taskDetail: store.taskDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTaskItemAvailableAssociateList: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTaskItemAvailableAssociateList(id, onSuccessCallback, onFailureCallback)
            )
        },
        pullActivitySheetList: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullActivitySheetList(id, onSuccessCallback, onFailureCallback)
            )
        },
        pullTaskDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTaskDetail(id, onSuccessCallback, onFailureCallback)
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
)(TaskUpdateContainer);