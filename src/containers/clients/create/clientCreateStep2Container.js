import React, { Component } from 'react';
import { connect } from 'react-redux';
import Scroll from 'react-scroll';

import ClientCreateStep2Component from "../../../components/clients/create/clientCreateStep2Component";
import { pullClientList } from "../../../actions/clientActions";


class ClientCreateStep2Container extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);
        this.state = {
            firstName: localStorage.getItem("workery-create-client-firstName"),
            lastName: localStorage.getItem("workery-create-client-lastName"),
            email: localStorage.getItem("workery-create-client-email"),
            phone: localStorage.getItem("workery-create-client-phone"),
            isLoading: false,
            errors: {},
        }

        this.onTextChange = this.onTextChange.bind(this);
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.getParametersMapFromState = this.getParametersMapFromState.bind(this);
    }

    getParametersMapFromState() {
        const parametersMap = new Map();
        if (this.state.firstName !== undefined && this.state.firstName !== null) {
            parametersMap['firstName'] = this.state.firstName;
        }
        return parametersMap;
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullClientList(1, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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
                page: response.page,
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

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading, errors } = this.state;
        const clients = (this.props.clientList && this.props.clientList.results) ? this.props.clientList.results : [];
        return (
            <ClientCreateStep2Component
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                clients={clients}
                isLoading={isLoading}
                errors={errors}
                onTextChange={this.onTextChange}
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
        pullClientList: (page, sizePerPage, map, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientList(page, sizePerPage, map, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientCreateStep2Container);
