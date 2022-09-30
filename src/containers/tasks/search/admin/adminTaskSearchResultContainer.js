import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import TaskSearchResultComponent from "../../../../components/tasks/search/admin/adminTaskSearchResultComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullTaskList } from "../../../../actions/taskActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";
import { localStorageGetObjectItem } from '../../../../helpers/localStorageUtility';


class AdminTaskSearchResultContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const search = localStorageGetObjectItem('workery-search-task-details');
        const parametersMap = new Map();
        if (search.keyword !== undefined && search.keyword !== "") {
            parametersMap.set("search", search.keyword);
        }
        if (search.firstName !== undefined && search.firstName !== "") {
            parametersMap.set("given_name", search.firstName);
        }
        if (search.lastName !== undefined && search.lastName !== "") {
            parametersMap.set("last_name", search.lastName);
        }
        if (search.telephone !== undefined && search.telephone !== "") {
            parametersMap.set("telephone", search.telephone);
        }
        if (search.email !== undefined && search.email !== "") {
            parametersMap.set("email", search.email);
        }
        console.log("FILTERING", parametersMap); // For debugging purposes only.

        this.state = {
            // Pagination
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Everything else
            isLoading: true,
            search: search,
        }
        this.onTableChange = this.onTableChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

        // Clear any and all flash messages in our queue to be rendered.
        this.props.clearFlashMessage();
    }

    /**
     *  API callback functions
     *------------------------------------------------------------
     */

    onSuccessfulSubmissionCallback(response) {
        console.log("onSuccessfulSubmissionCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessfulSubmissionCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessfulSubmissionCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    /**
     *  Function takes the user interactions made with the table and perform
     *  remote API calls to update the table based on user selection.
     */
    onTableChange(type, { sortField, sortTask, data, offset, limit, filters }) {
        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        if (type === "sort") {
            console.log(type, sortField, sortTask); // For debugging purposes only.

            if (sortTask === "asc") {
                parametersMap.set('o', decamelize(sortField));
            }
            if (sortTask === "desc") {
                parametersMap.set('o', "-"+decamelize(sortField));
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullTaskList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, offset, limit); // For debugging purposes only.

            this.setState(
                { offset: offset, limit:limit, isLoading: true, },
                ()=>{
                    this.props.pullTaskList(offset, limit, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "filter") {
            console.log(type, filters); // For debugging purposes only.
            if (filters.state === undefined) {
                parametersMap.delete("state");
            } else {
                const filterVal = filters.state.filterVal;
                parametersMap.set("state", filterVal);
            }

            // DEVELOPERS NOTE:
            // (1) We are commenting out this code because of the following
            //     issue in github: https://github.com/over55/workery-frontend/issues/259
            // (2) We will automatically set `isClosed` to be `3`.
            // if (filters.isClosed === undefined) {
            //     parametersMap.delete("isClosed");
            // } else {
            //     const filterVal = filters.isClosed.filterVal;
            //     parametersMap.set("isClosed", filterVal);
            // }
            parametersMap.set("isClosed", 3);

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullTaskList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );
        }else {
            alert("Unsupported feature detected!!"+type);
        }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { offset, limit, totalSize, isLoading } = this.state;
        return (
            <TaskSearchResultComponent
                offset={offset}
                limit={limit}
                totalSize={totalSize}
                taskList={this.props.taskList}
                onTableChange={this.onTableChange}
                flashMessage={this.props.flashMessage}
                isLoading={isLoading}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        taskList: store.taskListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullTaskList: (offset, limit, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullTaskList(offset, limit, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminTaskSearchResultContainer);
