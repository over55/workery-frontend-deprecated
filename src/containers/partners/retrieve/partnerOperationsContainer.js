import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import PartnerOperationsComponent from "../../../components/partners/retrieve/partnerOperationsComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";


class PartnerOperationsContainer extends Component {
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
            invoice: {}
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
        localStorage.setItem("workery-create-order-partnerId", this.props.partnerDetail.id);
        localStorage.setItem("workery-create-order-partnerGivenName", this.props.partnerDetail.givenName);
        localStorage.setItem("workery-create-order-partnerLastName", this.props.partnerDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }


    /**
     *  Main render function
     *------------------------------------------------------------
     */

    render() {
        return (
            <PartnerOperationsComponent
                id={this.state.id}
                isLoading={this.state.isLoading}
                flashMessage={this.props.flashMessage}
                onAddJobClick={this.onAddJobClick}
                partnerDetail={this.props.partnerDetail}
                user={this.props.user}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        partnerDetail: store.partnerDetailState,
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
)(PartnerOperationsContainer);
