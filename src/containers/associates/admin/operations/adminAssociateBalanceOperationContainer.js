import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import AdminAssociateBalanceOperationComponent from "../../../../components/associates/admin/operations/adminAssociateBalanceOperationComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateBalanceOperation } from "../../../../actions/associateOperationActions";
import { TINY_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../../constants/api";


class AdminAssociateBalanceOperationContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;
        const parametersMap = new Map();
        parametersMap.set("associate", id);
        this.state = {
            isLoading: true,
            id: id,
            associateId: id,
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
        this.props.pullAssociateBalanceOperation(this.state.associateId, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
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
        this.props.pullAssociateBalanceOperation(this.state.associateId, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        // // Copy the `parametersMap` that we already have.
        // var parametersMap = this.state.parametersMap;
        //
        // if (type === "sort") {
        //     console.log(type, sortField, sortOrder); // For debugging purposes only.
        //
        //     if (sortOrder === "asc") {
        //         parametersMap.set('o', decamelize(sortField));
        //     }
        //     if (sortOrder === "desc") {
        //         parametersMap.set('o', "-"+decamelize(sortField));
        //     }
        //
        //     this.setState(
        //         { parametersMap: parametersMap, isLoading: true, },
        //         ()=>{
        //             // STEP 3:
        //             // SUBMIT TO OUR API.
        //             this.props.pullAssociateBalanceOperation(this.state.associateId, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        //         }
        //     );
        //
        // } else if (type === "pagination") {
        //     console.log(type, page, sizePerPage); // For debugging purposes only.
        //
        //     this.setState(
        //         { page: page, sizePerPage:sizePerPage, isLoading: true, },
        //         ()=>{
        //             this.props.pullAssociateBalanceOperation(this.state.associateId, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        //         }
        //     );
        //
        // } else if (type === "filter") {
        //     console.log(type, filters); // For debugging purposes only.
        //     if (filters.state === undefined) {
        //         parametersMap.delete("state");
        //     } else {
        //         const filterVal = filters.state.filterVal;
        //         parametersMap.set("state", filterVal);
        //     }
        //     this.setState(
        //         { parametersMap: parametersMap, isLoading: true, },
        //         ()=>{
        //             // STEP 3:
        //             // SUBMIT TO OUR API.
        //             this.props.pullAssociateBalanceOperation(this.state.associateId, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
        //         }
        //     );
        // }else {
        //     alert("Unsupported feature detected!!"+type);
        // }
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading, id } = this.state;
        const associate = this.props.associateDetail ? this.props.associateDetail : [];
        return (
            <AdminAssociateBalanceOperationComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                orderList={this.props.financialList}
                onTableChange={this.onTableChange}
                id={id}
                associate={associate}
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
        financialList: store.financialListState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateBalanceOperation: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullAssociateBalanceOperation(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateBalanceOperationContainer);
