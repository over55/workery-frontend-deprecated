import React, { Component } from 'react';
import { connect } from 'react-redux';
import { camelizeKeys, decamelize } from 'humps';
import Scroll from 'react-scroll';

import AdminAssociateCommentComponent from "../../../../components/associates/admin/retrieve/adminAssociateCommentComponent";
import { clearFlashMessage } from "../../../../actions/flashMessageActions";
import { pullAssociateCommentList, postAssociateComment } from "../../../../actions/associateCommentActions";
import { validateInput } from "../../../../validators/commentValidator"

const CUSTOM_STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION = 500;


class AdminAssociateCommentContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        const { id } = this.props.match.params;

        const parametersMap = new Map();
        parametersMap.set("associate_id", id);
        parametersMap.set("sort_order", "ASC"); // Don't forget these same values must be set in the `defaultSorted` var inside `ClientListComponent`.
        parametersMap.set("sort_field", "created_time");

        this.state = {
            // Pagination
            offset: 0,
            limit: CUSTOM_STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,
            sortOrder: "ASC",
            sortField: "created_time",

            // Sorting, Filtering, & Searching
            parametersMap: parametersMap,

            // Overaly
            isLoading: true,

            // Everything else...
            id: id,
            text: "",
            errors: {},
        }
        this.getPostData = this.getPostData.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
        this.onSuccessListCallback = this.onSuccessListCallback.bind(this);
        this.onFailureListCallback = this.onFailureListCallback.bind(this);
        this.onSuccessPostCallback = this.onSuccessPostCallback.bind(this);
        this.onFailurePostCallback = this.onFailurePostCallback.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    /**
     *  Utility function used to create the `postData` we will be submitting to
     *  the API; as a result, this function will structure some dictionary key
     *  items under different key names to support our API web-service's API.
     */
    getPostData() {
        const { id, text } = this.state;
        return {
            "associateId": parseInt(id),
            "text": text
        };
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.

        // Get our data.
        this.props.pullAssociateCommentList(
            this.state.offset,
            this.state.limit,
            this.state.parametersMap,
            this.onSuccessListCallback,
            this.onFailureListCallback
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

    onSuccessListCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
                text: "",
            },
            ()=>{
                console.log("onSuccessListCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessListCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureListCallback(errors) {
        console.log(errors);
        this.setState({ isLoading: false, text: "", });
    }

    onSuccessPostCallback(response) {
        console.log("onSuccessListCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
                text: "",
            },
            ()=>{
                console.log("onSuccessPostCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessPostCallback | State (Post-Fetch):", this.state);
                // Get our data.
                this.props.pullAssociateCommentList(
                    this.state.offset,
                    this.state.limit,
                    this.state.parametersMap,
                    this.onSuccessListCallback,
                    this.onFailureListCallback
                );
            }
        )
    }

    onFailurePostCallback(errors) {
        console.log("onFailurePostCallback |", errors);
        this.setState({ isLoading: false, errors: errors, text: "", });
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    onClick(e) {
        e.preventDefault();

        const { errors, isValid } = validateInput(this.state);
        // console.log(errors, isValid); // For debugging purposes only.

        if (isValid) {
            this.setState({
                errors: {},
                isLoading: true,
            }, ()=>{
                // The following code will cause the screen to scroll to the top of
                // the page. Please see ``react-scroll`` for more information:
                // https://github.com/fisshy/react-scroll
                var scroll = Scroll.animateScroll;
                scroll.scrollToTop();

                // Once our state has been validated `associate-side` then we will
                // make an API request with the server to create our new production.
                this.props.postAssociateComment(
                    this.getPostData(),
                    this.onSuccessPostCallback,
                    this.onFailurePostCallback
                );
            });
        } else {
            this.setState({
                errors: errors,
                isLoading: false,
            });

            // The following code will cause the screen to scroll to the top of
            // the page. Please see ``react-scroll`` for more information:
            // https://github.com/fisshy/react-scroll
            var scroll = Scroll.animateScroll;
            scroll.scrollToTop();
        }
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset + CUSTOM_STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION;

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullClientList(offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    onPreviousClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset - CUSTOM_STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION;

        // Defensive code: Skip this function if it our offset is weird.
        if (offset < 0) {
            return;
        }

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullClientList(offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const associate = this.props.associateDetail ? this.props.associateDetail : {};
        const associateComments = this.props.associateCommentList ? this.props.associateCommentList.results : [];
        return (
            <AdminAssociateCommentComponent
                {...this}
                {...this.state}
                {...this.props}
                associate={associate}
                associateComments={associateComments}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        associateCommentList: store.associateCommentListState,
        associateDetail: store.associateDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullAssociateCommentList: (page, sizePerPage, map, onSuccessListCallback, onFailureListCallback) => {
            dispatch(
                pullAssociateCommentList(page, sizePerPage, map, onSuccessListCallback, onFailureListCallback)
            )
        },
        postAssociateComment: (postData, successCallback, failedCallback) => {
            dispatch(postAssociateComment(postData, successCallback, failedCallback))
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminAssociateCommentContainer);
