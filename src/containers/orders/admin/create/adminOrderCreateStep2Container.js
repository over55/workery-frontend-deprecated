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
            page: 1,
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
        this.props.pullClientList(0, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
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
        const page = this.state.page + 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    onPreviousClick(e) {
        const page = this.state.page - 1;
        this.setState(
            {
                page: page,
                isLoading: true,
            },
            ()=>{
                this.props.pullClientList(page, 100, this.getParametersMapFromState(), this.onSuccessCallback, this.onFailureCallback);
            }
        )
    }

    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        const { page, sizePerPage, totalSize, isLoading, errors } = this.state;
        const clients = (this.props.clientList && this.props.clientList.results) ? this.props.clientList.results : [];
        const hasNext = this.props.clientList.next !== null;
        const hasPrevious = this.props.clientList.previous !== null;
        return (
            < AdminOrderCreateStep2Component
                page={page}
                sizePerPage={sizePerPage}
                totalSize={totalSize}
                clients={clients}
                isLoading={isLoading}
                errors={errors}
                onClientClick={this.onClientClick}
                hasNext={hasNext}
                onNextClick={this.onNextClick}
                hasPrevious={hasPrevious}
                onPreviousClick={this.onPreviousClick}
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
)( AdminOrderCreateStep2Container);
