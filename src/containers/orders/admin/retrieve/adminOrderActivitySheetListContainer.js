import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import AdminOrderActivitySheetListComponent from "../../../../components/orders/admin/retrieve/adminOrderActivitySheetListComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullActivitySheetList } from "../../../../actions/activitySheetActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";

class OrderActivitySheetListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        const parametersMap = new Map();
        parametersMap.set("orderId", id);
        this.state = {
            // Pagination
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,

            // Everything else...
            id: parseInt(id),
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
        window.scrollTo(0, 0);  // Start the offset at the top of the page.

        this.props.pullActivitySheetList(
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
                parametersMap.set('o', decamelize(sortField));
            }
            if (sortActivitySheet === "desc") {
                parametersMap.set('o', "-"+decamelize(sortField));
            }

            this.setState(
                { parametersMap: parametersMap, isLoading: true, },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullActivitySheetList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, offset, limit); // For debugging purposes only.

            this.setState(
                { offset: offset, limit:limit, isLoading: true, },
                ()=>{
                    this.props.pullActivitySheetList(offset, limit, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
                    this.props.pullActivitySheetList(this.state.offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        const { offset, limit, totalSize, isLoading, id } = this.state;
        const order = this.props.orderDetail ? this.props.orderDetail : {};
        const activitySheetItems = (this.props.activitySheetItemList && this.props.activitySheetItemList.results) ? this.props.activitySheetItemList.results : [];
        return (
            <AdminOrderActivitySheetListComponent
                offset={offset}
                limit={limit}
                totalSize={totalSize}
                activitySheetItems={activitySheetItems}
                onTableChange={this.onTableChange}
                id={id}
                order={order}
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
        activitySheetItemList: store.activitySheetItemListState,
        orderDetail: store.orderDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullActivitySheetList: (offset, limit, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullActivitySheetList(offset, limit, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderActivitySheetListContainer);
