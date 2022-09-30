import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import AdminDepositListComponent from "../../../../components/financials/admin/retrieve/adminDepositListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullDepositList } from "../../../../actions/depositActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class AdminDepositListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Force active users as per issue via https://github.com/over55/workery-frontend/issues/296
        const parametersMap = new Map();
        parametersMap.set("job", id);
        parametersMap.set("state", "active");
        parametersMap.set("sort_order", "desc"); // Don't forget these same values must be set in the `defaultSorted` var inside `ClientListComponent`.
        parametersMap.set("sort_field", "paid_at");

        this.state = {
            // Pagination
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,
            sortOrder: "desc",
            sortField: "paid_at",

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,

            // Everything else...
            id: parseInt(id),
        }
        this.onTableChange = this.onTableChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the offset at the top of the offset.

        this.props.pullDepositList(
            this.state.id,
            this.state.offset,
            this.state.limit,
            this.state.parametersMap,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );

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
    onTableChange(type, { sortField, sortActivitySheet, data, offset, limit, filters }) {
        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        if (type === "sort") {
            console.log(type, sortField, sortActivitySheet); // For debugging purposes only.

            if (sortActivitySheet === "asc") {
                parametersMap.set('sort_field', decamelize(sortField));
                parametersMap.set('sort_order', "ASC");
            }
            if (sortActivitySheet === "desc") {
                parametersMap.set('sort_field', decamelize(sortField));
                parametersMap.set('sort_order', "DESC");
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullDepositList(
                        this.state.id,
                        this.state.offset,
                        this.state.limit,
                        parametersMap,
                        this.onSuccessfulSubmissionCallback,
                        this.onFailedSubmissionCallback
                    );
                }
            );

        } else if (type === "pagination") {
            console.log(type, offset, limit); // For debugging purposes only.

            this.setState(
                { offset: offset, limit:limit, isLoading: true, },
                ()=>{
                    this.props.pullDepositList(
                        this.state.id,
                        offset,
                        limit,
                        this.state.parametersMap,
                        this.onSuccessfulSubmissionCallback,
                        this.onFailedSubmissionCallback
                    );
                }
            );

        } else if (type === "filter") {
            // console.log(type, filters); // For debugging purposes only.
            // if (filters.state === undefined) {
            //     parametersMap.delete("state");
            // } else {
            //     const filterVal = filters.state.filterVal;
            //     parametersMap.set("state", filterVal);
            // }
            // this.setState(
            //     { parametersMap: parametersMap, isLoading: true, },
            //     ()=>{
            //         // STEP 3:
            //         // SUBMIT TO OUR API.
            //         this.props.pullDepositList(this.state.id, this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
            //     }
            // );
        }else {
            alert("Unsupported feature detected!!"+type);
        }
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset + STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION;

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullDepositList(this.state.id, offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    onPreviousClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset - STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION;

        // Defensive code: Skip this function if it our offset is weird.
        if (offset < 0) {
            return;
        }

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullDepositList(
            this.state.id,
            offset,
            this.state.limit,
            parametersMap,
            this.onSuccessfulSubmissionCallback,
            this.onFailedSubmissionCallback
        );
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <AdminDepositListComponent
                {...this}
                {...this.state}
                {...this.props}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        depositList: store.depositListState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullDepositList: (orderId, offset, limit, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullDepositList(orderId, offset, limit, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminDepositListContainer);
