import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import SharedOrganizationListComponent from "../../../../components/organizations/shared/list/sharedOrganizationListComponent";
import { pullTenantList } from "../../../../actions/tenantActions";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class SharedOrganizationListContainer extends Component {

    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */
    constructor(props) {
        super(props);

        // Force active users as per issue via https://github.com/over55/workery-frontend/issues/296
        var parametersMap = new Map();
        parametersMap.set("state", "active");
        parametersMap.set("sort_order", "ASC"); // Don't forget these same values must be set in the `defaultSorted` var inside `ClientListComponent`.
        parametersMap.set("sort_field", "last_name");

        this.state = {
            // Pagination
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,
            sortOrder: "ASC",
            sortField: "last_name",

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,
        };
        this.onTableChange = this.onTableChange.bind(this);
        this.onSuccessfulSubmissionCallback = this.onSuccessfulSubmissionCallback.bind(this);
        this.onFailedSubmissionCallback = this.onFailedSubmissionCallback.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        this.props.pullTenantList(this.state.offset, this.state.limit, new Map(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        window.scrollTo(0, 0);  // Start the offset at the top of the offset.
    }

    componentWillUnmount() {
        // This code will fix the "ReactJS & Redux: Can't perform a React state
        // update on an unmounted component" issue as explained in:
        // https://stackoverflow.com/a/53829700
        this.setState = (state,callback)=>{
            return;
        };

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
                 totalSize: response.totalSize,
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
         this.setState({ errors: {}, isLoading: false });
     }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    /**
     *  Function takes the user interactions made with the table and perform
     *  remote API calls to update the table based on user selection.
     */
    onTableChange(type, { sortField, sortOrder, data, offset, limit, filters }) {
        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        if (type === "sort") {
            console.log(type, sortField, sortOrder); // For debugging purposes only.

            if (sortOrder === "asc") {
                parametersMap.set('sort_field', decamelize(sortField));
                parametersMap.set('sort_order', "ASC");
            }
            if (sortOrder === "desc") {
                parametersMap.set('sort_field', decamelize(sortField));
                parametersMap.set('sort_order', "DESC");
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullTenantList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, offset, limit); // For debugging purposes only.

            this.setState(
                { offset: offset, limit:limit, isLoading: true, },
                ()=>{
                    this.props.pullTenantList(offset, limit, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "filter") {
            console.log(type, filters); // For debugging purposes only.
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
            //         this.props.pullTenantList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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

        this.props.pullTenantList(offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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

        this.props.pullTenantList(offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <SharedOrganizationListComponent
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
        tenantList: store.tenantListState,
        flashMessage: store.flashMessageState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullTenantList: (offset, limit, filtersMap, successCallback, failureCallback) => {
            dispatch(pullTenantList(offset, limit, filtersMap, successCallback, failureCallback))
        },
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SharedOrganizationListContainer);
