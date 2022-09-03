import React, { Component } from 'react';
import { connect } from 'react-redux';

import ClientFullRetrieveComponent from "../../../components/clients/retrieve/clientFullRetrieveComponent";
import { clearFlashMessage } from "../../../actions/flashMessageActions";
import { pullClientDetail } from "../../../actions/clientActions";


class ClientFullRetrieveContainer extends Component {
    /**
     *  Initializer & Utility
     *------------------------------------------------------------
     */

    constructor(props) {
        super(props);

        const { id } = this.props.match.params;

        // Update state.
        this.state = {
            id: id,
            client: {}
        }

        // Update functions.
        this.onSuccessCallback = this.onSuccessCallback.bind(this);
        this.onFailureCallback = this.onFailureCallback.bind(this);
        this.onClientClick = this.onClientClick.bind(this);
        this.onAddJobClick = this.onAddJobClick.bind(this);
    }

    /**
     *  Component Life-cycle Management
     *------------------------------------------------------------
     */

    componentDidMount() {
        window.scrollTo(0, 0);  // Start the page at the top of the page.
        this.props.pullClientDetail(this.state.id, this.onSuccessCallback, this.onFailureCallback);
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
        console.log("onSuccessCallback | Fetched:", response);
    }

    onFailureCallback(errors) {
        console.log("onFailureCallback | errors:", errors);
    }

    onAddJobClick(e) {
        e.preventDefault();
        localStorage.setItem("workery-create-order-clientId", this.props.clientDetail.id);
        localStorage.setItem("workery-create-order-clientGivenName", this.props.clientDetail.givenName);
        localStorage.setItem("workery-create-order-clientLastName", this.props.clientDetail.lastName);
        this.props.history.push("/orders/add/step-3");
    }

    /**
     *  Event handling functions
     *------------------------------------------------------------
     */

    onClientClick(e) {
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
        const client = this.props.clientDetail ? this.props.clientDetail : [];
        return (
            <ClientFullRetrieveComponent
                {...this}
                {...this.state}
                {...this.props}
                client={client}
            />
        );
    }
}

const mapStateToProps = function(store) {
    return {
        user: store.userState,
        flashMessage: store.flashMessageState,
        clientDetail: store.clientDetailState,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        clearFlashMessage: () => {
            dispatch(clearFlashMessage())
        },
        pullClientDetail: (id, onSuccessCallback, onFailureCallback) => {
            dispatch(
                pullClientDetail(id, onSuccessCallback, onFailureCallback)
            )
        },
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientFullRetrieveContainer);
