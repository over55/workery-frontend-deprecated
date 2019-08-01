import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';

import ClientListComponent from "../../../components/clients/list/clientListComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullClientList } from "../../../actions/clientActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";

class ClientListContainer extends Component {
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

            // Everything else
            filter: "active",
            clients: [],
        }
        this.onFilterClick = this.onFilterClick.bind(this);
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

        this.props.pullClientList(1, new Map(), this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback); // Load up the default page.
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

    onFilterClick(e, filter) {
        e.preventDefault();
        this.setState({
            filter: filter,
        })
    }

    onTableChange(type, { sortField, sortOrder, data, page, sizePerPage }) {
        if (type === "sort") {
            // STEP 1:
            // WE NEED TO GENERATE A 'SORT-MAP' TO KNOW WHAT URL PARAMETERS
            // TO GENERATE WHEN WE MAKE THE SUBMISSION TO THE API.
            console.log(type, sortField, sortOrder); // For debugging purposes only.
            var parametersMap = new Map();
            if (sortOrder === "asc") {
                parametersMap.set('o', decamelize(sortField));
            }
            if (sortOrder === "desc") {
                parametersMap.set('o', "-"+decamelize(sortField));
            }

            // STEP 2:
            // SAVE THE SORT-MAP AND THEN MAKE THE SUBMISSION TO THE API.
            this.setState(
                { parametersMap: parametersMap },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullClientList(this.state.page, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else if (type === "pagination") {
            console.log(type, page, sizePerPage); // For debugging purposes only.

            this.setState(
                { page: page, sizePerPage:sizePerPage },
                ()=>{
                    // STEP 3:
                    // SUBMIT TO OUR API.
                    this.props.pullClientList(page, this.state.parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
                }
            );

        } else {
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
            <ClientListComponent
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                filter={this.state.filter}

                onFilterClick={this.onFilterClick}
                clientList={this.props.clientList}
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
        clientList: store.clientListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullClientList: (page, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(page, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientListContainer);
