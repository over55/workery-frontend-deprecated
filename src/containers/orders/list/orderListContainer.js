import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import OrderListComponent from "../../../components/orders/list/orderListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullOrderList } from "../../../actions/orderActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";

class OrderListContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            // Pagination
            page: 1,
            sizePerPage: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,

            // Sorting, Filtering, & Searching
            parametersMap: new Map(),
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

        this.props.pullOrderList(1, new Map(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback); // Load up the default page.
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
            },
            ()=>{
                console.log("onSuccessfulSubmissionCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessfulSubmissionCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailedSubmissionCallback(errors) {
        console.log(errors);
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

            // API MODIFICATIONS HERE TO SUPPORT OUR API ENDPOINT SORTING.
            let aSortField = sortField.replace("Name", "");
            if (aSortField === "client") {
                aSortField = "customer";
            }

            if (sortOrder === "asc") {
                parametersMap.set('o', decamelize(aSortField));
            }
            if (sortOrder === "desc") {
                parametersMap.set('o', "-"+decamelize(aSortField));
            }

            this.setState(
                { parametersMap: parametersMap },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullOrderList(this.state.page, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, page, sizePerPage); // For debugging purposes only.

            this.setState(
                { page: page, sizePerPage:sizePerPage },
                ()=>{
                    this.props.pullOrderList(page, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
                { parametersMap: parametersMap },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullOrderList(this.state.page, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        const { page, sizePerPage, totalSize } = this.state;
        return (
            <OrderListComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}

                orderList={this.props.orderList}
                onTableChange={this.onTableChange}
                flashMessage={this.props.flashMessage}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        orderList: store.orderListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullOrderList: (page, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullOrderList(page, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderListContainer);
