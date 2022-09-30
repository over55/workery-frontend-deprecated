import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import  AdminOrderCreateStep2Component from "../../../../components/orders/admin/create/adminOrderCreateStep2Component";
import { pullClientList } from "../../../../actions/clientActions";


class  AdminOrderCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            givenName: localStorage.getItem("workery-create-order-givenName"),
            lastName: localStorage.getItem("workery-create-order-lastName"),
            email: localStorage.getItem("workery-create-order-email"),
            phone: localStorage.getItem("workery-create-order-phone"),
            isLoading: true,
            errors: {},
            offset: 1,
        }

        this.onClientClick = this.onClientClick.bind(this);
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
        this.props.pullClientList(0, 10000, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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
                limit: response.count,
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

    onClientClick(e, clientId, clientGivenName, clientLastName) {
        this.setState(
            { isLoading: true },
            ()=>{
                localStorage.setItem("workery-create-order-clientId", clientId);
                localStorage.setItem("workery-create-order-clientGivenName", clientGivenName);
                localStorage.setItem("workery-create-order-clientLastName", clientLastName);
                this.props.history.push("/orders/add/step-3");
            }
        );
    }

    onNextClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset + 100000;

        // Copy the `parametersMap` that we already have.
        var parametersMap = this.state.parametersMap;

        this.props.pullClientList(offset, this.state.limit, parametersMap, this.onSuccessfulSubmissionCallback, this.onFailedSubmissionCallback);
    }

    onPreviousClick(e) {
        // Prevent the default HTML form submit code to run on the browser side.
        e.preventDefault();

        let offset = this.state.offset - 100000;

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
        const clients = (this.props.clientList && this.props.clientList.results) ? this.props.clientList.results : [];
        return (
            < AdminOrderCreateStep2Component
                {...this}
                {...this.state}
                {...this.props}
                clients={clients}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        clientList: store.clientListState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        pullClientList: (offset, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(offset, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)( AdminOrderCreateStep2Container);
