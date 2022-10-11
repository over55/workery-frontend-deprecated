import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import PartnerCreateStep2Component from "../../../components/partners/create/partnerCreateStep2Component";
import { pullPartnerList } from "../../../actions/partnerActions";
import { STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION } from "../../../constants/api";


class PartnerCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            givenName: localStorage.getItem("workery-create-partner-givenName"),
            lastName: localStorage.getItem("workery-create-partner-lastName"),
            email: localStorage.getItem("workery-create-partner-email"),
            phone: localStorage.getItem("workery-create-partner-phone"),
            isLoading: true,
            errors: {},

            // Pagination
            offset: 0,
            limit: STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION,
            totalSize: 0,
            sortOrder: "ASC",
            sortField: "last_name",
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
        this.onNextClick = this.onNextClick.bind(this);
        this.onPreviousClick = this.onPreviousClick.bind(this);
    }

    getParametersMapFromState() {
        const parametersMap = new Map();
        if (this.state.givenName !== undefined && this.state.givenName !== null) {
            parametersMap.set('givenName', this.state.givenName);
        }
        if (this.state.lastName !== undefined && this.state.lastName !== null) {
            parametersMap.set('lastName', this.state.lastName);
        }
        if (this.state.email !== undefined && this.state.email !== null) {
            parametersMap.set('email', this.state.email);
        }
        if (this.state.phone !== undefined && this.state.phone !== null) {
            parametersMap.set('phone', this.state.phone);
        }
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        const { offset, limit } = this.state;
        this.props.pullPartnerList(offset, limit, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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

    onSuccessCallback(response) {
        console.log("onSuccessCallback | State (Pre-Fetch):", this.state);
        this.setState(
            {
                offset: response.offset,
                totalSize: response.count,
                isLoading: false,
            },
            ()=>{
                console.log("onSuccessCallback | Fetched:",response); // For debugging purposes only.
                console.log("onSuccessCallback | State (Post-Fetch):", this.state);
            }
        )
    }

    onFailureCallback(errors) {
        this.setState({
            errors: errors,
            isLoading: false
        })

        // The following code will cause the screen to scroll to the top of
        // the page. Please see ``react-scroll`` for more information:
        // https://github.com/fisshy/react-scroll
        var scroll = Scroll.animateScroll;
        scroll.scrollToTop();
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onTextChange(e) {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset + STANDARD_RESULTS_SIZE_PER_PAGE_PAGINATION;

        // Copy the `parametersMap` that we already have.
        var parametersMap =  this.getParametersMapFromState();

        this.props.pullPartnerList(offset, this.state.limit, parametersMap, this.onSuccessCallback, this.onFailureCallback);
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
        var parametersMap = this.getParametersMapFromState();

        this.props.pullPartnerList(offset, this.state.limit, parametersMap, this.onSuccessCallback, this.onFailureCallback);
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const partners = (this.props.partnerList && this.props.partnerList.results) ? this.props.partnerList.results : [];
        const hasNext = this.props.partnerList.next !== null;
        const hasPrevious = this.props.partnerList.previous !== null;
        return (
            <PartnerCreateStep2Component
                {...this}
                {...this.state}
                {...this.props}
                partners={partners}
                hasNext={hasNext}
                hasPrevious={hasPrevious}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        partnerList: store.partnerListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullPartnerList: (offset, limit, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullPartnerList(offset, limit, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PartnerCreateStep2Container);
