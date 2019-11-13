import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import StaffOperationsComponent from "../../../components/staff/retrieve/staffOperationsComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class StaffOperationsContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: parseInt(id),
            isLoading: false,
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onAddJobClick = this.onAddJobClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
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

    onSuccessCallback(response) {
        // console.log(response);
        this.setState({ isLoading: false, })
    }

    onFailureCallback(errors) {
        console.log(errors);
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onAddJobClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-clientId", this.props.clientDetail.id);
        localStorage.setItem("workery-create-order-clientGivenName", this.props.clientDetail.givenName);
        localStorage.setItem("workery-create-order-clientLastName", this.props.clientDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <StaffOperationsComponent
                id={this.state.id}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
                onAddJobClick={this.onAddJobClick}
                order={this.props.orderDetail}
                user={this.props.user}
                staff={this.props.staffDetail}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        staffDetail: store.staffDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StaffOperationsContainer);
