import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import OngoingOrderListComponent from "../../../components/ongoingOrders/list/ongoingOrderListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullOngoingOrderList } from "../../../actions/ongoingOrderActions";
import { TINY_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";

class OngoingOrderListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Pagination
            page: 1,
            sizePerPage: TINY_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: new Map(),

            // Overaly
            isLoading: true,
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

        // DEVELOPERS NOTE:
        // Since in the react-table does not have a default filter selected so
        // when the page loads the API call does not get made! We need to do it
        // here when the component finished loading. We only write this code
        // here if no filter was selected in the table.
        this.props.pullOngoingOrderList(this.state.page, this.state.sizePerPage, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
                page: response.page,
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
    onTableChange(type, { sortField, sortOrder, data, page, sizePerPage, filters }) {
        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        if (type === "sort") {
            console.log(type, sortField, sortOrder); // For debugging purposes only.

            if (sortOrder === "asc") {
                parametersMap.set('o', decamelize(sortField));
            }
            if (sortOrder === "desc") {
                parametersMap.set('o', "-"+decamelize(sortField));
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullOngoingOrderList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, page, sizePerPage); // For debugging purposes only.

            this.setState(
                { page: page, sizePerPage:sizePerPage, isLoading: true, },
                ()=>{
                    this.props.pullOngoingOrderList(page, sizePerPage, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullOngoingOrderList(this.state.page, this.state.sizePerPage, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        const { page, sizePerPage, totalSize, isLoading } = this.state;
        return (
            <OngoingOrderListComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                ongoingOrderList={this.props.ongoingOrderList}
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
        ongoingOrderList: store.ongoingOrderListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOngoingOrderList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOngoingOrderList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OngoingOrderListContainer);
